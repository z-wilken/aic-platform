import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { auth } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orgId = session.user.orgId;

  try {
    // 1. Get Organization details
    const orgResult = await query('SELECT * FROM organizations WHERE id = $1', [orgId]);

    // 2. Get Recent Audit Logs
    const logsResult = await query(
        'SELECT id, created_at, input_type, outcome, status FROM audit_logs WHERE org_id = $1 ORDER BY created_at DESC LIMIT 5',
        [orgId]
    );

    // 3. Get Count of Pending Audit Requirements
    const pendingReqsResult = await query(
        "SELECT count(*) FROM audit_requirements WHERE org_id = $1 AND status = 'PENDING'",
        [orgId]
    );

    if (orgResult.rows.length > 0) {
        const org = orgResult.rows[0];
        return NextResponse.json({
            score: org.integrity_score,
            tier: org.tier,
            pendingReviews: parseInt(pendingReqsResult.rows[0].count),
            logs: logsResult.rows,
            mode: 'LIVE'
        });
    }
  } catch (e) {
    console.error("Database query failed:", e);
  }

  // Fallback if org not found or DB fails
  return NextResponse.json({
    score: 0,
    trend: 0,
    tier: 'UNKNOWN',
    pendingReviews: 0,
    logs: [],
    mode: 'MOCK'
  });
}