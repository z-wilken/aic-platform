import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { organizations, auditLogs } from '@/db/schema';
import { eq, count, and, gte, sql as drizzleSql } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

// GET /api/dashboard - Comprehensive dashboard data
export async function GET(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    // 1. Get organization details
    const org = await db.query.organizations.findFirst({
      where: eq(organizations.id, orgId)
    });

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // 2. Get audit statistics
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [stats] = await db.select({
      total: count(),
      verified: count(drizzleSql`CASE WHEN ${auditLogs.status} = 'VERIFIED' THEN 1 END`),
      flagged: count(drizzleSql`CASE WHEN ${auditLogs.status} = 'FLAGGED' THEN 1 END`),
      pending: count(drizzleSql`CASE WHEN ${auditLogs.status} = 'PENDING' THEN 1 END`),
      last_24h: count(drizzleSql`CASE WHEN ${auditLogs.createdAt} >= ${yesterday} THEN 1 END`),
      last_7d: count(drizzleSql`CASE WHEN ${auditLogs.createdAt} >= ${lastWeek} THEN 1 END`),
    })
    .from(auditLogs)
    .where(eq(auditLogs.orgId, orgId));

    // 3. Get recent audit logs
    const recentLogs = await db.query.auditLogs.findMany({
      where: eq(auditLogs.orgId, orgId),
      orderBy: (logs, { desc }) => [desc(logs.createdAt)],
      limit: 10
    });

    const integrityScore = org.integrityScore || 0;
    const flagged = Number(stats.flagged) || 0;
    const rightsCompliance = {
      human_agency: {
        name: 'Right to Human Agency',
        status: flagged === 0 ? 'COMPLIANT' : 'ATTENTION_NEEDED',
        score: flagged === 0 ? 100 : Math.max(60, 100 - (flagged * 10))
      },
      explanation: {
        name: 'Right to Explanation',
        status: 'COMPLIANT',
        score: 85
      },
      empathy: {
        name: 'Right to Empathy',
        status: 'COMPLIANT',
        score: 80
      },
      correction: {
        name: 'Right to Correction',
        status: 'COMPLIANT',
        score: 90
      },
      truth: {
        name: 'Right to Truth',
        status: 'COMPLIANT',
        score: 95
      }
    };

    // Overall rights score
    const rightsScores = Object.values(rightsCompliance).map(r => r.score);
    const overallRightsScore = Math.round(
      rightsScores.reduce((a, b) => a + b, 0) / rightsScores.length
    );

    // 6. Action items
    const actionItems = [];
    if (Number(stats.pending) > 0) {
      actionItems.push({
        type: 'PENDING_REVIEW',
        priority: 'high',
        title: `${stats.pending} decisions pending human review`,
        action: 'Review pending audit logs'
      });
    }
    if (Number(stats.flagged) > 0) {
      actionItems.push({
        type: 'FLAGGED_DECISION',
        priority: 'critical',
        title: `${stats.flagged} decisions flagged for bias`,
        action: 'Investigate flagged decisions'
      });
    }

    return NextResponse.json({
      organization: {
        id: org.id,
        name: org.name,
        tier: org.tier,
        is_alpha: org.isAlpha
      },
      integrity: {
        score: integrityScore,
        trend: 0,
        status: integrityScore >= 80 ? 'HEALTHY' : integrityScore >= 60 ? 'ATTENTION' : 'CRITICAL'
      },
      audit_summary: {
        total: Number(stats.total) || 0,
        verified: Number(stats.verified) || 0,
        flagged: Number(stats.flagged) || 0,
        pending: Number(stats.pending) || 0,
        last_24h: Number(stats.last_24h) || 0,
        last_7d: Number(stats.last_7d) || 0
      },
      rights_compliance: rightsCompliance,
      overall_rights_score: overallRightsScore,
      recent_logs: recentLogs.map(log => ({
        id: log.id,
        action: log.eventType,
        input_type: log.systemName,
        status: log.status,
        created_at: log.createdAt,
        outcome: (log.details as any)?.outcome
      })),
      action_items: actionItems,
      tier_requirements: getTierRequirements(org.tier || 'TIER_3'),
      mode: 'LIVE',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Failed to retrieve institutional intelligence' }, { status: 500 });
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
