'use client'

import { useState } from 'react'
import AdminShell from '../components/AdminShell'

type ApplicationStatus = 'NEW' | 'REVIEWING' | 'AWAITING_DOCS' | 'SCHEDULED' | 'APPROVED' | 'REJECTED'

interface Application {
  id: string
  organization: string
  contact: string
  email: string
  tier_estimate: string
  use_case: string
  status: ApplicationStatus
  submitted_at: string
  ai_systems_count: number
}

const statusColors: Record<ApplicationStatus, string> = {
  NEW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  REVIEWING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  AWAITING_DOCS: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  SCHEDULED: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  APPROVED: 'bg-green-500/20 text-green-400 border-green-500/30',
  REJECTED: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function ApplicationsPage() {
  const [filter, setFilter] = useState<ApplicationStatus | 'ALL'>('ALL')

  const applications: Application[] = [
    {
      id: 'APP-001',
      organization: 'Capitec Bank',
      contact: 'John Dlamini',
      email: 'j.dlamini@capitec.co.za',
      tier_estimate: 'TIER_1',
      use_case: 'Credit scoring and loan decisioning AI',
      status: 'NEW',
      submitted_at: '2026-02-01T10:30:00Z',
      ai_systems_count: 3
    },
    {
      id: 'APP-002',
      organization: 'Discovery Health',
      contact: 'Sarah Cele',
      email: 's.cele@discovery.co.za',
      tier_estimate: 'TIER_1',
      use_case: 'Claims processing and fraud detection',
      status: 'REVIEWING',
      submitted_at: '2026-01-28T14:22:00Z',
      ai_systems_count: 5
    },
    {
      id: 'APP-003',
      organization: 'Takealot Group',
      contact: 'Mike van der Berg',
      email: 'm.vandenberg@takealot.com',
      tier_estimate: 'TIER_2',
      use_case: 'Recommendation engine and pricing optimization',
      status: 'AWAITING_DOCS',
      submitted_at: '2026-01-25T09:15:00Z',
      ai_systems_count: 2
    },
    {
      id: 'APP-004',
      organization: 'Standard Bank',
      contact: 'Thabo Mokoena',
      email: 't.mokoena@standardbank.co.za',
      tier_estimate: 'TIER_1',
      use_case: 'Fraud detection and customer risk scoring',
      status: 'SCHEDULED',
      submitted_at: '2026-01-20T11:00:00Z',
      ai_systems_count: 8
    },
    {
      id: 'APP-005',
      organization: 'Vodacom SA',
      contact: 'Lisa Naidoo',
      email: 'l.naidoo@vodacom.co.za',
      tier_estimate: 'TIER_2',
      use_case: 'Customer churn prediction',
      status: 'APPROVED',
      submitted_at: '2026-01-15T08:45:00Z',
      ai_systems_count: 1
    },
  ]

  const filteredApps = filter === 'ALL'
    ? applications
    : applications.filter(app => app.status === filter)

  const stats = {
    total: applications.length,
    new: applications.filter(a => a.status === 'NEW').length,
    reviewing: applications.filter(a => a.status === 'REVIEWING').length,
    approved: applications.filter(a => a.status === 'APPROVED').length,
  }

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Total Applications</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">New (Pending Review)</p>
            <p className="text-3xl font-bold text-blue-500">{stats.new}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Under Review</p>
            <p className="text-3xl font-bold text-yellow-500">{stats.reviewing}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Approved (This Month)</p>
            <p className="text-3xl font-bold text-green-500">{stats.approved}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['ALL', 'NEW', 'REVIEWING', 'AWAITING_DOCS', 'SCHEDULED', 'APPROVED', 'REJECTED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900/50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="text-left p-4">Application ID</th>
                <th className="text-left p-4">Organization</th>
                <th className="text-left p-4">Contact</th>
                <th className="text-left p-4">Tier Estimate</th>
                <th className="text-left p-4">AI Systems</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Submitted</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4 font-mono text-sm">{app.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{app.organization}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{app.use_case}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm">{app.contact}</p>
                      <p className="text-xs text-gray-500">{app.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      app.tier_estimate === 'TIER_1' ? 'text-red-400' :
                      app.tier_estimate === 'TIER_2' ? 'text-orange-400' : 'text-green-400'
                    }`}>
                      {app.tier_estimate}
                    </span>
                  </td>
                  <td className="p-4 text-center">{app.ai_systems_count}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[app.status]}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {new Date(app.submitted_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        Review
                      </button>
                      <button className="text-gray-400 hover:text-gray-300 text-sm">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
