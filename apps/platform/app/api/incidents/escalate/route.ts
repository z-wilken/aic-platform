import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || session.user?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Identify incidents older than 72 hours that are still 'OPEN'
    const staleIncidents = await query(`
      SELECT i.*, o.name as org_name 
      FROM incidents i
      JOIN organizations o ON i.org_id = o.id
      WHERE i.status = 'OPEN' 
      AND i.created_at < NOW() - INTERVAL '72 hours'
    `);

    const results = [];

    for (const incident of staleIncidents.rows) {
        // 2. Create a High-Priority Audit Requirement for remediation
        await query(`
            INSERT INTO audit_requirements (org_id, title, description, category, status)
            VALUES ($1, $2, $3, 'OVERSIGHT', 'PENDING')
        `, [
            incident.org_id,
            `URGENT: Incident Remediation (${incident.citizen_email})`,
            `Automated escalation: Incident response exceeded 72-hour regulatory threshold. Immediate human review required.`
        ]);

        // 3. Send Alert Notification
        await query(`
            INSERT INTO notifications (org_id, title, message, type)
            VALUES ($1, 'REGULATORY ESCALATION', $2, 'ALERT')
        `, [
            incident.org_id,
            `Incident response for ${incident.citizen_email} has been escalated to Audit Oversight. Integrity Score impact pending.`
        ]);

        results.push(incident.id);
    }

    return NextResponse.json({ 
        success: true, 
        escalated_count: staleIncidents.rows.length,
        incident_ids: results 
    });

  } catch (error) {
    console.error('Escalation Job Error:', error);
    return NextResponse.json({ error: 'Failed to process escalations' }, { status: 500 });
  }
}
