'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TrainingPortalPage() {
  const [activeModule, setActiveModule] = useState(0)

  const modules = [
    { id: 1, title: 'POPIA Section 71 Fundamentals', status: 'COMPLETED', type: 'LEGAL' },
    { id: 2, title: 'Bias Audit Methodology (EEOC)', status: 'ACTIVE', type: 'TECHNICAL' },
    { id: 3, title: 'Intersectional Fairness Testing', status: 'LOCKED', type: 'TECHNICAL' },
    { id: 4, title: 'Human-in-the-Loop Validation', status: 'LOCKED', type: 'OVERSIGHT' },
  ]

  return (
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-end border-b border-white/5 pb-8">
            <div>
                <h1 className="text-4xl font-serif font-medium tracking-tight underline decoration-aic-gold underline-offset-8">Personnel Academy</h1>
                <p className="text-gray-500 font-serif mt-4 italic text-lg max-w-xl">Accrediting the next generation of Lead Auditors for the SADC region.</p>
            </div>
            <div className="text-right">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-2">Institutional Progress</span>
                <div className="text-4xl font-serif font-medium text-aic-gold">25%</div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Curriculum Sidebar */}
            <div className="lg:col-span-4 space-y-4">
                <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em] mb-6">Certification Path</h3>
                {modules.map((m, i) => (
                    <motion.div 
                        key={m.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                            m.status === 'ACTIVE' ? 'bg-aic-gold text-black border-aic-gold' : 
                            m.status === 'COMPLETED' ? 'bg-white/5 border-green-500/20 text-white opacity-60' :
                            'bg-black border-white/5 text-gray-600 opacity-40 grayscale pointer-events-none'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[8px] font-mono font-bold uppercase tracking-widest">{m.type}</span>
                            <span className="text-[8px] font-mono font-bold uppercase">{m.status}</span>
                        </div>
                        <h4 className="font-serif font-bold text-lg leading-tight">{m.title}</h4>
                    </motion.div>
                ))}
            </div>

            {/* Module Preview / Exam Area */}
            <div className="lg:col-span-8">
                <div className="bg-[#141414] border border-white/5 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden h-full min-h-[500px]">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <div className="text-[10vw] font-bold">EXAM</div>
                    </div>

                    <div className="relative z-10">
                        <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-8 block">Active Module: 02</span>
                        <h2 className="text-3xl font-serif font-bold mb-8">Bias Audit Methodology (EEOC)</h2>
                        
                        <div className="space-y-8 mb-12">
                            <p className="text-gray-400 font-serif leading-relaxed text-lg italic">
                                "The auditor must verify that the selection rate for any race, sex, or ethnic group is at least 80% of the rate for the group with the highest selection rate."
                            </p>
                            
                            <div className="bg-black/40 border border-white/10 p-8 rounded-2xl space-y-6">
                                <p className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Question 1 of 12</p>
                                <p className="font-serif text-xl">A system selects 40% of Group A and 30% of Group B. Is this system technically 'BIASED' under the Four-Fifths Rule?</p>
                                
                                <div className="space-y-3 pt-4">
                                    {['YES - Impact ratio is 75%', 'NO - Impact ratio is 80%', 'INCONCLUSIVE - Need sample size'].map((opt, i) => (
                                        <button key={i} className="w-full text-left p-4 rounded-xl border border-white/5 hover:border-aic-gold transition-colors font-mono text-xs uppercase tracking-widest group">
                                            <span className="text-gray-500 group-hover:text-aic-gold mr-4">0{i+1}</span>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button className="bg-white text-black px-12 py-4 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-aic-gold transition-all">
                            Submit Final Answer
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
  );
}
