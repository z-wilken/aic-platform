import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function GET() {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    const result = await query(
      'SELECT * FROM compliance_reports WHERE org_id = $1 ORDER BY created_at DESC',
      [orgId]
    );

    return NextResponse.json({
        reports: result.rows
    });
  } catch (error) {
    console.error('Reports API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
    try {
        const session: any = await getSession();
        if (!session || !session.user?.orgId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const orgId = session.user.orgId;

        // 1. Fetch current score and findings
        const orgResult = await query('SELECT integrity_score FROM organizations WHERE id = $1', [orgId]);
        const incidentResult = await query("SELECT count(*) FROM incidents WHERE org_id = $1 AND status = 'OPEN'", [orgId]);
        
        const score = orgResult.rows[0].integrity_score;
        const findings = parseInt(incidentResult.rows[0].count);
        const monthYear = new Date().toLocaleString('default', { month: 'short', year: 'numeric' });

        // 2. Insert new report snapshot
        const result = await query(
            `INSERT INTO compliance_reports (org_id, month_year, integrity_score, audit_status, findings_count) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [orgId, monthYear, score, score >= 80 ? 'COMPLIANT' : 'REMEDIATION_REQUIRED', findings]
        );

        return NextResponse.json({ success: true, report: result.rows[0] });

    } catch (error) {
        console.error('Report Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}