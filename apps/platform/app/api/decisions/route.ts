import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb, decisionRecords, eq, desc, LedgerService } from '@aic/db';
import { getSession } from '../../../lib/auth';
import crypto from 'crypto';
import type { Session } from 'next-auth';

export async function GET() {
  try {
    const session = await getSession() as Session | null;
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;
    const db = getTenantDb(orgId);

    return await db.query(async (tx) => {
      const result = await tx
        .select()
        .from(decisionRecords)
        .where(eq(decisionRecords.orgId, orgId))
        .orderBy(desc(decisionRecords.createdAt))
        .limit(50);

      return NextResponse.json({ decisions: result });
    });
  } catch (error) {
    console.error('[SECURITY] Decisions GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession() as Session | null;
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    const body = await request.json();
    const { system_name, input_params, outcome, explanation } = body;

    if (!system_name || !input_params || !outcome) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate integrity hash
    const hashPayload = JSON.stringify({ orgId, system_name, input_params, outcome });
    const integrity_hash = crypto.createHash('sha256').update(hashPayload).digest('hex');

    const db = getTenantDb(orgId);

    return await db.query(async (tx) => {
      const [newDecision] = await tx.insert(decisionRecords).values({
        orgId,
        systemName: system_name,
        inputParams: input_params,
        outcome,
        explanation,
        integrityHash: integrity_hash
      }).returning();

      // Record to Institutional Ledger
      await LedgerService.append('DECISION_RECORDED', session.user.id, {
        decisionId: newDecision.id,
        orgId,
        systemName: system_name,
        integrityHash: integrity_hash
      });

      return NextResponse.json({ success: true, decision: newDecision });
    });
  } catch (error) {
    console.error('[SECURITY] Decisions POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
