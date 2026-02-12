import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }

        // 1. Verify token
        const tokenResult = await query(
            'SELECT user_id FROM password_reset_tokens WHERE token = $1 AND used = FALSE AND expires_at > NOW()',
            [token]
        );

        if (tokenResult.rows.length === 0) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        const userId = tokenResult.rows[0].user_id;

        // 2. Hash new password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Update password and mark token as used
        // We do this in a transaction if possible, but for simplicity here:
        await query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [passwordHash, userId]);
        await query('UPDATE password_reset_tokens SET used = TRUE WHERE token = $3', [token]);

        return NextResponse.json({ success: true, message: 'Password has been reset successfully.' });

    } catch (error) {
        console.error('Reset Password Error:', error);
        return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
    }
}
