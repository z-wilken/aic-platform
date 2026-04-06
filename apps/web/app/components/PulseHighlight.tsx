'use client';

import { motion } from 'framer-motion';

export default function PulseHighlight() {
  const easeArray = [0.16, 1, 0.3, 1];

  return (
    <section className="py-32 bg-aic-black text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aic-gold/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6"
            >
                The Platform
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: easeArray as any }}
                className="font-serif text-5xl font-medium tracking-tight leading-tight mb-8"
            >
                Continuous Governance via <br />
                <span className="italic text-gray-400 font-normal underline decoration-aic-gold underline-offset-8">AIC Pulse.</span>
            </motion.p>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 font-serif text-xl leading-relaxed mb-12"
            >
                Certification is a snapshot. Governance is a cycle. Our proprietary SaaS platform monitors your AI systems in real-time, detecting bias drift before it becomes a liability.
            </motion.p>

            <div className="space-y-8">
                {[
                    { t: 'Real-time Bias Detection', d: 'Automated monitoring using the Four-Fifths rule algorithm.' },
                    { t: 'Immutable Audit Trails', d: 'Securely logging every human intervention for regulatory proof.' },
                    { t: 'Monthly Compliance Reporting', d: 'Executive-level summaries delivered directly to your CRO dashboard.' }
                ].map((item, i) => (
                    <motion.div 
                        key={item.t}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="flex gap-6"
                    >
                        <span className="text-aic-gold font-mono text-xs pt-1">0{i+1}</span>
                        <div>
                            <h4 className="font-serif text-lg font-medium mb-2">{item.t}</h4>
                            <p className="text-sm text-gray-500 font-serif leading-relaxed">{item.d}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Simulated UI Card */}
            <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-8 shadow-2xl perspective-1000 rotate-y-[-10deg]">
                <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Live Integrity Stream</span>
                </div>

                <div className="space-y-6">
                    <div className="h-2 w-3/4 bg-white/5 rounded" />
                    <div className="h-2 w-1/2 bg-white/5 rounded" />
                    
                    <div className="py-8">
                        <div className="flex items-end gap-4 mb-4">
                            <div className="h-24 w-4 bg-aic-gold/20 rounded-t" />
                            <div className="h-32 w-4 bg-aic-gold/40 rounded-t" />
                            <div className="h-16 w-4 bg-aic-gold/10 rounded-t" />
                            <div className="h-40 w-4 bg-aic-gold rounded-t" />
                            <div className="h-28 w-4 bg-aic-gold/60 rounded-t" />
                        </div>
                        <div className="flex justify-between text-[8px] font-mono text-gray-600 uppercase">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                        </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-mono text-gray-400 uppercase mb-1">Current Integrity Score</p>
                            <p className="text-2xl font-serif font-bold text-aic-gold">94.8</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[8px] font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">HEALTHY</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Floating Detail */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as any }}
                className="absolute -bottom-8 -left-8 bg-aic-gold p-6 text-aic-black rounded-xl shadow-xl hidden md:block"
            >
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-2">System Alert</p>
                <p className="font-serif text-sm font-bold">New Bias Pattern Detected <br />in Loan Model A</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
