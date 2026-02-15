import { NextResponse } from 'next/server'
import { getSystemDb, organizations, alphaApplications, leads, auditLogs, desc, sql } from '@aic/db'
import { auth } from '@aic/auth'

export async function GET() {
  const session = await auth()

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const db = getSystemDb();

    // 1. Get overall stats (SuperAdmins see global)
    const [orgsCount] = await db.select({ count: sql<number>`count(*)` }).from(organizations);
    const [appsCount] = await db.select({ count: sql<number>`count(*)` }).from(alphaApplications);
    const [leadsCount] = await db.select({ count: sql<number>`count(*)` }).from(leads);
    const [auditsCount] = await db.select({ count: sql<number>`count(*)` }).from(auditLogs);

    // 2. Get recent applications
    const recentApps = await db.select().from(alphaApplications).orderBy(desc(alphaApplications.createdAt)).limit(5);

    // 3. Get recent leads
    const recentLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5);

    // 4. Get active organizations
    const activeOrgs = await db
      .select({ 
        id: organizations.id, 
        name: organizations.name, 
        tier: organizations.tier, 
        integrityScore: organizations.integrityScore 
      })
      .from(organizations)
      .orderBy(desc(organizations.createdAt))
      .limit(10);

    return NextResponse.json({
      stats: {
        pendingApplications: Number(appsCount?.count || 0),
        activeCertifications: Number(orgsCount?.count || 0),
        totalLeads: Number(leadsCount?.count || 0),
        auditsTotal: Number(auditsCount?.count || 0)
      },
      recentApplications: recentApps,
      recentLeads: recentLeads,
      activeOrgs: activeOrgs
    })
  } catch (error) {
    console.error('Admin Dashboard API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
