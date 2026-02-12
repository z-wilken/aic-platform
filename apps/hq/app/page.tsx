'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HQDashboard() {
  const [dashboard, setDashboard] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
        .then(res => res.json())
        .then(data => {
            setDashboard(data)
            setLoading(false)
        })
        .catch(() => setLoading(false))
  }, [])

  const kpis = dashboard?.kpis || {}

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aic-gold"></div>
      </div>
    )
  }

  return (
      <div className="space-y-16">
        <div className="max-w-4xl">
            <div className="flex items-center gap-4 text-aic-gold mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.4em]">
                <span className="h-1.5 w-1.5 rounded-full bg-aic-gold animate-pulse"></span>
                Registry Sync Active
            </div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-serif font-medium tracking-tight mb-8"
            >
                Institutional Intelligence.
            </motion.h1>
            <p className="text-xl text-gray-500 font-serif leading-relaxed italic max-w-2xl">
                Global oversight console for AIC. Monitoring {kpis.totalOrgs || 0} certified organizations across {kpis.tier1Count || 0} critical-tier deployments.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[
                { l: 'Certified Orgs', v: kpis.totalOrgs || 0, c: 'text-white', trend: `${kpis.tier1Count || 0} Tier 1` },
                { l: 'Avg Integrity', v: `${kpis.avgScore || 0}%`, c: 'text-aic-gold', trend: 'Across all' },
                { l: 'Active Auditors', v: kpis.activeAuditors || 0, c: 'text-green-400', trend: 'Personnel' },
                { l: 'Citizen Appeals', v: kpis.openAppeals || 0, c: kpis.openAppeals > 0 ? 'text-aic-red' : 'text-blue-400', trend: 'Open' }
            ].map((s, i) => (
                <motion.div
                    key={s.l}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#080808] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-aic-gold/20 transition-all"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10 font-mono text-[8px] tracking-widest">{s.trend}</div>
                    <p className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-[0.3em] mb-6">{s.l}</p>
                    <p className={`text-5xl font-serif font-medium ${s.c}`}>{s.v}</p>
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
            {/* Monthly Audit Activity */}
            <div className="lg:col-span-2 space-y-8">
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">Monthly Audit Activity</h3>
                <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-12 h-[400px] flex items-end justify-between gap-4">
                    {(dashboard?.monthlyActivity?.length > 0
                        ? dashboard.monthlyActivity
                        : [{month: 'No data', count: 0}]
                    ).map((m: any, i: number) => {
                        const maxCount = Math.max(...(dashboard?.monthlyActivity || []).map((a: any) => a.count), 1)
                        const heightPct = Math.max(5, (m.count / maxCount) * 100)
                        return (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPct}%` }}
                                className="flex-1 bg-gradient-to-t from-aic-gold/20 to-aic-gold/5 border-t border-aic-gold/30 rounded-t-xl hover:from-aic-gold/40 transition-all cursor-pointer relative group"
                            >
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[8px] text-aic-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{m.count} audits</span>
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[7px] text-gray-600 whitespace-nowrap">{m.month}</span>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Top Organizations */}
            <div className="space-y-8">
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">Top Organizations</h3>
                <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-10 space-y-8">
                    <p className="text-sm text-gray-500 font-serif italic leading-relaxed">Highest-scoring certified organizations.</p>
                    <div className="space-y-6">
                        {(dashboard?.topOrganizations || []).map((org: any) => (
                            <div key={org.id} className="flex justify-between items-center p-6 bg-white/[0.02] rounded-2xl border border-white/5 group hover:border-aic-gold/30 transition-all cursor-pointer">
                                <div>
                                    <span className="font-serif text-xl block text-white group-hover:text-aic-gold transition-colors">{org.name}</span>
                                    <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">{org.tier}</span>
                                </div>
                                <span className={`text-[10px] font-mono font-bold ${org.integrity_score >= 80 ? 'text-green-400' : 'text-aic-gold'}`}>{org.integrity_score}%</span>
                            </div>
                        ))}
                        {(dashboard?.topOrganizations || []).length === 0 && (
                            <p className="text-sm text-gray-600 italic text-center py-8">No organizations onboarded yet.</p>
                        )}
                    </div>
                    <Link href="/organizations" className="block text-center py-6 border-t border-white/5 font-mono text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-all">
                        View All Organizations →
                    </Link>
                </div>
            </div>
        </div>
      </div>
  )
}
