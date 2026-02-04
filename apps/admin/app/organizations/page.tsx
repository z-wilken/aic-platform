'use client'

import { useEffect, useState } from 'react'
import AdminShell from '../components/AdminShell'
import Link from 'next/link'

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/organizations')
      .then(res => res.json())
      .then(data => {
        setOrganizations(data.organizations || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Managed Organizations</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">
            + Add Organization
          </button>
        </div>

        <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900/50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Integrity Score</th>
                <th className="p-4">Created At</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Loading organizations...</td>
                </tr>
              ) : organizations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No organizations found.</td>
                </tr>
              ) : (
                organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 font-medium">{org.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        org.tier === 'TIER_1' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        org.tier === 'TIER_2' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {org.tier}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden max-w-[100px]">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${org.integrity_score}%` }}
                          />
                        </div>
                        <span className="font-mono text-gray-400">{org.integrity_score}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(org.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/audits/${org.id}`}
                          className="text-blue-400 hover:text-blue-300 transition-colors text-xs"
                        >
                          View Audit
                        </Link>
                        <button className="text-gray-500 hover:text-white transition-colors text-xs">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
