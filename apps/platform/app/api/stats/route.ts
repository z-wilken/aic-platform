import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function GET() {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

    // 1. Fetch organization details
    const orgResult = await query(
        'SELECT name, tier, integrity_score FROM organizations WHERE id = $1',
        [orgId]
    );

    if (orgResult.rows.length === 0) {
        return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const org = orgResult.rows[0];

    // 2. Fetch requirement counts for rigorous scoring
    // UC: User Consent/Documentation (0.20)
    // HO: Human Oversight (0.35)
    // TR: Transparency/Reporting (0.25)
    // IN: Integrity/Technical (0.20)
    const reqsResult = await query(
        'SELECT category, status FROM audit_requirements WHERE org_id = $1',
        [orgId]
    );

    const requirements = reqsResult.rows;
    
    // Rigorous Scoring Logic based on PRD Specs
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

    // Update the organization's score in the background if it differs
    const roundedScore = Math.round(calculatedScore);
    if (roundedScore !== org.integrity_score) {
        await query('UPDATE organizations SET integrity_score = $1 WHERE id = $2', [roundedScore, orgId]);
    }

    return NextResponse.json({
      orgName: org.name,
      orgId: orgId,
      tier: org.tier,
      score: roundedScore,
      totalRequirements: requirements.length,
      verifiedRequirements: requirements.filter(r => r.status === 'VERIFIED').length,
      status: roundedScore === 100 ? 'CERTIFIED' : 'ACTIVE_AUDIT'
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    // Remove mock fallback to expose real failures
    return NextResponse.json({ error: 'Failed to retrieve organization intelligence' }, { status: 500 });
  }
}
