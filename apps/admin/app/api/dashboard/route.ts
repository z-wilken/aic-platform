import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getSession } from '../../../lib/auth'

export async function GET() {
  const session: any = await getSession()

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Get overall stats
    const orgsCount = await query('SELECT count(*) FROM organizations')
    const appsCount = await query('SELECT count(*) FROM alpha_applications')
    const leadsCount = await query('SELECT count(*) FROM leads')
    const auditsCount = await query('SELECT count(*) FROM audit_logs')

    // 2. Get recent applications
    const recentApps = await query('SELECT * FROM alpha_applications ORDER BY created_at DESC LIMIT 5')

    // 3. Get recent leads
    const recentLeads = await query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 5')

    // 4. Get active organizations for the table
    const activeOrgs = await query('SELECT id, name, tier, integrity_score FROM organizations LIMIT 10')

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
