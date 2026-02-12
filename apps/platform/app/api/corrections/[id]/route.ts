import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { getSession } from '../../../../lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;
    const userId = session.user.id;

    const { status, resolution_details } = await request.json();

    const result = await query(
      `UPDATE correction_requests 
       SET status = $1, resolution_details = $2, human_reviewer_id = $3, updated_at = NOW() 
       WHERE id = $4 AND org_id = $5 
       RETURNING *`,
      [status, resolution_details, userId, id, orgId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Correction request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, correction: result.rows[0] });
  } catch (error) {
    console.error('Correction PATCH Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
