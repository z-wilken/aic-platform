import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session: any = await getSession();
        if (!session || !session.user?.orgId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const orgId = session.user.orgId;

        const result = await query(
            `SELECT o.id, o.name, o.tier, o.integrity_score, o.is_alpha, o.created_at,
                    u.email as contact_email, u.name as contact_name
             FROM organizations o
             LEFT JOIN users u ON u.org_id = o.id AND u.role = 'ADMIN'
             WHERE o.id = $1
             LIMIT 1`,
            [orgId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }

        const org = result.rows[0];
        return NextResponse.json({
            id: org.id,
            name: org.name,
            tier: org.tier,
            integrityScore: org.integrity_score,
            isAlpha: org.is_alpha,
            contactEmail: org.contact_email || '',
            contactName: org.contact_name || '',
            createdAt: org.created_at
        });
    } catch (error) {
        console.error('Settings GET Error:', error);
        return NextResponse.json({ error: 'Failed to retrieve settings' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session: any = await getSession();
        if (!session || !session.user?.orgId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const orgId = session.user.orgId;
        const userRole = session.user.role;

        if (userRole && userRole !== 'ADMIN' && userRole !== 'COMPLIANCE_OFFICER') {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
        }

        const body = await request.json();
        const { name } = body;

        if (name !== undefined) {
            if (typeof name !== 'string' || name.trim().length === 0 || name.length > 255) {
                return NextResponse.json({ error: 'Invalid organization name' }, { status: 400 });
            }

            await query(
                'UPDATE organizations SET name = $1 WHERE id = $2',
                [name.trim(), orgId]
            );
        }

        // Return updated settings
        const result = await query(
            `SELECT o.id, o.name, o.tier, o.integrity_score, o.is_alpha, o.created_at,
                    u.email as contact_email, u.name as contact_name
             FROM organizations o
             LEFT JOIN users u ON u.org_id = o.id AND u.role = 'ADMIN'
             WHERE o.id = $1
             LIMIT 1`,
            [orgId]
        );

        const org = result.rows[0];
        return NextResponse.json({
            id: org.id,
            name: org.name,
            tier: org.tier,
            integrityScore: org.integrity_score,
            isAlpha: org.is_alpha,
            contactEmail: org.contact_email || '',
            contactName: org.contact_name || '',
            createdAt: org.created_at
        });
    } catch (error) {
        console.error('Settings PATCH Error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
