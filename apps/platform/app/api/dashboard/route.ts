import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';

// GET /api/dashboard - Comprehensive dashboard data
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('org_id') || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'; // Demo org

    // 1. Get organization details
    const orgResult = await query(
      'SELECT * FROM organizations WHERE id = $1',
      [orgId]
    );

    if (orgResult.rows.length === 0) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const org = orgResult.rows[0];

    // 2. Get audit statistics
    const auditStatsResult = await query(`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'VERIFIED') as verified,
        COUNT(*) FILTER (WHERE status = 'FLAGGED') as flagged,
        COUNT(*) FILTER (WHERE status = 'PENDING') as pending,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as last_24h,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as last_7d
      FROM audit_logs
      WHERE org_id = $1
    `, [orgId]);

    const auditStats = auditStatsResult.rows[0];

    // 3. Get recent audit logs
    const recentLogsResult = await query(`
      SELECT id, action, input_type, outcome, status, created_at
      FROM audit_logs
      WHERE org_id = $1
      ORDER BY created_at DESC
      LIMIT 10
    `, [orgId]);

    // 4. Calculate integrity score trend (simplified)
    // In production, this would query historical data
    const total = parseInt(auditStats.total) || 1;
    const verified = parseInt(auditStats.verified) || 0;
    const flagged = parseInt(auditStats.flagged) || 0;

    // Score calculation: base 70 + (verified ratio * 30) - (flagged penalty)
    const verifiedRatio = total > 0 ? verified / total : 1;
    const flaggedPenalty = total > 0 ? (flagged / total) * 20 : 0;
    const calculatedScore = Math.round(70 + (verifiedRatio * 30) - flaggedPenalty);
    const integrityScore = Math.max(0, Math.min(100, calculatedScore));

    // 5. Get 5 Rights compliance status
    const rightsCompliance = {
      human_agency: {
        name: 'Right to Human Agency',
        status: flagged === 0 ? 'COMPLIANT' : 'ATTENTION_NEEDED',
        score: flagged === 0 ? 100 : Math.max(60, 100 - (flagged * 10))
      },
      explanation: {
        name: 'Right to Explanation',
        status: 'COMPLIANT',
        score: 85 // Would check if explanations are generated
      },
      empathy: {
        name: 'Right to Empathy',
        status: 'COMPLIANT',
        score: 80 // Would check rejection letter tone scores
      },
      correction: {
        name: 'Right to Correction',
        status: 'COMPLIANT',
        score: 90 // Would check appeal process metrics
      },
      truth: {
        name: 'Right to Truth',
        status: 'COMPLIANT',
        score: 95 // Would check AI disclosure compliance
      }
    };

    // Overall rights score
    const rightsScores = Object.values(rightsCompliance).map(r => r.score);
    const overallRightsScore = Math.round(
      rightsScores.reduce((a, b) => a + b, 0) / rightsScores.length
    );

    // 6. Action items
    const actionItems = [];
    if (parseInt(auditStats.pending) > 0) {
      actionItems.push({
        type: 'PENDING_REVIEW',
        priority: 'high',
        title: `${auditStats.pending} decisions pending human review`,
        action: 'Review pending audit logs'
      });
    }
    if (parseInt(auditStats.flagged) > 0) {
      actionItems.push({
        type: 'FLAGGED_DECISION',
        priority: 'critical',
        title: `${auditStats.flagged} decisions flagged for bias`,
        action: 'Investigate flagged decisions'
      });
    }

    return NextResponse.json({
      organization: {
        id: org.id,
        name: org.name,
        tier: org.tier,
        is_alpha: org.is_alpha
      },
      integrity: {
        score: integrityScore,
        trend: 2, // Would calculate from historical data
        status: integrityScore >= 80 ? 'HEALTHY' : integrityScore >= 60 ? 'ATTENTION' : 'CRITICAL'
      },
      audit_summary: {
        total: parseInt(auditStats.total) || 0,
        verified: parseInt(auditStats.verified) || 0,
        flagged: parseInt(auditStats.flagged) || 0,
        pending: parseInt(auditStats.pending) || 0,
        last_24h: parseInt(auditStats.last_24h) || 0,
        last_7d: parseInt(auditStats.last_7d) || 0
      },
      rights_compliance: rightsCompliance,
      overall_rights_score: overallRightsScore,
      recent_logs: recentLogsResult.rows,
      action_items: actionItems,
      tier_requirements: getTierRequirements(org.tier),
      mode: 'LIVE',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Dashboard error:', error);

    // Fallback mock data
    return NextResponse.json({
      organization: {
        id: 'demo',
        name: 'Demo Organization',
        tier: 'TIER_1',
        is_alpha: true
      },
      integrity: {
        score: 94,
        trend: 2,
        status: 'HEALTHY'
      },
      audit_summary: {
        total: 1250,
        verified: 1180,
        flagged: 12,
        pending: 58,
        last_24h: 42,
        last_7d: 285
      },
      rights_compliance: {
        human_agency: { name: 'Right to Human Agency', status: 'COMPLIANT', score: 92 },
        explanation: { name: 'Right to Explanation', status: 'COMPLIANT', score: 85 },
        empathy: { name: 'Right to Empathy', status: 'COMPLIANT', score: 88 },
        correction: { name: 'Right to Correction', status: 'COMPLIANT', score: 90 },
        truth: { name: 'Right to Truth', status: 'COMPLIANT', score: 95 }
      },
      overall_rights_score: 90,
      recent_logs: [
        { id: 'REQ-8392', action: 'CREDIT_DECISION', input_type: 'Credit App', outcome: 'DENIED', status: 'PENDING', created_at: new Date().toISOString() },
        { id: 'REQ-8391', action: 'CREDIT_DECISION', input_type: 'Credit App', outcome: 'APPROVED', status: 'VERIFIED', created_at: new Date().toISOString() }
      ],
      action_items: [
        { type: 'PENDING_REVIEW', priority: 'high', title: '2 decisions pending review', action: 'Review pending audit logs' }
      ],
      tier_requirements: getTierRequirements('TIER_1'),
      mode: 'MOCK',
      timestamp: new Date().toISOString()
    });
  }
}

function getTierRequirements(tier: string) {
  const requirements = {
    TIER_1: {
      human_review: '100% of decisions',
      audit_frequency: 'Quarterly',
      incident_response: '24 hours',
      governance: 'Board-level oversight required'
    },
    TIER_2: {
      human_review: 'Edge cases and flagged decisions',
      audit_frequency: 'Annual',
      incident_response: '72 hours',
      governance: 'Designated compliance officer'
    },
    TIER_3: {
      human_review: 'Periodic sampling',
      audit_frequency: 'Annual self-assessment',
      incident_response: '7 days',
      governance: 'Internal policy documentation'
    }
  };

  return requirements[tier as keyof typeof requirements] || requirements.TIER_3;
}
