import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
        }

        // 1. Find valid token (we reuse the same table for email verification tokens for now)
        // In a more complex app, we might have a specific verification_tokens table
        const tokenResult = await query(
            'SELECT user_id FROM password_reset_tokens WHERE token = $1 AND used = FALSE AND expires_at > NOW()',
            [token]
        );

        if (tokenResult.rows.length === 0) {
            return NextResponse.json({ error: 'Invalid or expired verification link' }, { status: 400 });
        }

        const userId = tokenResult.rows[0].user_id;

        // 2. Mark email as verified and token as used
        await query('UPDATE users SET email_verified = TRUE WHERE id = $1', [userId]);
        await query('UPDATE password_reset_tokens SET used = TRUE WHERE token = $2', [token]);

        return NextResponse.json({ success: true, message: 'Institutional email verified successfully.' });

    } catch (error) {
        console.error('Email Verification Error:', error);
        return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 });
    }
}
