import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, scheduledAudits, eq } from '@aic/db';
import { auth } from '@aic/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.isSuperAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { status, notes, auditor_id, scheduled_at } = await request.json();

    const db = getSystemDb();

    const [updatedAudit] = await db
      .update(scheduledAudits)
      .set({ 
        status, 
        notes, 
        auditorId: auditor_id, 
        scheduledAt: scheduled_at ? new Date(scheduled_at) : undefined,
        updatedAt: new Date() 
      })
      .where(eq(scheduledAudits.id, id))
      .returning();

    if (!updatedAudit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, audit: updatedAudit });
  } catch (error) {
    console.error('Scheduled Audit PATCH Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.isSuperAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const db = getSystemDb();
    const [deletedAudit] = await db
      .delete(scheduledAudits)
      .where(eq(scheduledAudits.id, id))
      .returning({ id: scheduledAudits.id });

    if (!deletedAudit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Audit deleted successfully' });
  } catch (error) {
    console.error('Scheduled Audit DELETE Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
