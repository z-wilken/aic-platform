'use client'

import { useEffect, useState } from 'react'
import AdminShell from '../components/AdminShell'
import Link from 'next/link'

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([])
  const [auditors, setAuditors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    Promise.all([
        fetch('/api/organizations').then(res => res.json()),
        fetch('/api/auditors').then(res => res.json())
    ]).then(([orgData, audData]) => {
        setOrganizations(orgData.organizations || []);
        setAuditors(audData.auditors || []);
        setLoading(false);
    }).catch(err => {
        console.error(err);
        setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleAssignAuditor = async (orgId: string, auditorId: string) => {
    try {
        const response = await fetch('/api/organizations', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ org_id: orgId, auditor_id: auditorId })
        });

        if (response.ok) {
            fetchData(); // Refresh list
        } else {
            const err = await response.json();
            alert(err.error || "Assignment failed");
        }
    } catch (err) {
        console.error(err);
        alert("Server error during assignment");
    }
  };

  const handleAddOrganization = async () => {
    const name = prompt("Enter Organization Name:");
    if (!name) return;
    const tier = prompt("Enter Tier (TIER_1, TIER_2, TIER_3):", "TIER_3");
    if (!tier) return;

    try {
        const response = await fetch('/api/organizations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, tier })
        });

        if (response.ok) {
            alert("Organization added successfully.");
            fetchData();
        }
    } catch (err) {
        console.error(err);
        alert("Failed to add organization.");
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Managed Organizations</h1>
          <button 
            onClick={handleAddOrganization}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors"
          >
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
                <th className="p-4">Lead Auditor</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 font-mono">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 font-serif italic">Scanning organization database...</td>
                </tr>
              ) : organizations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 font-serif italic">No organizations found.</td>
                </tr>
              ) : (
                organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="p-4">
                        <p className="font-bold text-white">{org.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">ID: {org.id.substring(0,8)}</p>
                    </td>
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
                        <span className={`font-bold ${org.integrity_score > 90 ? 'text-green-500' : 'text-aic-gold'}`}>
                            {org.integrity_score}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                        <select 
                            value={org.auditor_id || 'none'}
                            onChange={(e) => handleAssignAuditor(org.id, e.target.value)}
                            className="bg-gray-800 border border-gray-700 text-gray-300 text-[10px] rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                        >
                            <option value="none">Unassigned</option>
                            {auditors.map(aud => (
                                <option key={aud.id} value={aud.id}>{aud.name}</option>
                            ))}
                        </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/audits/${org.id}`}
                          className="bg-blue-600/10 text-blue-400 border border-blue-600/20 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
                        >
                          MANAGE AUDIT
                        </Link>
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