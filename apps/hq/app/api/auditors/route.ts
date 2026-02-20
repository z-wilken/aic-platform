import { NextResponse } from 'next/server';
import { getSystemDb, users, eq, or, and, asc } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const db = getSystemDb();
    // Fetch users with the role of 'AUDITOR' or 'ADMIN' (who can also audit)
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role
      })
      .from(users)
      .where(
        and(
          or(eq(users.role, 'AUDITOR'), eq(users.role, 'ADMIN')),
          eq(users.isActive, true)
        )
      )
      .orderBy(asc(users.name));

    return NextResponse.json({ auditors: result });
  } catch (error) {
    console.error('Admin Auditors API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
