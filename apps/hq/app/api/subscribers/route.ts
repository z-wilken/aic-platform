import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, newsletterSubscribers, desc, eq } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const db = getSystemDb();
    const result = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.status, 'ACTIVE'))
      .orderBy(desc(newsletterSubscribers.subscribedAt));

    return NextResponse.json({ subscribers: result });
  } catch (error) {
    console.error('HQ Subscribers API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const db = getSystemDb();
    await db
      .insert(newsletterSubscribers)
      .values({ email: email.toLowerCase() })
      .onConflictDoUpdate({
        target: newsletterSubscribers.email,
        set: { status: 'ACTIVE' }
      });

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Public Subscribe Error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
