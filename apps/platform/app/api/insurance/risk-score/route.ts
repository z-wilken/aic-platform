import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('org_id');

    if (!orgId) {
        return NextResponse.json({ error: 'org_id is required' }, { status: 400 });
    }

    // 1. Fetch current integrity score
    const result = await query(
        'SELECT name, integrity_score, tier FROM organizations WHERE id = $1',
        [orgId]
    );

    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const org = result.rows[0];
    
    // 2. Map Integrity Score to Insurance Risk Rating
    // High Integrity = Low Risk
    const riskRating = org.integrity_score > 90 ? 'AAA' : 
                       org.integrity_score > 80 ? 'AA' :
                       org.integrity_score > 70 ? 'A' :
                       org.integrity_score > 50 ? 'BBB' : 'C (UNINSURABLE)';

    return NextResponse.json({
        success: true,
        organization: org.name,
        timestamp: new Date().toISOString(),
        assessment: {
            integrity_score: org.integrity_score,
            tier: org.tier,
            insurance_risk_rating: riskRating,
            recommendation: org.integrity_score > 80 ? 'APPROVED_FOR_DISCOUNT' : 'REQUIRE_REMEDIATION'
        }
    });

  } catch (error) {
    console.error('Insurance API Error:', error);
    return NextResponse.json({ error: 'Failed to retrieve risk profile' }, { status: 500 });
  }
}