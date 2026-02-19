import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, users, passwordResetTokens, eq } from '@aic/db';
import { auth } from '@aic/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { org_id, email } = await request.json();

    if (!org_id || !email) {
      return NextResponse.json({ error: 'Org ID and Email are required' }, { status: 400 });
    }

    const inviteCode = uuidv4().substring(0, 8).toUpperCase();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    const db = getSystemDb();

    return await db.transaction(async (tx) => {
      const [user] = await tx.select({ id: users.id }).from(users).where(eq(users.email, email.toLowerCase())).limit(1);
      
      if (!user) {
        return NextResponse.json({ error: 'User not found in registry. Provision user first.' }, { status: 404 });
      }

      await tx.insert(passwordResetTokens).values({
        userId: user.id,
        token: inviteCode,
        expiresAt: expiresAt
      });

      const inviteLink = `${process.env.NEXT_PUBLIC_PLATFORM_URL}/onboard?code=${inviteCode}&org=${org_id}`;

      return NextResponse.json({ 
          success: true, 
          inviteCode,
          inviteLink
      });
    });

  } catch (error) {
    console.error('Invite API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
