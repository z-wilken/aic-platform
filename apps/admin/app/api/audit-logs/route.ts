import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, auditLogs, organizations, eq, desc } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const org_id = searchParams.get('org_id');

    const db = getSystemDb();
    
    const result = await db
      .select({
        id: auditLogs.id,
        orgId: auditLogs.orgId,
        systemName: auditLogs.systemName,
        eventType: auditLogs.eventType,
        status: auditLogs.status,
        createdAt: auditLogs.createdAt,
        integrityHash: auditLogs.integrityHash,
        organizationName: organizations.name
      })
      .from(auditLogs)
      .innerJoin(organizations, eq(auditLogs.orgId, organizations.id))
      .where(org_id ? eq(auditLogs.orgId, org_id) : undefined)
      .orderBy(desc(auditLogs.createdAt))
      .limit(100);

    return NextResponse.json({ logs: result });
  } catch (error) {
    console.error('Admin Audit Logs API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
