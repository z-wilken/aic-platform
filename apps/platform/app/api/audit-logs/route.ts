import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import crypto from 'crypto';

// GET /api/audit-logs - List audit logs with filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('org_id');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let queryText = `
      SELECT
        al.*,
        o.name as organization_name
      FROM audit_logs al
      LEFT JOIN organizations o ON al.org_id = o.id
      WHERE 1=1
    `;
    const values: any[] = [];
    let paramIndex = 1;

    if (orgId) {
      queryText += ` AND al.org_id = $${paramIndex++}`;
      values.push(orgId);
    }

    if (status) {
      queryText += ` AND al.status = $${paramIndex++}`;
      values.push(status);
    }

    queryText += ` ORDER BY al.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    values.push(limit, offset);

    const result = await query(queryText, values);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) FROM audit_logs WHERE 1=1';
    const countValues: any[] = [];
    let countParamIndex = 1;

    if (orgId) {
      countQuery += ` AND org_id = $${countParamIndex++}`;
      countValues.push(orgId);
    }
    if (status) {
      countQuery += ` AND status = $${countParamIndex++}`;
      countValues.push(status);
    }

    const countResult = await query(countQuery, countValues);
    const total = parseInt(countResult.rows[0].count);

    return NextResponse.json({
      logs: result.rows,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + result.rows.length < total
      }
    });

  } catch (error) {
    console.error('Error fetching audit logs:', error);

    // Fallback mock data
    return NextResponse.json({
      logs: [
        {
          id: 'mock-001',
          action: 'CREDIT_DECISION',
          input_type: 'Loan Application',
          outcome: 'APPROVED',
          status: 'VERIFIED',
          created_at: new Date().toISOString()
        },
        {
          id: 'mock-002',
          action: 'CREDIT_DECISION',
          input_type: 'Loan Application',
          outcome: 'DENIED',
          status: 'FLAGGED',
          created_at: new Date().toISOString()
        }
      ],
      pagination: { total: 2, limit: 50, offset: 0, hasMore: false },
      mode: 'MOCK'
    });
  }
}

// POST /api/audit-logs - Create new audit log entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      test_mode,
      protected_attribute,
      outcome_variable,
      data
    } = body;

    let {
      org_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Default demo org
      action = 'BIAS_AUDIT',
      input_type = 'Dataset',
      outcome = 'COMPLETED',
      status = 'PENDING',
      metadata = {}
    } = body;

    let engineAnalysis = null;

    // If data and attributes are provided, call Audit Engine
    if (test_mode && data && protected_attribute && outcome_variable) {
        try {
            const engineResponse = await fetch('http://localhost:8000/api/v1/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data,
                    protected_attribute,
                    outcome_variable
                })
            });
            
            if (engineResponse.ok) {
                engineAnalysis = await engineResponse.json();
                status = engineAnalysis.overall_status === 'FAIR' ? 'VERIFIED' : 'FLAGGED';
                outcome = engineAnalysis.overall_status;
                metadata = { ...metadata, analysis: engineAnalysis };
            }
        } catch (err) {
            console.error("Failed to connect to Audit Engine:", err);
            // Continue with default values if engine is down
        }
    }

    // Generate immutable hash for audit trail integrity
    const hashData = JSON.stringify({
      org_id,
      action,
      input_type,
      outcome,
      metadata,
      timestamp: new Date().toISOString()
    });
    const immutable_hash = crypto.createHash('sha256').update(hashData).digest('hex');

    const result = await query(`
      INSERT INTO audit_logs (org_id, action, input_type, outcome, status, metadata, immutable_hash)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [org_id, action, input_type, outcome, status, JSON.stringify(metadata), immutable_hash]);

    return NextResponse.json({
      message: 'Audit log created successfully',
      log: result.rows[0],
      analysis: engineAnalysis,
      immutable_hash
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json(
      { error: 'Failed to create audit log' },
      { status: 500 }
    );
  }
}
