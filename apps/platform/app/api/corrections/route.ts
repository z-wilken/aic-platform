import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    const result = await query(
      'SELECT cr.*, dr.system_name FROM correction_requests cr LEFT JOIN decision_records dr ON cr.decision_id = dr.id WHERE cr.org_id = $1 ORDER BY cr.created_at DESC',
      [orgId]
    );

    return NextResponse.json({ corrections: result.rows });
  } catch (error) {
    console.error('Corrections GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    const body = await request.json();
    const { decision_id, citizen_email, reason, supporting_evidence_url } = body;

    if (!citizen_email || !reason) {
        return NextResponse.json({ error: 'Citizen email and reason are required' }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO correction_requests (org_id, decision_id, citizen_email, reason, supporting_evidence_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [orgId, decision_id, citizen_email, reason, supporting_evidence_url]
    );

    return NextResponse.json({ success: true, correction: result.rows[0] });
  } catch (error) {
    console.error('Corrections POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
