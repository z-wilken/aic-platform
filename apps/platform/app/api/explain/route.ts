import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import { query } from '../../../lib/db';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

    const body = await request.json();
    const { modelType, inputFeatures, decision } = body;

    // 1. Call Python Engine for Local Explanation (XAI)
    const engineResponse = await fetch(`${ENGINE_URL}/api/v1/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model_type: modelType,
            input_features: inputFeatures,
            decision: decision
        })
    });

    if (!engineResponse.ok) {
        throw new Error('Engine failed to generate explanation');
    }

    const explanation = await engineResponse.json();

    // 2. Log this as a transparency event in audit_logs
    await query(
        `INSERT INTO audit_logs (org_id, system_name, event_type, details, integrity_hash) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
            orgId,
            modelType,
            'TRANSPARENCY_EXPLANATION',
            JSON.stringify({ input: inputFeatures, output: explanation }),
            'SHA256-GEN-EXP'
        ]
    );

    return NextResponse.json({ success: true, explanation });

  } catch (error: any) {
    console.error('Explanation Service Error:', error);
    return NextResponse.json({ error: 'Failed to generate explanation' }, { status: 500 });
  }
}
