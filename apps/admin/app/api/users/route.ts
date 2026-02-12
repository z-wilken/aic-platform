import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
  const session: any = await getSession();
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await query(`
      SELECT u.id, u.email, u.name, u.role, u.is_active, u.created_at, o.name as org_name
      FROM users u
      LEFT JOIN organizations o ON u.org_id = o.id
      ORDER BY u.created_at DESC
    `);

    return NextResponse.json({ users: result.rows });
  } catch (error) {
    console.error('Admin Users GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session: any = await getSession();
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, password, name, role, org_id } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await query(`
      INSERT INTO users (email, password_hash, name, role, org_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, name, role
    `, [email.toLowerCase(), passwordHash, name, role, org_id || null]);

    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Admin Users POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
