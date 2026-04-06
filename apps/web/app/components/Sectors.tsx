'use client';

import { motion } from 'framer-motion';

const sectors = [
  {
    title: 'Financial Services',
    desc: 'De-risking automated credit scoring and fraud detection under POPIA Sec. 71.',
    stats: '8.5% Bias Variance',
    impact: 'Credit Fairness',
    icon: '🏦'
  },
  {
    title: 'Healthcare',
    desc: 'Certifying clinical decision support and radiology AI for patient safety.',
    stats: '100% Human Review',
    impact: 'Clinical Integrity',
    icon: '🏥'
  },
  {
    title: 'Recruitment',
    desc: 'Mitigating algorithmic bias in high-volume hiring and resume screening.',
    stats: 'Four-Fifths Rule',
    impact: 'Equal Opportunity',
    icon: '👔'
  },
  {
    title: 'Insurance',
    desc: 'Validating underwriting transparency for automated premium adjustments.',
    stats: '18% Premium Credit',
    impact: 'Risk Mitigation',
    icon: '🛡️'
  }
];

export default function SectorsSection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-end">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-4">Sectors of Impact</h2>
                <p className="font-serif text-5xl font-medium tracking-tight text-aic-black leading-tight">
                    Where Accountability <br />Meets Industry.
                </p>
            </motion.div>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-500 font-serif text-lg leading-relaxed max-w-md"
            >
                Our certification isn’t generic. We’ve mapped the AIC framework to the specific regulatory and ethical demands of the sectors where AI decisions matter most.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-aic-black/5 border border-aic-black/5">
          {sectors.map((sector, i) => (
            <motion.div 
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 flex flex-col hover:bg-aic-paper transition-colors group cursor-default"
            >
              <span className="text-3xl mb-8 block grayscale group-hover:grayscale-0 transition-all">{sector.icon}</span>
              <h3 className="font-serif text-2xl font-medium text-aic-black mb-4">{sector.title}</h3>
              <p className="text-sm text-gray-500 font-serif leading-relaxed mb-12 flex-grow">
                {sector.desc}
              </p>
              
              <div className="pt-8 border-t border-aic-black/5 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Benchmark</span>
                    <span className="text-[10px] font-mono font-bold text-aic-black">{sector.stats}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Focus</span>
                    <span className="text-[10px] font-mono font-bold text-aic-gold">{sector.impact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
