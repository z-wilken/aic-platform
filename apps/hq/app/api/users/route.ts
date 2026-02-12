import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
  const session: any = await getSession();

  if (!session || !session.user.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await query(
      'SELECT id, name, email, role, is_active, is_super_admin, permissions, last_login FROM users ORDER BY created_at DESC'
    );
    return NextResponse.json({ users: result.rows });
  } catch (error) {
    console.error('HQ Users API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session: any = await getSession();

  if (!session || !session.user.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, password, role, permissions } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await query(
      `INSERT INTO users (name, email, password_hash, role, permissions) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email`,
      [name, email.toLowerCase(), passwordHash, role, permissions || {}]
    );

    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('HQ User Create Error:', error);
    return NextResponse.json({ error: 'Failed to provision user' }, { status: 500 });
  }
}
