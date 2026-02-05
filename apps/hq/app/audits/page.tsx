'use client'

import { useEffect, useState } from 'react'
import HQShell from '../components/HQShell'
import Link from 'next/link'

export default function AuditsPage() {
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
    <HQShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Audit Factory Pipeline</h1>
        <p className="text-gray-500 font-serif italic mb-8">Technical verification and oversight monitoring for all certified organizations.</p>

        <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900/50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="p-4">Organization</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Compliance Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Scanning factory pipeline...</td>
                </tr>
              ) : organizations.map((org) => (
                <tr key={org.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4 font-medium text-white">{org.name}</td>
                  <td className="p-4"><span className="text-xs font-mono text-aic-gold">{org.tier}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${org.integrity_score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono">{org.integrity_score}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      href={`/audits/${org.id}`}
                      className="text-blue-400 hover:text-blue-300 font-bold text-xs font-mono uppercase tracking-widest"
                    >
                      Enter Pipeline
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HQShell>
  )
}