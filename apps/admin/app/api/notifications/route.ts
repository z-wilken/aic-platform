import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { org_id, title, message, type = 'AUDIT_UPDATE' } = body;

    if (!org_id || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await query(
      'INSERT INTO notifications (org_id, title, message, type) VALUES ($1, $2, $3, $4) RETURNING *',
      [org_id, title, message, type]
    );

    return NextResponse.json({ success: true, notification: result.rows[0] });
  } catch (error) {
    console.error('Admin Notification Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
