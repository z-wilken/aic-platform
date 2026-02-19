import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, scheduledAudits, organizations, users, eq, asc } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const db = getSystemDb();
    const result = await db
      .select({
        id: scheduledAudits.id,
        orgId: scheduledAudits.orgId,
        auditorId: scheduledAudits.auditorId,
        scheduledAt: scheduledAudits.scheduledAt,
        status: scheduledAudits.status,
        notes: scheduledAudits.notes,
        orgName: organizations.name,
        auditorName: users.name
      })
      .from(scheduledAudits)
      .innerJoin(organizations, eq(scheduledAudits.orgId, organizations.id))
      .leftJoin(users, eq(scheduledAudits.auditorId, users.id))
      .orderBy(asc(scheduledAudits.scheduledAt));

    return NextResponse.json({ audits: result });
  } catch (error) {
    console.error('Scheduled Audits GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { org_id, auditor_id, scheduled_at, notes } = await request.json();

    if (!org_id || !scheduled_at) {
      return NextResponse.json({ error: 'Organization and date are required' }, { status: 400 });
    }

    const db = getSystemDb();
    const [newAudit] = await db.insert(scheduledAudits).values({
      orgId: org_id,
      auditorId: auditor_id,
      scheduledAt: new Date(scheduled_at),
      notes: notes
    }).returning();

    return NextResponse.json({ success: true, audit: newAudit });
  } catch (error) {
    console.error('Scheduled Audits POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
