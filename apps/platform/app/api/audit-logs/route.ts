import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    
    const body = await request.json();
    const { systemName, data } = body;

    // 1. Forward to Python Engine for Rigorous Bias Audit
    const engineResponse = await fetch(`${ENGINE_URL}/analyze/bias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            organization_id: orgId,
            system_name: systemName,
            payload: data // Expected EEOC Four-Fifths format
        })
    });

    if (!engineResponse.ok) {
        const errorDetail = await engineResponse.text();
        throw new Error(`Engine analysis failed: ${errorDetail}`);
    }

    const analysisResult = await engineResponse.json();

    // 2. Save Audit Log to Database
    const logResult = await query(
        `INSERT INTO audit_logs (org_id, system_name, event_type, details, integrity_hash) 
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [
            orgId, 
            systemName, 
            'BIAS_AUDIT', 
            JSON.stringify(analysisResult),
            analysisResult.metadata?.hash || 'SHA256-PENDING'
        ]
    );

    return NextResponse.json({ 
        success: true, 
        auditId: logResult.rows[0].id,
        analysis: analysisResult 
    });

  } catch (error: any) {
    console.error('Audit Engine Integration Error:', error.message);
    return NextResponse.json({ 
        error: 'Technical validation failed', 
        detail: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
    try {
        const session: any = await getSession();
        const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

        const result = await query(
            'SELECT * FROM audit_logs WHERE org_id = $1 ORDER BY created_at DESC',
            [orgId]
        );

        return NextResponse.json({ logs: result.rows });
    } catch (error) {
        console.error('Audit Logs Retrieval Error:', error);
        return NextResponse.json({ error: 'Failed to retrieve logs' }, { status: 500 });
    }
}