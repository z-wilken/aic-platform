'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HQDashboard() {
  const [stats, setStats] = useState({ leads: 0, highIntent: 0, posts: 2 });

  useEffect(() => {
    fetch('/api/leads')
        .then(res => res.json())
        .then(data => {
            const leads = data.leads || [];
            setStats(prev => ({
                ...prev,
                leads: leads.length,
                highIntent: leads.filter((l: any) => (l.score || 0) > 70).length
            }));
        });
  }, []);

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
                Global oversight console for AIC. Monitoring multimillion-rand pipeline velocity and multi-sector algorithmic accountability.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[
                { l: 'Pipeline Value', v: 'R 12.4M', c: 'text-white', trend: '+14%' },
                { l: 'High-Risk Systems', v: '142', c: 'text-aic-red', trend: 'Critical' },
                { l: 'Active Auditors', v: '58', c: 'text-aic-gold', trend: 'Global' },
                { l: 'Citizen Appeals', v: '12', c: 'text-blue-400', trend: 'Pending' }
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
            {/* Pipeline Velocity Chart Placeholder */}
            <div className="lg:col-span-2 space-y-8">
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">Monthly Revenue Velocity</h3>
                <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-12 h-[400px] flex items-end justify-between gap-4">
                    {[40, 60, 45, 90, 65, 80, 85, 100, 95, 92, 110, 120].map((h, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            className="flex-1 bg-gradient-to-t from-aic-gold/20 to-aic-gold/5 border-t border-aic-gold/30 rounded-t-xl hover:from-aic-gold/40 transition-all cursor-pointer relative group"
                        >
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[8px] text-aic-gold opacity-0 group-hover:opacity-100 transition-opacity">R {h}K</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Quick Outreach */}
            <div className="space-y-8">
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">High-Priority Targets</h3>
                <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-10 space-y-8">
                    <p className="text-sm text-gray-500 font-serif italic leading-relaxed">Institutional entities matching "High-Stakes" profile with zero certification history.</p>
                    <div className="space-y-6">
                        {[
                            { name: 'Standard Bank', score: 92, val: 'R 240K' },
                            { name: 'Investec Health', score: 88, val: 'R 180K' },
                            { name: 'National Treasury', score: 95, val: 'TENDER' }
                        ].map(target => (
                            <div key={target.name} className="flex justify-between items-center p-6 bg-white/[0.02] rounded-2xl border border-white/5 group hover:border-aic-gold/30 transition-all cursor-pointer">
                                <div>
                                    <span className="font-serif text-xl block text-white group-hover:text-aic-gold transition-colors">{target.name}</span>
                                    <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">{target.val} POTENTIAL</span>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-aic-gold">{target.score}%</span>
                            </div>
                        ))}
                    </div>
                    <Link href="/crm" className="block text-center py-6 border-t border-white/5 font-mono text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-all">
                        View Global Pipeline →
                    </Link>
                </div>
            </div>
        </div>
      </div>
  )
}

