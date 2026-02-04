'use client'

import { useEffect, useState } from 'react'
import AdminShell from '../components/AdminShell'

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data.leads || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const highIntentLeads = leads.filter(l => (l.score || 0) > 70).length;

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold">Inbound Leads</h1>
            <p className="text-gray-500 font-serif mt-1 text-sm italic">Prospective organizations captured via Self-Assessment and Contact forms.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Total Leads</p>
                <p className="text-2xl font-bold">{leads.length}</p>
            </div>
            <div className="text-right border-l border-gray-800 pl-4">
                <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">High Intent (>70)</p>
                <p className="text-2xl font-bold text-blue-400">{highIntentLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900/50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="p-4">Email</th>
                <th className="p-4">Organization</th>
                <th className="p-4">Score</th>
                <th className="p-4">Source</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">Scanning leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">No inbound leads found.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="p-4 font-medium text-white">{lead.email}</td>
                    <td className="p-4 text-gray-400">{lead.company || '—'}</td>
                    <td className="p-4">
                      {lead.score ? (
                        <span className={`font-mono font-bold ${lead.score > 70 ? 'text-blue-400' : 'text-gray-500'}`}>
                            {lead.score}%
                        </span>
                      ) : '—'}
                    </td>
                    <td className="p-4">
                        <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px] font-mono uppercase text-gray-400">
                            {lead.source}
                        </span>
                    </td>
                    <td className="p-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            lead.status === 'ALPHA_APPLIED' ? 'text-aic-gold' : 
                            lead.status === 'RE-ENGAGED' ? 'text-purple-400' : 
                            'text-green-500'
                        }`}>
                            {lead.status?.replace('_', ' ')}
                        </span>
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-xs">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-blue-400 hover:text-blue-300 text-xs">
                          Email
                        </button>
                        <button className="text-gray-500 hover:text-white text-xs">
                          Detail
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
