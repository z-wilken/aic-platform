import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    // Try to fetch real data
    const logsResult = await query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 5');
    const orgResult = await query('SELECT * FROM organizations LIMIT 1');

    if (orgResult.rows.length > 0) {
        const org = orgResult.rows[0];
        return NextResponse.json({
            score: org.integrity_score,
            tier: org.tier,
            logs: logsResult.rows,
            mode: 'LIVE'
        });
    }
  } catch (e) {
    console.warn("DB Connection failed, falling back to mock data");
  }

  // Fallback Mock Data (Safety Net)
  const data = {
    score: 94,
    trend: 2,
    tier: 'TIER_1',
    pendingReviews: 2,
    logs: [
      { id: 'REQ-8392', created_at: '14:22', input_type: 'Credit App', outcome: 'DENIED', status: 'AUDIT_REQ' },
      { id: 'REQ-8391', created_at: '14:15', input_type: 'Credit App', outcome: 'APPROVED', status: 'VERIFIED' },
    ],
    mode: 'MOCK'
  };

  return NextResponse.json(data);
}
