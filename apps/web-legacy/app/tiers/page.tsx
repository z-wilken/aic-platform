'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { tiers, caseStudies } from '../data/tiers';
import Link from 'next/link';

export default function TiersPage() {
  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-bold text-aic-gold font-mono uppercase tracking-[0.4em] mb-6"
            >
                The Framework
            </motion.p>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-aic-black"
            >
                Proportional <br />Accountability.
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 text-xl leading-relaxed text-gray-600 font-serif"
            >
              Not all AI is created equal. We map your certification requirements directly to the stakes of the decisions being made.
            </motion.p>
          </div>

          <div className="mx-auto mt-32 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-aic-black/5 border-y border-aic-black/5">
              {tiers.map((tier, i) => (
                <motion.div 
                  key={tier.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-aic-paper p-12 flex flex-col group transition-colors hover:bg-white"
                >
                  <div className="flex justify-between items-start mb-12">
                    <span className={`font-mono text-[10px] font-bold ${tier.color} tracking-[0.3em]`}>
                      LEVEL 0{tier.id}
                    </span>
                  </div>

                  <h3 className="text-3xl font-serif font-medium text-aic-black mb-4">
                    {tier.name.split(':')[1]}
                  </h3>
                  
                  <p className="text-sm font-serif italic text-gray-400 mb-8 leading-relaxed">
                    {tier.tagline}
                  </p>

                  <p className="text-base text-gray-600 font-serif leading-relaxed mb-12">
                    {tier.description}
                  </p>

                  <div className="mt-auto space-y-12">
                    <div>
                        <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Examples</h4>
                        <ul className="space-y-4">
                            {tier.examples.map(ex => (
                                <li key={ex} className="flex items-start gap-3 text-sm font-serif text-gray-500">
                                    <span className={`mt-1.5 w-1 h-1 shrink-0 ${tier.color.replace('text-', 'bg-')}`} />
                                    {ex}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-8 border-t border-aic-black/5">
                        <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Certification Requirements</h4>
                        <ul className="space-y-4">
                            {tier.requirements.map(req => (
                                <li key={req} className="flex items-start gap-3 text-xs font-mono text-gray-400 group-hover:text-aic-black transition-colors">
                                    <span className="mt-1">○</span>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div className="mt-48">
            <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-sm font-mono font-bold text-center text-aic-black uppercase tracking-[0.4em] mb-24"
            >
                Sector-Specific Implementation
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {caseStudies.map((cs, i) => (
                    <motion.div 
                        key={cs.organization} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="space-y-8"
                    >
                        <h4 className="font-serif font-medium text-2xl border-b border-aic-black pb-4">{cs.organization}</h4>
                        <div className="space-y-6">
                            {[
                                { l: "01", v: cs.tier1, c: "text-aic-red" },
                                { l: "02", v: cs.tier2, c: "text-aic-orange" },
                                { l: "03", v: cs.tier3, c: "text-aic-green" }
                            ].map(item => (
                                <div key={item.l} className="flex flex-col gap-1">
                                    <span className={`font-mono text-[9px] font-bold ${item.c} tracking-widest`}>LEVEL {item.l}</span>
                                    <span className="font-serif text-gray-600">{item.v}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-48 text-center"
          >
            <Link
              href="/assessment"
              className="inline-block border-b-2 border-aic-black pb-4 font-mono text-sm font-bold uppercase tracking-[0.3em] hover:text-aic-red hover:border-aic-red transition-all"
            >
              Determine Your Classification →
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}