import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session: any = await getSession();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await query(`
      SELECT sa.*, o.name as org_name, u.name as auditor_name
      FROM scheduled_audits sa
      JOIN organizations o ON sa.org_id = o.id
      LEFT JOIN users u ON sa.auditor_id = u.id
      ORDER BY sa.scheduled_at ASC
    `);

    return NextResponse.json({ audits: result.rows });
  } catch (error) {
    console.error('Scheduled Audits GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { org_id, auditor_id, scheduled_at, notes } = await request.json();

    if (!org_id || !scheduled_at) {
      return NextResponse.json({ error: 'Organization and date are required' }, { status: 400 });
    }

    const result = await query(`
      INSERT INTO scheduled_audits (org_id, auditor_id, scheduled_at, notes)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [org_id, auditor_id, scheduled_at, notes]);

    return NextResponse.json({ success: true, audit: result.rows[0] });
  } catch (error) {
    console.error('Scheduled Audits POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
