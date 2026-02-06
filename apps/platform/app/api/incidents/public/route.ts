import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orgName, systemName, citizen_email, description } = body;

    if (!citizen_email || !description) {
        return NextResponse.json({ error: 'Email and description are required' }, { status: 400 });
    }

    // 1. Resolve Org ID (Simple match for demo, in production we'd use a more robust lookup)
    const orgResult = await query(
        'SELECT id FROM organizations WHERE name ILIKE $1 LIMIT 1',
        [`%${orgName}%`]
    );

    const orgId = orgResult.rows[0]?.id || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'; // Fallback to demo org

    // 2. Insert into Incidents table
    const result = await query(
        `INSERT INTO incidents (org_id, citizen_email, system_name, description, status) 
         VALUES ($1, $2, $3, $4, 'OPEN') RETURNING id`,
        [orgId, citizen_email, systemName || 'Not Specified', description]
    );

    // 3. Create Notification for the Organization's Admin
    await query(
        'INSERT INTO notifications (org_id, title, message, type) VALUES ($1, $2, $3, $4)',
        [
            orgId, 
            'New Citizen Appeal', 
            `A new appeal has been lodged by ${citizen_email} regarding ${systemName || 'an automated system'}.`,
            'ALERT'
        ]
    );

    return NextResponse.json({ 
        success: true, 
        incidentId: result.rows[0].id 
    });

  } catch (error) {
    console.error('Public Incident API Error:', error);
    return NextResponse.json({ error: 'Failed to lodge appeal' }, { status: 500 });
  }
}
