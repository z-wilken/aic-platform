import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, leads, desc } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const db = getSystemDb();
    const result = await db.select().from(leads).orderBy(desc(leads.createdAt));

    return NextResponse.json({ leads: result });
  } catch (error) {
    console.error('Admin Leads API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, company, status = 'PROSPECT' } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const db = getSystemDb();
    const [newLead] = await db.insert(leads).values({
      email: email.toLowerCase(),
      company: company || '',
      source: 'MANUAL',
      status: status
    }).returning();

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error('Admin Lead Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
