import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, users, organizations, eq, desc } from '@aic/db';
import { auth } from '@aic/auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const UserCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.enum(['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR', 'VIEWER']),
  orgId: z.string().uuid().optional().nullable()
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.isSuperAdmin) {
    console.warn(`[SECURITY] Unauthorized access attempt to global users by ${session?.user?.email}`);
    return NextResponse.json({ error: 'Unauthorized: SuperAdmin privileges required' }, { status: 403 });
  }

  try {
    const db = getSystemDb();
    const result = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        orgName: organizations.name
      })
      .from(users)
      .leftJoin(organizations, eq(users.orgId, organizations.id))
      .orderBy(desc(users.createdAt));

    return NextResponse.json({ users: result });
  } catch (error) {
    console.error('Admin Users GET Error:', error);
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
    const validation = UserCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.format() }, { status: 400 });
    }

    const { email, password, name, role, orgId } = validation.data;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const db = getSystemDb();
    const [newUser] = await db.insert(users).values({
      email: email.toLowerCase(),
      passwordHash,
      name,
      role,
      orgId: orgId || null,
      isActive: true,
      emailVerified: true
    }).returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Admin Users POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
