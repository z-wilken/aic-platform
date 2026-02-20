import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, users, desc } from '@aic/db';
import { auth } from '@aic/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const db = getSystemDb();
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        isSuperAdmin: users.isSuperAdmin,
        permissions: users.permissions,
        lastLogin: users.lastLogin
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    return NextResponse.json({ users: result });
  } catch (error) {
    console.error('HQ Users API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, email, password, role, permissions } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const db = getSystemDb();
    const [newUser] = await db.insert(users).values({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      permissions: permissions || {},
      isActive: true,
      emailVerified: true
    }).returning({ id: users.id, email: users.email });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error('HQ User Create Error:', error);
    return NextResponse.json({ error: 'Failed to provision user' }, { status: 500 });
  }
}
