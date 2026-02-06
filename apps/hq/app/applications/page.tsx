'use client'

import { useEffect, useState } from 'react'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        setApplications(data.applications || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Alpha Program Applications</h1>
        <p className="text-gray-500 font-serif italic mb-8">Review incoming requests for the AIC Alpha Cohort 1.</p>

        <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900/50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="p-4">Applicant</th>
                <th className="p-4">Company</th>
                <th className="p-4">Use Case</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Retrieving applications...</td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-16 text-center text-gray-500 italic">No pending applications found.</td>
                </tr>
              ) : applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-4 font-medium text-white">{app.first_name} {app.last_name}</td>
                  <td className="p-4 text-gray-400">{app.company}</td>
                  <td className="p-4 text-gray-400 max-w-xs truncate">{app.use_case}</td>
                  <td className="p-4 text-gray-500 font-mono text-xs">{new Date(app.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-[10px] font-bold uppercase">Process</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}
