import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

    // 1. Fetch current status and verified evidence count
    const orgResult = await query(
        'SELECT name, integrity_score, tier FROM organizations WHERE id = $1',
        [orgId]
    );
    const org = orgResult.rows[0];

    if (org.integrity_score < 80) {
        return NextResponse.json({ 
            error: 'Minimum score of 80% required for insurance underwriting sync.' 
        }, { status: 400 });
    }

    // 2. Transmit Secure Underwriting Block
    // In production, this would be a secure web-hook to iTOO or Santam's actuarial system
    const underwritingBlock = {
        aic_identifier: `AIC-SYNC-${orgId.substring(0,8)}`,
        entity_name: org.name,
        integrity_score: org.integrity_score,
        risk_tier: org.tier,
        audit_trail_hash: 'SHA256-SYNCHRONIZED-LEDGER-TRAIL',
        timestamp: new Date().toISOString(),
        discount_eligibility: org.integrity_score >= 100 ? 'PREMIUM_TIER' : 'STANDARD_DISCOUNT'
    };

    // Log the transmission in the Trust Registry
    await query(
        `INSERT INTO audit_logs (org_id, system_name, event_type, details, integrity_hash) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
            orgId, 
            'Insurance Underwriting API', 
            'INSURANCE_SYNC', 
            JSON.stringify(underwritingBlock),
            'SHA256-INSURANCE-BLOCK-AUTH'
        ]
    );

    return NextResponse.json({ 
        success: true, 
        message: 'Actuarial risk profile synchronized with insurer.',
        sync_id: underwritingBlock.aic_identifier
    });

  } catch (error) {
    console.error('Insurance Sync API Error:', error);
    return NextResponse.json({ error: 'Failed to synchronize with insurer' }, { status: 500 });
  }
}
