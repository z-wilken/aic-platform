import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb, auditLogs } from '@aic/db';
import { getSession } from '../../../lib/auth';
import type { Session } from 'next-auth';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';
const ENGINE_API_KEY = process.env.ENGINE_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession() as Session | null;
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    const body = await request.json();
    const { modelType, inputFeatures, decision } = body;

    // 1. Call Python Engine for Local Explanation (XAI)
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (ENGINE_API_KEY) headers['X-API-Key'] = ENGINE_API_KEY;

    const engineResponse = await fetch(`${ENGINE_URL}/api/v1/explain`, {
        method: 'POST',
        headers,
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

    const db = getTenantDb(orgId);

    // 2. Log this as a transparency event in audit_logs
    await db.query(async (tx) => {
      await tx.insert(auditLogs).values({
        orgId,
        systemName: modelType,
        eventType: 'TRANSPARENCY_EXPLANATION',
        details: { input: inputFeatures, output: explanation },
        status: 'VERIFIED',
        integrityHash: `EXP-${Date.now()}`
      });
    });

    return NextResponse.json({ success: true, explanation });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[SECURITY] Explanation Service Error:', message);
    return NextResponse.json({ error: 'Failed to generate explanation' }, { status: 500 });
  }
}
