import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';

// First, we need to add incidents table to schema
// For now, we'll query flagged audit logs as incidents

// GET /api/incidents - List incidents (flagged audit logs)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('org_id');
    const severity = searchParams.get('severity'); // 'high', 'medium', 'low'
    const resolved = searchParams.get('resolved'); // 'true', 'false'
    const limit = parseInt(searchParams.get('limit') || '20');

    // Query flagged audit logs as incidents
    let queryText = `
      SELECT
        al.id,
        al.org_id,
        al.action,
        al.input_type,
        al.outcome,
        al.status,
        al.metadata,
        al.created_at,
        o.name as organization_name,
        o.tier as organization_tier,
        CASE
          WHEN o.tier = 'TIER_1' THEN 'critical'
          WHEN o.tier = 'TIER_2' THEN 'high'
          ELSE 'medium'
        END as severity
      FROM audit_logs al
      LEFT JOIN organizations o ON al.org_id = o.id
      WHERE al.status = 'FLAGGED'
    `;

    const values: any[] = [];
    let paramIndex = 1;

    if (orgId) {
      queryText += ` AND al.org_id = $${paramIndex++}`;
      values.push(orgId);
    }

    queryText += ` ORDER BY al.created_at DESC LIMIT $${paramIndex++}`;
    values.push(limit);

    const result = await query(queryText, values);

    // Transform to incident format
    const incidents = result.rows.map(row => ({
      id: row.id,
      type: 'BIAS_ALERT',
      title: `${row.action} flagged for review`,
      description: `${row.input_type} resulted in ${row.outcome} - requires human review`,
      severity: row.severity,
      organization: {
        id: row.org_id,
        name: row.organization_name,
        tier: row.organization_tier
      },
      audit_log_id: row.id,
      status: row.metadata?.resolved ? 'RESOLVED' : 'OPEN',
      created_at: row.created_at,
      metadata: row.metadata
    }));

    // Calculate stats
    const stats = {
      total: incidents.length,
      critical: incidents.filter(i => i.severity === 'critical').length,
      high: incidents.filter(i => i.severity === 'high').length,
      medium: incidents.filter(i => i.severity === 'medium').length,
      open: incidents.filter(i => i.status === 'OPEN').length,
      resolved: incidents.filter(i => i.status === 'RESOLVED').length
    };

    return NextResponse.json({
      incidents,
      stats
    });

  } catch (error) {
    console.error('Error fetching incidents:', error);

    // Fallback mock data
    return NextResponse.json({
      incidents: [
        {
          id: 'inc-001',
          type: 'BIAS_ALERT',
          title: 'Disparate impact detected in credit scoring',
          description: 'Four-fifths rule violation for age group 55+',
          severity: 'critical',
          status: 'OPEN',
          created_at: new Date().toISOString()
        }
      ],
      stats: { total: 1, critical: 1, high: 0, medium: 0, open: 1, resolved: 0 },
      mode: 'MOCK'
    });
  }
}

// POST /api/incidents - Create new incident
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      org_id,
      type = 'MANUAL_REPORT',
      title,
      description,
      severity = 'medium',
      related_audit_log_id
    } = body;

    if (!org_id || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: org_id, title' },
        { status: 400 }
      );
    }

    // Create as a flagged audit log entry
    const result = await query(`
      INSERT INTO audit_logs (org_id, action, input_type, outcome, status, metadata)
      VALUES ($1, $2, $3, $4, 'FLAGGED', $5)
      RETURNING *
    `, [
      org_id,
      type,
      title,
      severity.toUpperCase(),
      JSON.stringify({
        incident: true,
        description,
        severity,
        related_audit_log_id,
        reported_at: new Date().toISOString()
      })
    ]);

    return NextResponse.json({
      message: 'Incident created successfully',
      incident: {
        id: result.rows[0].id,
        type,
        title,
        description,
        severity,
        status: 'OPEN',
        created_at: result.rows[0].created_at
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating incident:', error);
    return NextResponse.json(
      { error: 'Failed to create incident' },
      { status: 500 }
    );
  }
}
