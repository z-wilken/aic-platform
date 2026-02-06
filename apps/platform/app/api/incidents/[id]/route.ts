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
    const userId = session?.user?.id;
    const { status, resolution_details } = await request.json();

    const result = await query(
      `UPDATE incidents 
       SET status = $1, resolution_details = $2, human_reviewer_id = $3, updated_at = NOW() 
       WHERE id = $4 RETURNING *`,
      [status, resolution_details, userId, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
    }

    // Log the resolution in the audit logs for evidence
    await query(
        `INSERT INTO audit_logs (org_id, system_name, event_type, details, integrity_hash) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
            result.rows[0].org_id, 
            'Human Accountability Board', 
            'INCIDENT_RESOLUTION', 
            JSON.stringify({ incident_id: id, status, reviewer: userId }),
            'SHA256-RESOLUTION-TRAIL'
        ]
    );

    return NextResponse.json({ success: true, incident: result.rows[0] });
  } catch (error) {
    console.error('Incident Patch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
