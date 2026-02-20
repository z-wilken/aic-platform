import { NextResponse } from 'next/server';
import { getSystemDb, alphaApplications, desc } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const db = getSystemDb();
    const result = await db.select().from(alphaApplications).orderBy(desc(alphaApplications.createdAt));
    return NextResponse.json({ applications: result });
  } catch (error) {
    console.error('Admin Applications API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}