import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  const session: any = await getSession();

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { org_id, email, name } = await request.json();

    if (!org_id || !email) {
      return NextResponse.json({ error: 'Org ID and Email are required' }, { status: 400 });
    }

    const inviteCode = uuidv4().substring(0, 8).toUpperCase();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    // Save invite to database (We might need an invites table, let's create it or use metadata)
    // For now, let's assume an 'invites' table exists or we'll add it to schema
    await query(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at) 
       VALUES ((SELECT id FROM users WHERE email = $1 LIMIT 1), $2, $3)`,
      [email, inviteCode, expiresAt]
    );

    // In a real app, send an email here. For alpha, return the link.
    const inviteLink = `${process.env.NEXT_PUBLIC_PLATFORM_URL}/onboard?code=${inviteCode}&org=${org_id}`;

    return NextResponse.json({ 
        success: true, 
        inviteCode,
        inviteLink
    });

  } catch (error) {
    console.error('Invite API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
