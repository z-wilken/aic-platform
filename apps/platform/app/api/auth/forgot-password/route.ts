import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ErrorFactory } from '@/lib/errors';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => null);
        
        if (!body || !body.email) {
            return ErrorFactory.badRequest('Email is required');
        }

        const email = body.email;
        const userResult = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);

        if (userResult.rows.length === 0) {
            // For security, don't reveal if user exists
            return NextResponse.json({ success: true, message: 'If an account exists, a reset link has been sent.' });
        }

        const userId = userResult.rows[0].id;
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // 1 hour

        // Deactivate old tokens for this user
        await query('UPDATE password_reset_tokens SET used = TRUE WHERE user_id = $1', [userId]);

        // Insert new token
        await query(
            'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
            [userId, token, expiresAt]
        );

        // In production, send real email. For now, log to console.
        const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
        console.log(`[AUTH] Password reset requested for ${email}. Link: ${resetLink}`);

        return NextResponse.json({ 
            success: true, 
            message: 'If an account exists, a reset link has been sent.' 
        });

    } catch (error) {
        console.error('Forgot Password Error:', error);
        return ErrorFactory.internal('Failed to process recovery request');
    }
}
