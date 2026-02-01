'use client'

import { useState } from 'react'
import AdminShell from '../components/AdminShell'

interface Audit {
  id: string
  organization: string
  tier: 'TIER_1' | 'TIER_2' | 'TIER_3'
  type: 'INITIAL' | 'QUARTERLY' | 'ANNUAL' | 'INCIDENT'
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  auditor: string
  scheduled_date: string
  completed_date?: string
  findings?: number
}

export default function AuditsPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list')

  const audits: Audit[] = [
    {
      id: 'AUD-2026-001',
      organization: 'FirstRand Bank',
      tier: 'TIER_1',
      type: 'QUARTERLY',
      status: 'SCHEDULED',
      auditor: 'Dr. Amanda Sithole',
      scheduled_date: '2026-02-15'
    },
    {
      id: 'AUD-2026-002',
      organization: 'Discovery Health',
      tier: 'TIER_1',
      type: 'INCIDENT',
      status: 'IN_PROGRESS',
      auditor: 'Peter Mokwena',
      scheduled_date: '2026-02-01',
      findings: 3
    },
    {
      id: 'AUD-2026-003',
      organization: 'Vodacom SA',
      tier: 'TIER_2',
      type: 'ANNUAL',
      status: 'SCHEDULED',
      auditor: 'Linda Nkosi',
      scheduled_date: '2026-02-20'
    },
    {
      id: 'AUD-2025-089',
      organization: 'Standard Bank',
      tier: 'TIER_1',
      type: 'QUARTERLY',
      status: 'COMPLETED',
      auditor: 'Dr. Amanda Sithole',
      scheduled_date: '2026-01-10',
      completed_date: '2026-01-12',
      findings: 0
    },
    {
      id: 'AUD-2025-088',
      organization: 'Old Mutual',
      tier: 'TIER_1',
      type: 'QUARTERLY',
      status: 'COMPLETED',
      auditor: 'Peter Mokwena',
      scheduled_date: '2025-12-15',
      completed_date: '2025-12-18',
      findings: 2
    },
  ]

  const upcoming = audits.filter(a => a.status === 'SCHEDULED')
  const inProgress = audits.filter(a => a.status === 'IN_PROGRESS')
  const completed = audits.filter(a => a.status === 'COMPLETED')

  const typeColors = {
    INITIAL: 'bg-blue-500/20 text-blue-400',
    QUARTERLY: 'bg-purple-500/20 text-purple-400',
    ANNUAL: 'bg-green-500/20 text-green-400',
    INCIDENT: 'bg-red-500/20 text-red-400',
  }

  const statusColors = {
    SCHEDULED: 'bg-yellow-500/20 text-yellow-400',
    IN_PROGRESS: 'bg-blue-500/20 text-blue-400',
    COMPLETED: 'bg-green-500/20 text-green-400',
    CANCELLED: 'bg-gray-500/20 text-gray-400',
  }

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Scheduled</p>
            <p className="text-3xl font-bold text-yellow-500">{upcoming.length}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">In Progress</p>
            <p className="text-3xl font-bold text-blue-500">{inProgress.length}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Completed (YTD)</p>
            <p className="text-3xl font-bold text-green-500">{completed.length}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Findings (YTD)</p>
            <p className="text-3xl font-bold">
              {completed.reduce((sum, a) => sum + (a.findings || 0), 0)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              Calendar View
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500">
            + Schedule New Audit
          </button>
        </div>

        {/* Audit Sections */}
        <div className="space-y-6">
          {/* In Progress */}
          {inProgress.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                In Progress
              </h3>
              <div className="grid gap-4">
                {inProgress.map((audit) => (
                  <div
                    key={audit.id}
                    className="bg-[#1c1c1c] rounded-xl border border-blue-800/50 p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-sm text-gray-500">{audit.id}</p>
                        <h4 className="text-xl font-bold mt-1">{audit.organization}</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Auditor: {audit.auditor}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[audit.type]}`}>
                          {audit.type}
                        </span>
                        {audit.findings !== undefined && (
                          <span className="text-sm">
                            <span className="text-red-400 font-bold">{audit.findings}</span> findings
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-500">
                        Complete Audit
                      </button>
                      <button className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600">
                        Add Finding
                      </button>
                      <button className="text-gray-400 px-4 py-2 text-sm hover:text-gray-300">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          <div>
            <h3 className="text-lg font-bold mb-4">Upcoming Audits</h3>
            <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900/50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="text-left p-4">Audit ID</th>
                    <th className="text-left p-4">Organization</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Tier</th>
                    <th className="text-left p-4">Auditor</th>
                    <th className="text-left p-4">Scheduled Date</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {upcoming.map((audit) => (
                    <tr key={audit.id} className="hover:bg-gray-800/30">
                      <td className="p-4 font-mono text-sm">{audit.id}</td>
                      <td className="p-4 font-medium">{audit.organization}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[audit.type]}`}>
                          {audit.type}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-sm">{audit.tier}</td>
                      <td className="p-4 text-sm">{audit.auditor}</td>
                      <td className="p-4 text-sm">{audit.scheduled_date}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="text-blue-400 hover:text-blue-300 text-sm">Start</button>
                          <button className="text-gray-400 hover:text-gray-300 text-sm">Reschedule</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Completed */}
          <div>
            <h3 className="text-lg font-bold mb-4">Recently Completed</h3>
            <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900/50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="text-left p-4">Audit ID</th>
                    <th className="text-left p-4">Organization</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Completed</th>
                    <th className="text-left p-4">Findings</th>
                    <th className="text-left p-4">Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {completed.map((audit) => (
                    <tr key={audit.id} className="hover:bg-gray-800/30">
                      <td className="p-4 font-mono text-sm">{audit.id}</td>
                      <td className="p-4 font-medium">{audit.organization}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[audit.type]}`}>
                          {audit.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm">{audit.completed_date}</td>
                      <td className="p-4">
                        <span className={audit.findings === 0 ? 'text-green-500' : 'text-yellow-500'}>
                          {audit.findings} {audit.findings === 1 ? 'finding' : 'findings'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
