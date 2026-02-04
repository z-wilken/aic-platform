'use client';

import { motion } from 'framer-motion';
import { tiers } from '../data/tiers';

export default function TierFramework() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <div id="framework" className="py-32 relative overflow-hidden bg-white/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-24"
        >
          <h2 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-4">The Standard</h2>
          <p className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-aic-black leading-tight">
            Proportional Governance <br />
            for Consequential Systems.
          </p>
          <p className="mt-6 text-lg text-gray-500 font-serif leading-relaxed">
            We map accountability to consequence. Our framework ensures that the level of human oversight matches the impact of the automated decision.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-aic-black/5 border-y border-aic-black/5"
        >
          {tiers.map((tier) => (
            <motion.div 
              key={tier.id} 
              variants={itemVariants}
              className="bg-aic-paper p-12 flex flex-col group transition-colors hover:bg-white"
            >
              <div className="flex justify-between items-start mb-12">
                <span className={`font-mono text-xs font-bold ${tier.color} tracking-widest`}>
                  LEVEL 0{tier.id}
                </span>
                <motion.div 
                  whileHover={{ rotate: 45 }}
                  className={`w-2 h-2 rounded-full ${tier.color.replace('text-', 'bg-')}`}
                />
              </div>

              <h3 className="text-2xl font-serif font-medium text-aic-black mb-4">
                {tier.name.split(':')[1]}
              </h3>
              
              <p className="text-sm font-serif italic text-gray-400 mb-8 leading-relaxed">
                {tier.tagline}
              </p>

              <p className="text-base text-gray-600 font-serif leading-relaxed mb-12">
                {tier.description}
              </p>

              <div className="mt-auto pt-8 border-t border-aic-black/5 space-y-6">
                <div>
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">Core Procedures</h4>
                    <ul className="space-y-3">
                        {tier.requirements.slice(0, 3).map((req) => (
                            <li key={req} className="flex items-center gap-3 text-xs font-mono text-gray-500">
                                <span className="w-1 h-1 bg-aic-black/20" />
                                {req}
                            </li>
                        ))}
                    </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}