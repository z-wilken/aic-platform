import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../lib/auth';
import { query } from '../../../lib/db';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';
const ENGINE_API_KEY = process.env.ENGINE_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

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

    // 2. Log as an Empathy Audit Event
    await query(
        `INSERT INTO audit_logs (org_id, system_name, event_type, details, integrity_hash) 
         VALUES ($1, $2, $3, $4, $5)`,
        [orgId, 'Communication Auditor', 'EMPATHY_CHECK', JSON.stringify(result), result.audit_hash]
    );

    return NextResponse.json(result);

  } catch (error) {
    console.error('Empathy Service Error:', error);
    return NextResponse.json({ error: 'Failed to analyze communication tone' }, { status: 500 });
  }
}
