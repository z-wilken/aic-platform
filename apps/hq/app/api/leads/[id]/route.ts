import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, leads, eq } from '@aic/db';
import { auth } from '@aic/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const { status, company, score } = await request.json();

    const db = getSystemDb();

    const [updatedLead] = await db
      .update(leads)
      .set({ status, company, score: score !== undefined ? Math.round(score) : undefined })
      .where(eq(leads.id, id))
      .returning();

    if (!updatedLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error('Lead Patch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
