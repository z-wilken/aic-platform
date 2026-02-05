import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

    const result = await query(
      'SELECT id, key_prefix, label, last_used_at, created_at FROM api_keys WHERE org_id = $1 AND is_active = TRUE ORDER BY created_at DESC',
      [orgId]
    );

    return NextResponse.json({ keys: result.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve keys' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    
    const body = await request.json();
    const { label } = body;

    // 1. Generate real API key (aic_live_ + 32 chars)
    const rawKey = crypto.randomBytes(24).toString('hex');
    const fullKey = `aic_live_${rawKey}`;
    const prefix = 'aic_live_';
    
    // 2. Hash for storage
    const salt = await bcrypt.genSalt(10);
    const keyHash = await bcrypt.hash(fullKey, salt);

    await query(
      `INSERT INTO api_keys (org_id, key_prefix, key_hash, label) 
       VALUES ($1, $2, $3, $4)`,
      [orgId, prefix, keyHash, label || 'Default Key']
    );

    // 3. Return full key only once
    return NextResponse.json({ 
        success: true, 
        apiKey: fullKey,
        warning: 'Store this key securely. It will not be shown again.'
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate key' }, { status: 500 });
  }
}
