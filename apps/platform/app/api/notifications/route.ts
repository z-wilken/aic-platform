import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function GET() {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

    const result = await query(
      'SELECT * FROM notifications WHERE org_id = $1 ORDER BY created_at DESC LIMIT 20',
      [orgId]
    );

    return NextResponse.json({ notifications: result.rows });
  } catch (error) {
    console.error('Notifications API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await query(
      "UPDATE notifications SET status = 'READ' WHERE id = $1",
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notifications Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
