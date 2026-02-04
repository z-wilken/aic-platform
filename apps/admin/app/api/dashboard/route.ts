import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const leadsCount = await query('SELECT COUNT(*) FROM leads');
    const appsCount = await query('SELECT COUNT(*) FROM alpha_applications');
    const orgsCount = await query('SELECT COUNT(*) FROM organizations');
    const logsCount = await query('SELECT COUNT(*) FROM audit_logs');

    const recentApps = await query('SELECT * FROM alpha_applications ORDER BY created_at DESC LIMIT 5');
    const recentLeads = await query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 5');
    const activeOrgs = await query('SELECT * FROM organizations ORDER BY created_at DESC LIMIT 5');

    return NextResponse.json({
        stats: {
            pendingApplications: parseInt(appsCount.rows[0].count),
            activeCertifications: parseInt(orgsCount.rows[0].count),
            totalLeads: parseInt(leadsCount.rows[0].count),
            auditsTotal: parseInt(logsCount.rows[0].count),
        },
        recentApplications: recentApps.rows,
        recentLeads: recentLeads.rows,
        activeOrgs: activeOrgs.rows
    });
  } catch (error) {
    console.error('Admin Dashboard API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
