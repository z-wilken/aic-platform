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
    const { text, context = 'rejection' } = body;

    if (typeof text !== 'string' || text.trim().length === 0 || text.length > 10000) {
      return NextResponse.json({ error: 'Text is required (max 10000 characters)' }, { status: 400 });
    }

    // 1. Call Python Engine for NLP Empathy Analysis
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (ENGINE_API_KEY) headers['X-API-Key'] = ENGINE_API_KEY;

    const engineResponse = await fetch(`${ENGINE_URL}/api/v1/analyze/empathy`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ text, context })
    });

    if (!engineResponse.ok) throw new Error('Empathy analysis failed');

    const result = await engineResponse.json();

    const db = getTenantDb(orgId);

    // 2. Log as an Empathy Audit Event
    await db.query(async (tx) => {
      await tx.insert(auditLogs).values({
        orgId,
        systemName: 'Communication Auditor',
        eventType: 'EMPATHY_CHECK',
        details: result,
        integrityHash: result.audit_hash,
        status: 'VERIFIED'
      });
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('[SECURITY] Empathy Service Error:', error);
    return NextResponse.json({ error: 'Failed to analyze communication tone' }, { status: 500 });
  }
}
