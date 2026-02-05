import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function GET() {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

    const result = await query(
      'SELECT * FROM incidents WHERE org_id = $1 ORDER BY created_at DESC',
      [orgId]
    );

    return NextResponse.json({ incidents: result.rows });
  } catch (error) {
    console.error('Incident Retrieval Error:', error);
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    
    const body = await request.json();
    const { id, resolution, status } = body;

    if (!id || !resolution) {
      return NextResponse.json({ error: 'ID and resolution required' }, { status: 400 });
    }

    // Update the incident with human oversight details
    await query(
      `UPDATE incidents 
       SET status = $1, 
           resolution_details = $2, 
           human_reviewer_id = $3,
           updated_at = NOW() 
       WHERE id = $4 AND org_id = $5`,
      [status || 'RESOLVED', resolution, session?.user?.id, id, orgId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Incident Update Error:', error);
    return NextResponse.json({ error: 'Failed to update incident' }, { status: 500 });
  }
}