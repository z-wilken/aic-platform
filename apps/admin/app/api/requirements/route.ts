import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('org_id');

    if (!orgId) {
        return NextResponse.json({ error: 'org_id is required' }, { status: 400 });
    }

    const result = await query(
      'SELECT * FROM audit_requirements WHERE org_id = $1 ORDER BY created_at ASC',
      [orgId]
    );

    return NextResponse.json({
        requirements: result.rows
    });
  } catch (error) {
    console.error('Admin Requirements API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, findings, org_id } = body;

    if (!id || !status || !org_id) {
      return NextResponse.json({ error: 'ID, status, and org_id are required' }, { status: 400 });
    }

    // 1. Update the requirement status
    await query(
      `UPDATE audit_requirements 
       SET status = $1, findings = $2, updated_at = NOW() 
       WHERE id = $3`,
      [status, findings || '', id]
    );

    // 2. Recalculate Org Integrity Score
    // Logic: (Verified Requirements / Total Requirements) * 100
    const countResult = await query(
        `SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE status = 'VERIFIED') as verified
         FROM audit_requirements 
         WHERE org_id = $1`,
        [org_id]
    );

    const { total, verified } = countResult.rows[0];
    const newScore = Math.round((parseInt(verified) / parseInt(total)) * 100);

    await query(
        `UPDATE organizations SET integrity_score = $1 WHERE id = $2`,
        [newScore, org_id]
    );

    return NextResponse.json({ success: true, newScore });
  } catch (error) {
    console.error('Admin Requirements Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
