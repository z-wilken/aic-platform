import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

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
