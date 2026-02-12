import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { getSession } from '../../../../lib/auth';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';
const ENGINE_API_KEY = process.env.ENGINE_API_KEY || '';

function engineHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (ENGINE_API_KEY) headers['X-API-Key'] = ENGINE_API_KEY;
    return headers;
}

export async function POST(request: NextRequest) {
    try {
        const session: any = await getSession();
        const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

        const body = await request.json();
        const { systemName, data } = body;

        if (!data?.columns || !Array.isArray(data.columns) || data.columns.length === 0) {
            return NextResponse.json({ error: 'columns array is required' }, { status: 400 });
        }

        // Fetch last hash for chain continuity
        const lastLog = await query(
            'SELECT integrity_hash FROM audit_logs WHERE org_id = $1 ORDER BY created_at DESC LIMIT 1',
            [orgId]
        );
        const previousHash = lastLog.rows[0]?.integrity_hash || null;

        // Call engine privacy audit
        const engineResponse = await fetch(`${ENGINE_URL}/api/v1/audit/privacy`, {
            method: 'POST',
            headers: engineHeaders(),
            body: JSON.stringify({ columns: data.columns })
        });

        if (!engineResponse.ok) {
            const errorDetail = await engineResponse.text();
            throw new Error(`Privacy audit failed: ${errorDetail}`);
        }

        const result = await engineResponse.json();

        // Log to audit trail
        await query(
            `INSERT INTO audit_logs (org_id, system_name, event_type, details, integrity_hash, previous_hash)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [orgId, systemName || 'Privacy Audit', 'PRIVACY_AUDIT', JSON.stringify(result), result.audit_hash, previousHash]
        );

        return NextResponse.json({ success: true, analysis: result });
    } catch (error: any) {
        console.error('Privacy Audit Error:', error.message);
        return NextResponse.json({ error: 'Privacy audit failed', detail: error.message }, { status: 500 });
    }
}
