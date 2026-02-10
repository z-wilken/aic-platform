'use client';

import { motion } from 'framer-motion';

export default function RevenueVelocityPage() {
    const segments = [
        { label: 'Unqualified Leads', value: 124, amount: 'R 0.0M', color: 'bg-zinc-800' },
        { label: 'Discovery Phase', value: 42, amount: 'R 1.2M', color: 'bg-blue-900/40' },
        { label: 'Alpha Program', value: 12, amount: 'R 4.2M', color: 'bg-aic-gold/40' },
        { label: 'Certified Institutional', value: 3, amount: 'R 7.0M', color: 'bg-green-900/40' }
    ];

    return (
        <div className="space-y-16">
            <div className="flex justify-between items-end border-b border-white/5 pb-12">
                <div>
                    <h1 className="text-5xl font-serif font-medium tracking-tight tracking-tighter mb-4">Pipeline Velocity</h1>
                    <p className="text-gray-500 font-serif italic text-lg max-w-2xl">
                        Tracking institutional revenue flow and market expansion speed.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-[0.4em] mb-2">Total Lifecycle Value</p>
                    <div className="text-4xl font-serif text-white uppercase tracking-widest">R 12.4M</div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {segments.map((s, i) => (
                    <motion.div 
                        key={s.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#080808] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-white/10 transition-all"
                    >
                        <div className={`absolute top-0 right-0 w-1/3 h-full ${s.color} blur-[100px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity`} />
                        
                        <div className="flex justify-between items-center relative z-10">
                            <div>
                                <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">{s.label}</p>
                                <h3 className="text-3xl font-serif font-bold text-white tracking-tight">{s.amount}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-mono text-gray-600 uppercase mb-1">Entity Count</p>
                                <p className="text-2xl font-serif text-aic-gold">{s.value}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/[0.01] border border-white/5 p-12 rounded-[3rem]">
                    <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] mb-8">Quarterly Growth (Q1 2026)</h4>
                    <div className="space-y-6">
                        {[
                            { m: 'January', v: 'R 1.2M', p: 40 },
                            { m: 'February', v: 'R 4.2M', p: 100 },
                            { m: 'March (Target)', v: 'R 7.0M', p: 160 }
                        ].map(month => (
                            <div key={month.m} className="space-y-2">
                                <div className="flex justify-between font-mono text-[9px]">
                                    <span className="text-gray-400 uppercase">{month.m}</span>
                                    <span className="text-white font-bold">{month.v}</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(month.p / 160) * 100}%` }}
                                        className="h-full bg-aic-gold"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#080808] border border-white/5 p-12 rounded-[3rem] flex flex-col justify-center">
                    <h4 className="font-serif text-2xl text-white mb-4 italic">Efficiency Insight</h4>
                    <p className="text-gray-500 font-serif text-sm leading-relaxed mb-8 italic">
                        Conversion from Alpha to Certified Institutional has accelerated by 12% following the deployment of the Insurance Risk API.
                    </p>
                    <button className="bg-white text-black px-10 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-aic-gold transition-all">
                        EXPORT_GROWTH_MANIFEST
                    </button>
                </div>
            </div>
        </div>
    );
}
