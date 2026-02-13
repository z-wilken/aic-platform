import { NextResponse } from 'next/server';
import { organizations, auditRequirements, complianceReports, desc, withTenant, calculateOrganizationIntelligence, AICTransaction } from '@aic/db';
import { auth } from '@aic/auth';
import { StatsResponseSchema } from '@aic/types';
import { Session } from 'next-auth';

type AuditRequirement = typeof auditRequirements.$inferSelect;

export async function GET() {
  try {
    const session: Session | null = await auth();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId as string;

    // 1. Execute Core Business Logic (Decoupled & RLS Enforced)
    const intel = await calculateOrganizationIntelligence(orgId);

    // 2. Fetch Additional Telemetry (Using withTenant to ensure RLS context)
    const result = await withTenant(orgId, async (tx: AICTransaction) => {
      const [org] = await tx.select().from(organizations).limit(1);
      
      const requirements = await tx.select().from(auditRequirements);
      
      const velocityResults = await tx
        .select({
            month: complianceReports.monthYear,
            score: complianceReports.integrityScore
        })
        .from(complianceReports)
        .orderBy(desc(complianceReports.monthYear))
        .limit(6);

      return { org, requirements, velocityResults };
    });

    const { org, requirements, velocityResults } = result;

    if (!org) {
        return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // 3. Map Framework Distribution (Radar Data)
    const radarData = [
        { subject: 'Oversight', A: 0, total: 0 },
        { subject: 'Documentation', A: 0, total: 0 },
        { subject: 'Transparency', A: 0, total: 0 },
        { subject: 'Technical', A: 0, total: 0 },
        { subject: 'Empathy', A: 0, total: 0 },
    ];

    requirements.forEach((req: AuditRequirement) => {
        const catMap: Record<string, string> = {
            'OVERSIGHT': 'Oversight',
            'DOCUMENTATION': 'Documentation',
            'TRANSPARENCY': 'Transparency',
            'TECHNICAL': 'Technical',
            'EMPATHY': 'Empathy'
        };
        const subject = catMap[req.category?.toUpperCase() || ''] || 'Technical';
        const dataPoint = radarData.find(d => d.subject === subject);
        if (dataPoint) {
            dataPoint.total++;
            if (req.status === 'VERIFIED') dataPoint.A += 1;
        }
    });

    const finalRadarData = radarData.map((d) => ({
        subject: d.subject,
        A: d.total > 0 ? Math.round((d.A / d.total) * 100) : 0,
        fullMark: 100
    }));

    // 4. Map Velocity Data
    const velocityData = velocityResults.reverse().map((v: { month: string; score: number }) => ({
        month: v.month,
        score: v.score
    }));

    if (velocityData.length === 0) {
        velocityData.push({ month: 'Live', score: intel.score });
    }

    // --- Institutional Integrity Check (Zod Validation) ---
    const validatedData = StatsResponseSchema.parse({
      orgName: org.name,
      orgId: orgId,
      tier: org.tier || 'TIER_3',
      score: intel.score,
      openIncidents: intel.openIncidents,
      totalRequirements: intel.totalRequirements,
      verifiedRequirements: intel.verifiedRequirements,
      velocityData,
      radarData: finalRadarData,
      status: 'ACTIVE_AUDIT'
    });

    return NextResponse.json(validatedData);
  } catch (error) {
    console.error('[STATS API] Institutional Failure:', error);
    return NextResponse.json({ error: 'Internal intelligence failure' }, { status: 500 });
  }
}
