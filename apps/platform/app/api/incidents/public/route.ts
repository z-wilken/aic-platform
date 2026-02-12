import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { checkRateLimit, getClientIP } from '../../../../lib/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const { allowed } = checkRateLimit(`incident:${ip}`, 3, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { orgName, systemName, citizen_email, description } = body;

    if (typeof citizen_email !== 'string' || !EMAIL_RE.test(citizen_email) || citizen_email.length > 254) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }
    if (typeof description !== 'string' || description.trim().length === 0 || description.length > 5000) {
      return NextResponse.json({ error: 'Description is required (max 5000 characters)' }, { status: 400 });
    }

    const safeOrgName = typeof orgName === 'string' ? orgName.slice(0, 200) : '';
    const safeSysName = typeof systemName === 'string' && systemName.trim() ? systemName.slice(0, 200) : 'Not Specified';

    // 1. Resolve Org ID (Simple match for demo, in production we'd use a more robust lookup)
    let orgId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'; // Fallback to demo org
    if (safeOrgName) {
      const orgResult = await query(
          'SELECT id FROM organizations WHERE name ILIKE $1 LIMIT 1',
          [`%${safeOrgName}%`]
      );
      if (orgResult.rows[0]?.id) {
        orgId = orgResult.rows[0].id;
      }
    }

    // 2. Insert into Incidents table
    const result = await query(
        `INSERT INTO incidents (org_id, citizen_email, system_name, description, status)
         VALUES ($1, $2, $3, $4, 'OPEN') RETURNING id`,
        [orgId, citizen_email, safeSysName, description]
    );

    // 3. Create Notification for the Organization's Admin
    await query(
        'INSERT INTO notifications (org_id, title, message, type) VALUES ($1, $2, $3, $4)',
        [
            orgId,
            'New Citizen Appeal',
            `A new appeal has been lodged by ${citizen_email} regarding ${safeSysName}.`,
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
