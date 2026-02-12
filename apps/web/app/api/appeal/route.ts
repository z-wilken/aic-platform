import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { isValidEmail, isNonEmptyString, isValidLongText, safeParseJSON } from '@/lib/validation';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const { allowed } = checkRateLimit(`appeal:${ip}`, 3, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await safeParseJSON(request);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { orgId, citizen_email, system_name, description } = body;

    if (!isNonEmptyString(orgId)) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }
    if (!isValidEmail(citizen_email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }
    if (!isValidLongText(description)) {
      return NextResponse.json({ error: 'Description is required (max 5000 characters)' }, { status: 400 });
    }

    const safeName = isNonEmptyString(system_name) ? system_name : 'Unknown';

    // 1. Log the Incident
    const result = await query(
      `INSERT INTO incidents (org_id, citizen_email, system_name, description, status)
       VALUES ($1, $2, $3, $4, 'OPEN') RETURNING id`,
      [orgId, citizen_email, safeName, description]
    );

    // 2. Notify the Organization
    await query(
        `INSERT INTO notifications (org_id, title, message, type)
         VALUES ($1, $2, $3, 'ALERT')`,
        [
            orgId,
            'NEW CITIZEN APPEAL',
            `A citizen has contested an automated decision from "${safeName}". Action required within 72 hours.`
        ]
    );

    return NextResponse.json({ success: true, appealId: result.rows[0].id });

  } catch (error) {
    console.error('Public Appeal API Error:', error);
    return NextResponse.json({ error: 'Failed to process appeal' }, { status: 500 });
  }
}
