import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const session: any = await getSession();
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Only administrators can invite users' }, { status: 403 });
        }

        const orgId = session.user.orgId;
        const { email, name, role } = await request.json();

        if (!email || !name || !role) {
            return NextResponse.json({ error: 'Email, name, and role are required' }, { status: 400 });
        }

        // 1. Check if user already exists
        const existingUser = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
        if (existingUser.rows.length > 0) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // 2. Create user with dummy password and is_active = FALSE
        // They will "activate" by resetting their password
        const dummyPassword = crypto.randomBytes(16).toString('hex');
        const userResult = await query(
            `INSERT INTO users (email, password_hash, name, role, org_id, is_active)
             VALUES ($1, $2, $3, $4, $5, FALSE)
             RETURNING id`,
            [email.toLowerCase(), dummyPassword, name, role, orgId]
        );

        const userId = userResult.rows[0].id;

        // 3. Generate token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 604800000); // 7 days

        await query(
            'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
            [userId, token, expiresAt]
        );

        // 4. Return link (in production, send email)
        const inviteLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
        console.log(`[AUTH] User invited: ${email}. Link: ${inviteLink}`);

        return NextResponse.json({ 
            success: true, 
            inviteLink,
            message: 'User invited successfully.' 
        });

    } catch (error) {
        console.error('Invite User Error:', error);
        return NextResponse.json({ error: 'Failed to invite user' }, { status: 500 });
    }
}
