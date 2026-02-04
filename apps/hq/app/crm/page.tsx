'use client'

import { useEffect, useState } from 'react'
import HQShell from '../components/HQShell'
import { motion } from 'framer-motion'

export default function CRMPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data.leads || [])
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: 'Qualified Leads', value: leads.filter(l => (l.score || 0) > 70).length, color: 'text-blue-400' },
    { label: 'Outreach Active', value: leads.filter(l => l.status === 'PROSPECT').length, color: 'text-aic-gold' },
    { label: 'Alpha Conversions', value: leads.filter(l => l.status === 'ALPHA_ENROLLED').length, color: 'text-green-400' }
  ];

  return (
    <HQShell>
      <div className="max-w-6xl space-y-12">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-serif font-medium tracking-tight">Growth Pipeline</h1>
                <p className="text-gray-500 font-serif mt-2 italic text-lg">Relationship Management & Outreach Tracking.</p>
            </div>
            <button className="bg-white text-black px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-gold transition-colors">
                + Manual Prospect
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map(s => (
                <div key={s.label} className="bg-black/40 border border-white/5 p-8 rounded-3xl">
                    <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">{s.label}</p>
                    <p className={`text-5xl font-serif font-medium ${s.color}`}>{s.value}</p>
                </div>
            ))}
        </div>

        <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-sm font-serif">
                <thead className="bg-white/5 border-b border-white/5">
                    <tr>
                        <th className="p-6 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">Target Organization</th>
                        <th className="p-6 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">Integrity Score</th>
                        <th className="p-6 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">Source</th>
                        <th className="p-6 font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">Funnel Status</th>
                        <th className="p-6 text-right font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {loading ? (
                        <tr><td colSpan={5} className="p-12 text-center text-gray-500">Accessing pipeline data...</td></tr>
                    ) : leads.map((lead, i) => (
                        <motion.tr 
                            key={lead.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="hover:bg-white/5 transition-colors"
                        >
                            <td className="p-6">
                                <p className="font-bold text-white text-lg leading-none mb-1">{lead.company || lead.email}</p>
                                <p className="text-[10px] font-mono text-gray-500">{lead.email}</p>
                            </td>
                            <td className="p-6">
                                <span className={`font-mono font-bold ${lead.score > 70 ? 'text-blue-400' : 'text-gray-500'}`}>
                                    {lead.score ? `${lead.score}%` : '—'}
                                </span>
                            </td>
                            <td className="p-6">
                                <span className="text-[9px] font-mono uppercase text-gray-500 bg-white/5 px-2 py-0.5 rounded">{lead.source}</span>
                            </td>
                            <td className="p-6">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                    lead.status === 'ALPHA_ENROLLED' ? 'text-green-400' : 'text-aic-gold'
                                }`}>
                                    {lead.status?.replace('_', ' ')}
                                </span>
                            </td>
                            <td className="p-6 text-right">
                                <button className="text-[10px] font-mono font-bold uppercase text-white border-b border-white/10 hover:border-aic-gold transition-all pb-1">
                                    Initiate Outreach
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </HQShell>
  )
}
