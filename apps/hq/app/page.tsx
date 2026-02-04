'use client'

import { useEffect, useState } from 'react'
import HQShell from './components/HQShell'
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
    <HQShell>
      <div className="space-y-12">
        <div className="max-w-3xl">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-serif font-medium tracking-tight mb-6"
            >
                Command Center.
            </motion.h1>
            <p className="text-xl text-gray-500 font-serif leading-relaxed italic">
                Centralized intelligence for growth, relationships, and the AIC public voice.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
                { l: 'Pipeline Volume', v: stats.leads, c: 'text-white' },
                { l: 'High Intent', v: stats.highIntent, c: 'text-blue-400' },
                { l: 'Published Insights', v: stats.posts, c: 'text-aic-gold' },
                { l: 'Subscribers', v: '142', c: 'text-purple-400' }
            ].map((s, i) => (
                <motion.div 
                    key={s.l}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/40 border border-white/5 p-8 rounded-3xl"
                >
                    <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4">{s.l}</p>
                    <p className={`text-4xl font-serif font-medium ${s.c}`}>{s.v}</p>
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
            {/* Quick Outreach */}
            <div className="space-y-6">
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">High-Priority Outreach</h3>
                <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 space-y-6">
                    <p className="text-sm text-gray-400 font-serif italic mb-8">Targets matching "High Intent" profile with zero contact history.</p>
                    <div className="space-y-4">
                        {[
                            { name: 'Standard Bank', score: 92 },
                            { name: 'Investec', score: 88 }
                        ].map(target => (
                            <div key={target.name} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-aic-gold transition-colors">
                                <span className="font-serif text-lg">{target.name}</span>
                                <span className="text-[10px] font-mono font-bold text-aic-gold">{target.score}% INTENT</span>
                            </div>
                        ))}
                    </div>
                    <Link href="/crm" className="block text-center py-4 border-t border-white/5 font-mono text-[9px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors mt-8">
                        View Complete Pipeline →
                    </Link>
                </div>
            </div>

            {/* Quick Content */}
            <div className="space-y-6">
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">Content Velocity</h3>
                <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 space-y-6">
                    <p className="text-sm text-gray-400 font-serif italic mb-8">Recent activity across the public blog and newsletters.</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-lg">✍️</span>
                            <div>
                                <p className="text-xs font-bold">Draft: The Right to Explanation</p>
                                <p className="text-[9px] font-mono text-gray-500 uppercase">Modified 2h ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-lg">📬</span>
                            <div>
                                <p className="text-xs font-bold">Newsletter: Feb Week 1</p>
                                <p className="text-[9px] font-mono text-gray-500 uppercase">Scheduled for Fri</p>
                            </div>
                        </div>
                    </div>
                    <Link href="/cms" className="block text-center py-4 border-t border-white/5 font-mono text-[9px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors mt-8">
                        Enter Content CMS →
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </HQShell>
  )
}
