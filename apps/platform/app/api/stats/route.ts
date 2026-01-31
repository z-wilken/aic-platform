import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate DB Fetch
  const data = {
    score: 94,
    trend: 2,
    tier: 'TIER_1',
    pendingReviews: 2,
    logs: [
      { id: 'REQ-8392', time: '14:22', type: 'Credit App', outcome: 'DENIED', status: 'AUDIT_REQ' },
      { id: 'REQ-8391', time: '14:15', type: 'Credit App', outcome: 'APPROVED', status: 'VERIFIED' },
      { id: 'REQ-8390', time: '13:45', type: 'Loan Adj.', outcome: 'FLAGGED', status: 'BIAS_ALERT' },
    ]
  };

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate',
    },
  });
}
