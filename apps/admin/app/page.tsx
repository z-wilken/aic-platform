'use client'

import AdminShell from './components/AdminShell'
import Link from 'next/link'

export default function AdminDashboard() {
  // Mock data - in production would come from API
  const stats = {
    pendingApplications: 12,
    activeCertifications: 84,
    mrr: 'R 420k',
    engineHealth: 100,
    auditsThisMonth: 8,
    incidentsOpen: 3,
  }

  const recentActivity = [
    { id: 1, type: 'APPLICATION', message: 'New application from Capitec Bank', time: '10 min ago', icon: '📝' },
    { id: 2, type: 'AUDIT', message: 'Discovery Health audit completed', time: '1 hour ago', icon: '✅' },
    { id: 3, type: 'INCIDENT', message: 'Bias alert flagged at Standard Bank', time: '2 hours ago', icon: '🚨' },
    { id: 4, type: 'CERTIFICATION', message: 'Vodacom SA certification expiring in 10 days', time: '3 hours ago', icon: '⏰' },
    { id: 5, type: 'LEAD', message: 'New alpha program signup: Old Mutual', time: '5 hours ago', icon: '🎯' },
  ]

  const quickActions = [
    { label: 'Review Applications', href: '/applications', icon: '📋', count: stats.pendingApplications },
    { label: 'Active Audits', href: '/audits', icon: '🔍', count: stats.auditsThisMonth },
    { label: 'Open Incidents', href: '/incidents', icon: '🚨', count: stats.incidentsOpen },
    { label: 'Manage Certs', href: '/certifications', icon: '🏆', count: stats.activeCertifications },
  ]

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/20">
          <h1 className="text-3xl font-bold mb-2">Good morning, Admin</h1>
          <p className="text-gray-400">
            AIC Internal Operations Dashboard. {stats.pendingApplications} applications pending review.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Pending Apps</p>
            <p className="text-3xl font-bold text-blue-500">{stats.pendingApplications}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Active Certs</p>
            <p className="text-3xl font-bold text-green-500">{stats.activeCertifications}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">MRR</p>
            <p className="text-3xl font-bold text-yellow-500">{stats.mrr}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Audits (MTD)</p>
            <p className="text-3xl font-bold">{stats.auditsThisMonth}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Open Incidents</p>
            <p className="text-3xl font-bold text-red-500">{stats.incidentsOpen}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Engine Health</p>
            <p className="text-3xl font-bold text-green-500">{stats.engineHealth}%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="col-span-1">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-between bg-[#1c1c1c] p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{action.icon}</span>
                    <span className="font-medium">{action.label}</span>
                  </div>
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-sm font-mono">
                    {action.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-span-2">
            <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
            <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 divide-y divide-gray-800">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-800/30 transition-colors"
                >
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded ${
                    activity.type === 'INCIDENT' ? 'bg-red-500/20 text-red-400' :
                    activity.type === 'APPLICATION' ? 'bg-blue-500/20 text-blue-400' :
                    activity.type === 'AUDIT' ? 'bg-green-500/20 text-green-400' :
                    activity.type === 'CERTIFICATION' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {activity.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certification Queue Preview */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Certification Queue</h2>
            <Link href="/applications" className="text-blue-400 text-sm hover:text-blue-300">
              View All →
            </Link>
          </div>
          <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900/50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="p-4">Organization</th>
                  <th className="p-4">Tier</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/30">
                  <td className="p-4 font-medium">Capitec Bank</td>
                  <td className="p-4"><span className="text-red-400 font-mono">TIER 1</span></td>
                  <td className="p-4"><span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">NEW</span></td>
                  <td className="p-4 text-gray-400">Today, 10:30 AM</td>
                  <td className="p-4">
                    <button className="text-blue-400 hover:underline">Review</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="p-4 font-medium">Discovery Health</td>
                  <td className="p-4"><span className="text-red-400 font-mono">TIER 1</span></td>
                  <td className="p-4"><span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">REVIEWING</span></td>
                  <td className="p-4 text-gray-400">Jan 28, 2026</td>
                  <td className="p-4">
                    <button className="text-blue-400 hover:underline">Continue</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="p-4 font-medium">Takealot Group</td>
                  <td className="p-4"><span className="text-orange-400 font-mono">TIER 2</span></td>
                  <td className="p-4"><span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">AWAITING DOCS</span></td>
                  <td className="p-4 text-gray-400">Jan 25, 2026</td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:underline">Follow Up</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
