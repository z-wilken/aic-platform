import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    const result = await query(
      'SELECT * FROM models WHERE org_id = $1 AND is_active = TRUE ORDER BY created_at DESC',
      [orgId]
    );

    return NextResponse.json({ models: result.rows });
  } catch (error) {
    console.error('Models GET Error:', error);
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
    const { name, version, type, description, metadata } = body;

    if (!name || !type) {
        return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO models (org_id, name, version, type, description, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [orgId, name, version || '1.0.0', type, description, JSON.stringify(metadata || {})]
    );

    return NextResponse.json({ success: true, model: result.rows[0] });
  } catch (error) {
    console.error('Models POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
