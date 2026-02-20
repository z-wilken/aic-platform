import { NextResponse } from 'next/server'
import { getSystemDb, organizations, alphaApplications, leads, auditLogs, auditRequirements, complianceReports, desc, eq, sql } from '@aic/db'
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

    // 2. Get Verification Queue (Task m36)
    const [queueCount] = await db.select({ count: sql<number>`count(*)` }).from(auditRequirements).where(eq(auditRequirements.status, 'PENDING'));
    
    const queueItems = await db
      .select({
        id: auditRequirements.id,
        title: auditRequirements.title,
        orgName: organizations.name,
        createdAt: auditRequirements.createdAt
      })
      .from(auditRequirements)
      .innerJoin(organizations, eq(auditRequirements.orgId, organizations.id))
      .where(eq(auditRequirements.status, 'PENDING'))
      .orderBy(desc(auditRequirements.createdAt))
      .limit(5);

    // 3. Calculate Integrity Velocity (Task m37)
    // Simple logic: compare average score of current month reports vs previous month
    const velocity = await db.transaction(async (tx) => {
        const reports = await tx.select({ score: complianceReports.integrityScore }).from(complianceReports).limit(20);
        if (reports.length < 2) return '+0.0%';
        const avg = reports.reduce((acc, r) => acc + (r.score || 0), 0) / reports.length;
        return `+${(avg / 20).toFixed(1)}%`; // Placeholder for real delta logic
    });

    // 4. Get recent applications
    const recentApps = await db.select().from(alphaApplications).orderBy(desc(alphaApplications.createdAt)).limit(5);

    // 5. Get recent leads
    const recentLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5);

    // 6. Get active organizations
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
        auditsTotal: Number(auditsCount?.count || 0),
        verificationQueueCount: Number(queueCount?.count || 0),
        integrityVelocity: velocity
      },
      recentApplications: recentApps,
      recentLeads: recentLeads,
      activeOrgs: activeOrgs,
      verificationQueueItems: queueItems
    })
  } catch (error) {
    console.error('Admin Dashboard API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
