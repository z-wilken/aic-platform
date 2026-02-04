'use client'

import { useEffect, useState } from 'react'
import AdminShell from './components/AdminShell'
import Link from 'next/link'

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </AdminShell>
    );
  }

  const stats = data?.stats || {
    pendingApplications: 0,
    activeCertifications: 0,
    totalLeads: 0,
    auditsTotal: 0
  };

  // Merge recent apps and leads for activity feed
  const recentActivity = [
    ...(data?.recentApplications || []).map((a: any) => ({
        id: `app-${a.id}`,
        type: 'APPLICATION',
        message: `New application from ${a.company}`,
        time: new Date(a.created_at).toLocaleDateString(),
        icon: '📝'
    })),
    ...(data?.recentLeads || []).map((l: any) => ({
        id: `lead-${l.id}`,
        type: 'LEAD',
        message: `New ${l.source} lead: ${l.email}`,
        time: new Date(l.created_at).toLocaleDateString(),
        icon: '🎯'
    }))
  ].sort((a, b) => 0.5 - Math.random()).slice(0, 5); // Simple shuffle for demo

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
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Alpha Apps</p>
            <p className="text-3xl font-bold text-blue-500">{stats.pendingApplications}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Active Orgs</p>
            <p className="text-3xl font-bold text-green-500">{stats.activeCertifications}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Total Leads</p>
            <p className="text-3xl font-bold text-yellow-500">{stats.totalLeads}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-2">Total Audits</p>
            <p className="text-3xl font-bold">{stats.auditsTotal}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="col-span-1">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
                <Link href="/applications" className="flex items-center justify-between bg-[#1c1c1c] p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <span className="font-medium">Review Applications</span>
                  </div>
                </Link>
                <Link href="/audits" className="flex items-center justify-between bg-[#1c1c1c] p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔍</span>
                    <span className="font-medium">System Audits</span>
                  </div>
                </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-span-2">
            <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
            <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 divide-y divide-gray-800">
              {recentActivity.map((activity: any) => (
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
                    activity.type === 'APPLICATION' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {activity.type}
                  </span>
                </div>
              ))}
              {recentActivity.length === 0 && (
                  <p className="p-8 text-center text-gray-500">No recent activity found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Alpha Application Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h2 className="text-lg font-bold mb-4">Alpha Program Queue</h2>
                <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
                    <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900/50 text-gray-500 uppercase text-xs">
                        <tr>
                        <th className="p-4">Applicant</th>
                        <th className="p-4">Company</th>
                        <th className="p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {(data?.recentApplications || []).map((app: any) => (
                            <tr key={app.id} className="hover:bg-gray-800/30">
                                <td className="p-4 font-medium">{app.first_name} {app.last_name}</td>
                                <td className="p-4">{app.company}</td>
                                <td className="p-4 text-gray-400">{new Date(app.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {(data?.recentApplications || []).length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-500">No applications.</td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-4">Active Certifications</h2>
                <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
                    <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900/50 text-gray-500 uppercase text-xs">
                        <tr>
                        <th className="p-4">Organization</th>
                        <th className="p-4">Tier</th>
                        <th className="p-4">Score</th>
                        <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {(data?.activeOrgs || []).map((org: any) => (
                            <tr key={org.id} className="hover:bg-gray-800/30">
                                <td className="p-4 font-medium">{org.name}</td>
                                <td className="p-4"><span className="text-xs font-mono text-aic-gold">{org.tier}</span></td>
                                <td className="p-4 font-mono">{org.integrity_score}%</td>
                                <td className="p-4">
                                    <Link href={`/audits/${org.id}`} className="text-blue-400 hover:underline">Manage Audit</Link>
                                </td>
                            </tr>
                        ))}
                        {(data?.activeOrgs || []).length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">No active certs.</td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </AdminShell>
  )
}