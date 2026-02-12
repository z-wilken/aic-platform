import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    const result = await query(
      'SELECT * FROM decision_records WHERE org_id = $1 ORDER BY created_at DESC LIMIT 50',
      [orgId]
    );

    return NextResponse.json({ decisions: result.rows });
  } catch (error) {
    console.error('Decisions GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
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

    const result = await query(
      `INSERT INTO decision_records (org_id, system_name, input_params, outcome, explanation, integrity_hash)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [orgId, system_name, JSON.stringify(input_params), JSON.stringify(outcome), explanation, integrity_hash]
    );

    return NextResponse.json({ success: true, decision: result.rows[0] });
  } catch (error) {
    console.error('Decisions POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
