'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function EngineOpsPage() {
    const [stats, setStats] = useState({
        totalAudits: 14208,
        avgLatency: '1.82s',
        successRate: '99.98%',
        uptime: '14d 6h 22m'
    });

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end border-b border-white/5 pb-12">
                <div>
                    <h1 className="text-5xl font-serif font-medium tracking-tight tracking-tighter mb-4">Audit Engine Ops</h1>
                    <p className="text-gray-500 font-serif italic text-lg max-w-2xl">
                        Real-time telemetry for the AIC Intelligence Core. Monitoring statistical throughput and inference stability.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-mono font-bold text-green-500 uppercase tracking-[0.4em] mb-2">System Status</p>
                    <div className="text-2xl font-serif text-white uppercase tracking-widest">Optimal</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { l: 'Total Audits Processed', v: stats.totalAudits.toLocaleString(), c: 'text-white' },
                    { l: 'Average Inference Latency', v: stats.avgLatency, c: 'text-aic-gold' },
                    { l: 'Technical Success Rate', v: stats.successRate, c: 'text-green-400' },
                    { l: 'Engine System Uptime', v: stats.uptime, c: 'text-blue-400' }
                ].map((s, i) => (
                    <motion.div 
                        key={s.l}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#080808] border border-white/5 p-8 rounded-3xl"
                    >
                        <p className="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-widest mb-4">{s.l}</p>
                        <p className={`text-3xl font-serif font-medium ${s.c}`}>{s.v}</p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 font-serif italic text-6xl select-none">TELEMETRY</div>
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] mb-12">Inference Distribution (24h)</h3>
                <div className="h-64 flex items-end gap-2">
                    {[60, 45, 80, 100, 95, 70, 85, 90, 110, 120, 100, 80, 60, 40, 50, 70, 90, 100, 110, 95, 80, 70, 65, 55].map((h, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ height: 0 }}
                            animate={{ height: `${(h / 120) * 100}%` }}
                            className="flex-1 bg-aic-gold/10 border-t border-aic-gold/20 rounded-t-sm"
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-6 text-[8px] font-mono text-gray-600 uppercase tracking-widest px-2">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>23:59</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                    <h4 className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-widest mb-6">Active Instances</h4>
                    <div className="space-y-4">
                        {['ENGINE_NODE_ZA_01', 'ENGINE_NODE_ZA_02', 'ENGINE_NODE_MU_01'].map(node => (
                            <div key={node} className="flex justify-between items-center p-4 bg-black rounded-xl border border-white/5 font-mono text-[9px]">
                                <span className="text-white">{node}</span>
                                <span className="text-green-500">READY</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                    <h4 className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-widest mb-6">Security & Integrity</h4>
                    <div className="space-y-4 font-serif text-sm text-gray-400 italic">
                        <p>• All inferences are hashed into the Trust Registry.</p>
                        <p>• De-identification layer verified for SADC data residency.</p>
                        <p>• Red-Team Proxy Discovery active on all production nodes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
