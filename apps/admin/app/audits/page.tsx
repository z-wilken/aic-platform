'use client'

import { useState, useEffect } from 'react'
import AdminShell from '../components/AdminShell'
import { motion } from 'framer-motion'

interface AuditOrg {
  id: string
  name: string
  tier: string
  integrity_score: number
  total_audits: string
  recent_audits: string
  last_audit_at: string | null
  open_findings: string
}

interface AuditLog {
  id: string
  event_type: string
  system_name: string
  status: string
  created_at: string
  integrity_hash: string | null
  org_name: string
  org_tier: string
}

export default function AuditsPage() {
  const [view, setView] = useState<'overview' | 'logs'>('overview')
  const [organizations, setOrganizations] = useState<AuditOrg[]>([])
  const [recentLogs, setRecentLogs] = useState<AuditLog[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/audits')
      .then(res => res.json())
      .then(data => {
        setOrganizations(data.organizations || [])
        setRecentLogs(data.recentLogs || [])
        setStats(data.stats || {})
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const tierColors: Record<string, string> = {
    TIER_1: 'bg-red-500/20 text-red-400',
    TIER_2: 'bg-orange-500/20 text-orange-400',
    TIER_3: 'bg-green-500/20 text-green-400',
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aic-gold"></div>
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">This Week</p>
            <p className="text-3xl font-bold text-blue-500">{stats?.audits_this_week || 0}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">This Month</p>
            <p className="text-3xl font-bold text-aic-gold">{stats?.audits_this_month || 0}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Orgs Audited</p>
            <p className="text-3xl font-bold text-green-500">{stats?.orgs_audited || 0}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Total Audits</p>
            <p className="text-3xl font-bold">{stats?.total_audits || 0}</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setView('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              Organization Overview
            </button>
            <button
              onClick={() => setView('logs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === 'logs' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              Audit Log Stream
            </button>
          </div>
        </div>

        {view === 'overview' ? (
          <div className="space-y-6">
            {/* Active Organizations */}
            <div>
              <h3 className="text-lg font-bold mb-4">Organization Audit Status</h3>
              <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-900/50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="text-left p-4">Organization</th>
                      <th className="text-left p-4">Tier</th>
                      <th className="text-left p-4">Score</th>
                      <th className="text-left p-4">Total Audits</th>
                      <th className="text-left p-4">Last 30 Days</th>
                      <th className="text-left p-4">Open Findings</th>
                      <th className="text-left p-4">Last Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {organizations.map((org) => (
                      <motion.tr
                        key={org.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-800/30"
                      >
                        <td className="p-4 font-medium">{org.name}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${tierColors[org.tier] || 'bg-gray-500/20 text-gray-400'}`}>
                            {org.tier}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`font-mono font-bold ${org.integrity_score >= 80 ? 'text-green-500' : org.integrity_score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {org.integrity_score}%
                          </span>
                        </td>
                        <td className="p-4 font-mono text-sm">{org.total_audits}</td>
                        <td className="p-4 font-mono text-sm text-blue-400">{org.recent_audits}</td>
                        <td className="p-4">
                          <span className={parseInt(org.open_findings) > 0 ? 'text-red-400 font-bold' : 'text-green-500'}>
                            {org.open_findings}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-400">
                          {org.last_audit_at ? new Date(org.last_audit_at).toLocaleDateString() : 'Never'}
                        </td>
                      </motion.tr>
                    ))}
                    {organizations.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500 italic">No organizations found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Audit Log Stream */
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Audit Stream
            </h3>
            <div className="space-y-3">
              {recentLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#1c1c1c] rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{log.event_type.replace(/_/g, ' ')}</span>
                        <span className="text-xs text-gray-500 font-mono">{log.org_name} / {log.system_name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${tierColors[log.org_tier] || 'bg-gray-500/20 text-gray-400'}`}>
                        {log.org_tier}
                      </span>
                      {log.integrity_hash && (
                        <span className="text-[9px] font-mono text-gray-600">
                          SHA-{log.integrity_hash.substring(0, 8)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {recentLogs.length === 0 && (
                <div className="p-12 text-center text-gray-500 italic border border-dashed border-gray-800 rounded-xl">
                  No audit logs recorded yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
