import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function GET() {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

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
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    const body = await request.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    // Multi-tenant check: ensure notification belongs to user's org
    const result = await query(
      "UPDATE notifications SET status = 'READ' WHERE id = $1 AND org_id = $2 RETURNING id",
      [id, orgId]
    );

    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Notification not found or access denied' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notifications Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
