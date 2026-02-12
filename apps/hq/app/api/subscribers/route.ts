import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await query(
      'SELECT * FROM newsletter_subscribers WHERE status = $1 ORDER BY subscribed_at DESC',
      ['ACTIVE']
    );
    return NextResponse.json({ subscribers: result.rows });
  } catch (error) {
    console.error('HQ Subscribers API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Public-facing part of the API (called from apps/web)
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await query(
      'INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET status = $2',
      [email.toLowerCase(), 'ACTIVE']
    );

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Public Subscribe Error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
