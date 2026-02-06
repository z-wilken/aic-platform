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

    return NextResponse.json({
        incidents: result.rows
    });
  } catch (error) {
    console.error('Incidents API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
