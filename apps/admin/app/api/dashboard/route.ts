import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getSession } from '../../../lib/auth'

export async function GET() {
  const session: any = await getSession()

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const isOnlyAuditor = session.user.role === 'AUDITOR';
  const auditorId = session.user.id;

  try {
    // 1. Get overall stats (Admins see global, Auditors see assigned only)
    const orgsCount = await query(
        `SELECT count(*) FROM organizations ${isOnlyAuditor ? 'WHERE auditor_id = $1' : ''}`, 
        isOnlyAuditor ? [auditorId] : []
    )
    const appsCount = await query('SELECT count(*) FROM alpha_applications') // Apps are always global for now
    const leadsCount = await query('SELECT count(*) FROM leads')
    const auditsCount = await query(
        `SELECT count(*) FROM audit_logs al 
         ${isOnlyAuditor ? 'JOIN organizations o ON al.org_id = o.id WHERE o.auditor_id = $1' : ''}`,
        isOnlyAuditor ? [auditorId] : []
    )

    // 2. Get recent applications (Global)
    const recentApps = await query('SELECT * FROM alpha_applications ORDER BY created_at DESC LIMIT 5')

    // 3. Get recent leads (Global)
    const recentLeads = await query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 5')

    // 4. Get active organizations (Filtered for Auditors)
    const activeOrgs = await query(
        `SELECT id, name, tier, integrity_score FROM organizations 
         ${isOnlyAuditor ? 'WHERE auditor_id = $1' : ''} 
         ORDER BY created_at DESC LIMIT 10`,
        isOnlyAuditor ? [auditorId] : []
    )

    return NextResponse.json({
      stats: {
        pendingApplications: parseInt(appsCount.rows[0].count),
        activeCertifications: parseInt(orgsCount.rows[0].count),
        totalLeads: parseInt(leadsCount.rows[0].count),
        auditsTotal: parseInt(auditsCount.rows[0].count)
      },
      recentApplications: recentApps.rows,
      recentLeads: recentLeads.rows,
      activeOrgs: activeOrgs.rows
    })
  } catch (error) {
    console.error('Admin Dashboard API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
