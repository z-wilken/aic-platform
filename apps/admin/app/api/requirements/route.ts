import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    // 1.5 Send Automated Notification to Client
    const reqResult = await query('SELECT title FROM audit_requirements WHERE id = $1', [id]);
    const reqTitle = reqResult.rows[0]?.title;
    
    await query(
        'INSERT INTO notifications (org_id, title, message, type) VALUES ($1, $2, $3, $4)',
        [
            org_id, 
            status === 'VERIFIED' ? 'Requirement Verified' : 'Action Required',
            status === 'VERIFIED' 
                ? `Your submission for "${reqTitle}" has been verified by an auditor.` 
                : `Your submission for "${reqTitle}" requires further action. Findings: ${findings}`,
            'AUDIT_UPDATE'
        ]
    );

    // 2. Recalculate Org Integrity Score
    const countResult = await query(
        `SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE status = 'VERIFIED') as verified
         FROM audit_requirements 
         WHERE org_id = $1`,
        [org_id]
    );

    const { total, verified } = countResult.rows[0];
    const newScore = total > 0 ? Math.round((parseInt(verified) / parseInt(total)) * 100) : 0;

    await query(
        `UPDATE organizations SET integrity_score = $1 WHERE id = $2`,
        [newScore, org_id]
    );

    // 3. Log the administrative action for accountability
    await query(
        `INSERT INTO security_logs (actor_id, action, entity_id, details) 
         VALUES ($1, $2, $3, $4)`,
        [
            session.user.id, 
            status === 'VERIFIED' ? 'VERIFIED_REQUIREMENT' : 'REJECTED_REQUIREMENT',
            id,
            JSON.stringify({ org_id, new_score: newScore, findings: findings || 'None' })
        ]
    );

    return NextResponse.json({ success: true, newScore });
  } catch (error) {
    console.error('Admin Requirements Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}