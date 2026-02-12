import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { getSession } from '../../../../lib/auth';

// GET /api/organizations/:id - Get organization details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session: any = await getSession();
    
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Strict multi-tenant isolation
    if (session.user.orgId !== id && !session.user.isSuperAdmin) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const result = await query(
      'SELECT * FROM organizations WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    const org = result.rows[0];

    // Get recent audit stats
    const statsResult = await query(`
      SELECT
        COUNT(*) as total_audits,
        COUNT(*) FILTER (WHERE status = 'VERIFIED') as verified,
        COUNT(*) FILTER (WHERE status = 'FLAGGED') as flagged,
        COUNT(*) FILTER (WHERE status = 'PENDING') as pending
      FROM audit_logs
      WHERE org_id = $1
    `, [id]);

    const stats = statsResult.rows[0];

    return NextResponse.json({
      organization: {
        id: org.id,
        name: org.name,
        tier: org.tier,
        integrity_score: org.integrity_score,
        is_alpha: org.is_alpha,
        created_at: org.created_at
      },
      audit_stats: {
        total: parseInt(stats.total_audits) || 0,
        verified: parseInt(stats.verified) || 0,
        flagged: parseInt(stats.flagged) || 0,
        pending: parseInt(stats.pending) || 0
      }
    });

  } catch (error) {
    console.error('Error fetching organization:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization' },
      { status: 500 }
    );
  }
}

// PUT /api/organizations/:id - Update organization
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session: any = await getSession();

    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if ((session.user.orgId !== id || session.user.role !== 'ADMIN') && !session.user.isSuperAdmin) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { name, tier, integrity_score } = body;

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (tier !== undefined) {
      updates.push(`tier = $${paramIndex++}`);
      values.push(tier);
    }
    if (integrity_score !== undefined) {
      updates.push(`integrity_score = $${paramIndex++}`);
      values.push(integrity_score);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    values.push(id);
    const result = await query(
      `UPDATE organizations SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Organization updated successfully',
      organization: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating organization:', error);
    return NextResponse.json(
      { error: 'Failed to update organization' },
      { status: 500 }
    );
  }
}
