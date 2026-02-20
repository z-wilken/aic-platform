import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, notifications } from '@aic/db';
import { auth } from '@aic/auth';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { org_id, title, message, type = 'AUDIT_UPDATE' } = body;

    if (!org_id || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getSystemDb();
    const [newNotification] = await db.insert(notifications).values({
      orgId: org_id,
      title,
      message,
      type
    }).returning();

    return NextResponse.json({ success: true, notification: newNotification });
  } catch (error) {
    console.error('Admin Notification Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
