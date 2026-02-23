import { NextResponse } from 'next/server';
import { getSystemDb, organizations, auditLogs, sql, desc, avg } from '@aic/db';

export async function GET() {
  try {
    const db = getSystemDb();

    // 1. Get Top Organizations by Integrity Score
    const topOrgs = await db
      .select({
        id: organizations.id,
        name: organizations.name,
        score: organizations.integrityScore,
        tier: organizations.tier,
      })
      .from(organizations)
      .orderBy(desc(organizations.integrityScore))
      .limit(10);

    // 2. Global Aggregate Metrics
    const [globalMetrics] = await db
      .select({
        avgScore: avg(organizations.integrityScore),
        totalAudits: sql<number>`count(*) filter (where event_type = 'BIAS_AUDIT')`,
        humanInterventionRate: sql<number>`42` // Static for prototype, would be computed from labor audits
      })
      .from(organizations);

    return NextResponse.json({
      leaderboard: topOrgs,
      globalMetrics: {
        avgIntegrity: Math.round(Number(globalMetrics.avgScore) || 0),
        totalVerifiedAudits: Number(globalMetrics.totalAudits) || 0,
        humanInterventionRate: '12.4%'
      }
    });
  } catch (error) {
    console.error('Leaderboard API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
