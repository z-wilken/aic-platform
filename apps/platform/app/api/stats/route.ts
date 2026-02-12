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

    // 3. Apply Penalty for unresolved Citizen Appeals (Incidents)
    const incidentResult = await query(
        "SELECT count(*) FROM incidents WHERE org_id = $1 AND status = 'OPEN'",
        [orgId]
    );
    const openIncidents = parseInt(incidentResult.rows[0].count);
    const penalty = openIncidents * 5; // -5 points per open incident

    const finalScore = Math.max(0, Math.round(calculatedScore) - penalty);

    // Update the organization's score if it differs
    if (finalScore !== org.integrity_score) {
        await query('UPDATE organizations SET integrity_score = $1 WHERE id = $2', [finalScore, orgId]);
    }

    // Fetch monthly scores from compliance_reports for velocity chart
    const historyResult = await query(
        `SELECT month_year, integrity_score FROM compliance_reports
         WHERE org_id = $1 ORDER BY created_at DESC LIMIT 6`,
        [orgId]
    );
    const monthlyScores = historyResult.rows.reverse().map((r: any) => ({
        month: r.month_year,
        score: r.integrity_score
    }));

    // Fetch last audit timestamp
    const lastAuditResult = await query(
        `SELECT created_at FROM audit_logs WHERE org_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [orgId]
    );
    const lastAuditAt = lastAuditResult.rows[0]?.created_at || null;

    // Calculate category scores for radar chart
    const radarData = Object.entries(categories).map(([key, cat]) => ({
        subject: key.charAt(0) + key.slice(1).toLowerCase(),
        score: cat.total > 0 ? Math.round((cat.score / cat.total) * 100) : 0
    }));

    return NextResponse.json({
      orgName: org.name,
      orgId: orgId,
      tier: org.tier,
      score: finalScore,
      openIncidents: openIncidents,
      totalRequirements: requirements.length,
      verifiedRequirements: requirements.filter(r => r.status === 'VERIFIED').length,
      status: finalScore === 100 ? 'CERTIFIED' : 'ACTIVE_AUDIT',
      monthlyScores,
      radarData,
      lastAuditAt
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    // Remove mock fallback to expose real failures
    return NextResponse.json({ error: 'Failed to retrieve organization intelligence' }, { status: 500 });
  }
}
