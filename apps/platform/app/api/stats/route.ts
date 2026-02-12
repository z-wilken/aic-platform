import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { organizations, auditRequirements, incidents } from '@/db/schema';
import { eq, and, sql as drizzleSql } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    // 1. Fetch organization details
    const org = await db.query.organizations.findFirst({
        where: eq(organizations.id, orgId)
    });

    if (!org) {
        return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // 2. Fetch requirements for scoring
    const requirements = await db.query.auditRequirements.findMany({
        where: eq(auditRequirements.orgId, orgId)
    });
    
    const categories = {
        'DOCUMENTATION': { weight: 0.20, score: 0, total: 0 },
        'OVERSIGHT': { weight: 0.35, score: 0, total: 0 },
        'REPORTS': { weight: 0.25, score: 0, total: 0 },
        'TECHNICAL': { weight: 0.20, score: 0, total: 0 }
    };

    requirements.forEach(req => {
        const cat = categories[req.category as keyof typeof categories];
        if (cat) {
            cat.total++;
            if (req.status === 'VERIFIED') cat.score++;
        }
    });

    let calculatedScore = 0;
    Object.values(categories).forEach(cat => {
        if (cat.total > 0) {
            calculatedScore += (cat.score / cat.total) * cat.weight * 100;
        }
    });

    // 3. Apply Penalty for unresolved incidents
    const openIncidentsResult = await db.select({ count: drizzleSql<number>`count(*)` })
        .from(incidents)
        .where(and(eq(incidents.orgId, orgId), eq(incidents.status, 'OPEN')));
    
    const openIncidents = Number(openIncidentsResult[0]?.count || 0);
    const penalty = openIncidents * 5;

    const finalScore = Math.max(0, Math.round(calculatedScore) - penalty);

    // Update organization score if it differs
    if (finalScore !== org.integrityScore) {
        await db.update(organizations)
            .set({ integrityScore: finalScore })
            .where(eq(organizations.id, orgId));
    }

    return NextResponse.json({
      orgName: org.name,
      orgId: orgId,
      tier: org.tier,
      score: finalScore,
      openIncidents: openIncidents,
      totalRequirements: requirements.length,
      verifiedRequirements: requirements.filter(r => r.status === 'VERIFIED').length,
      status: finalScore === 100 ? 'CERTIFIED' : 'ACTIVE_AUDIT'
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ error: 'Failed to retrieve organization intelligence' }, { status: 500 });
  }
}
