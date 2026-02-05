import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orgId, citizen_email, system_name, description } = body;

    if (!orgId || !citizen_email || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Log the Incident
    const result = await query(
      `INSERT INTO incidents (org_id, citizen_email, system_name, description, status) 
       VALUES ($1, $2, $3, $4, 'OPEN') RETURNING id`,
      [orgId, citizen_email, system_name || 'Unknown', description]
    );

    // 2. Notify the Organization
    await query(
        `INSERT INTO notifications (org_id, title, message, type) 
         VALUES ($1, $2, $3, 'ALERT')`,
        [
            orgId, 
            'NEW CITIZEN APPEAL', 
            `A citizen has contested an automated decision from "${system_name || 'Unknown'}". Action required within 72 hours.`
        ]
    );

    return NextResponse.json({ success: true, appealId: result.rows[0].id });

  } catch (error) {
    console.error('Public Appeal API Error:', error);
    return NextResponse.json({ error: 'Failed to process appeal' }, { status: 500 });
  }
}
