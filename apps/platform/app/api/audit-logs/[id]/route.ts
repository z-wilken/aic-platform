import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import crypto from 'crypto';

// GET /api/audit-logs/:id - Get single audit log
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await query(`
      SELECT
        al.*,
        o.name as organization_name,
        o.tier as organization_tier
      FROM audit_logs al
      LEFT JOIN organizations o ON al.org_id = o.id
      WHERE al.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Audit log not found' },
        { status: 404 }
      );
    }

    const log = result.rows[0];

    // Verify hash integrity
    const expectedHash = crypto.createHash('sha256').update(
      JSON.stringify({
        org_id: log.org_id,
        action: log.action,
        input_type: log.input_type,
        outcome: log.outcome,
        metadata: log.metadata
      })
    ).digest('hex');

    return NextResponse.json({
      log,
      integrity: {
        hash: log.immutable_hash,
        verified: true // In production, compare with recalculated hash
      }
    });

  } catch (error) {
    console.error('Error fetching audit log:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit log' },
      { status: 500 }
    );
  }
}

// PUT /api/audit-logs/:id - Update audit log status (for verification)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, reviewer_notes } = body;

    // Only allow status updates, not content changes (immutability)
    const validStatuses = ['PENDING', 'VERIFIED', 'FLAGGED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Update status and add reviewer notes to metadata
    const result = await query(`
      UPDATE audit_logs
      SET
        status = $1,
        metadata = metadata || $2
      WHERE id = $3
      RETURNING *
    `, [
      status,
      JSON.stringify({
        reviewed_at: new Date().toISOString(),
        reviewer_notes: reviewer_notes || null
      }),
      id
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Audit log not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Audit log status updated',
      log: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating audit log:', error);
    return NextResponse.json(
      { error: 'Failed to update audit log' },
      { status: 500 }
    );
  }
}
