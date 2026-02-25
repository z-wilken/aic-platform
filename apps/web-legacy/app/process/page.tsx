'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const steps = [
  {
    id: '01',
    title: 'Intake & Triage',
    tagline: 'Defining the scope of accountability.',
    desc: 'We analyze your AI portfolio to determine which systems produce legal or high-stakes effects. This stage maps your infrastructure to our 3-tier framework.',
    deliverable: 'Audit Scope Document',
    duration: 'Week 1'
  },
  {
    id: '02',
    title: 'Gap Analysis',
    tagline: 'Pressure-testing the Human-in-the-Loop.',
    desc: 'Our lead auditors conduct deep-dive interviews and technical reviews. We look for the "Accountability Gap"—the space between model output and human approval.',
    deliverable: 'POPIA Section 71 Risk Report',
    duration: 'Week 2-3'
  },
  {
    id: '03',
    title: 'Bias Auditing',
    tagline: 'Technical validation of fairness.',
    desc: 'Using the AIC Audit Engine, we run statistical tests (Four-Fifths Rule) on your model datasets to identify disparate impact across protected groups.',
    deliverable: 'Statistical Bias Certificate',
    duration: 'Week 4'
  },
  {
    id: '04',
    title: 'Remediation',
    tagline: 'Bridging the trust gap.',
    desc: 'We provide specific, actionable protocols to bring non-compliant systems into alignment. This often involves building new human-review interfaces.',
    deliverable: 'Accountability Protocol Manual',
    duration: 'Week 5-7'
  },
  {
    id: '05',
    title: 'Certification',
    tagline: 'The seal of integrity.',
    desc: 'Final validation of protocols. Once verified, your organization receives the AIC Seal and is integrated into the AIC Pulse monitoring platform.',
    deliverable: 'Official AIC Certificate',
    duration: 'Week 8'
  }
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      
      <div className="py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mb-32"
          >
            <h2 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6">The Methodology</h2>
            <p className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-aic-black leading-tight">
              From Black Box <br />to Benchmark.
            </p>
            <p className="mt-12 text-xl text-gray-500 font-serif leading-relaxed italic">
              "Meaningful human intervention" is a legal requirement, not a suggestion. Our 8-week certification process makes it a technical reality.
            </p>
          </motion.div>

          <div className="space-y-32">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
              >
                <div className="md:col-span-1">
                    <span className="font-mono text-4xl font-bold text-aic-black/5 block">
                        {step.id}
                    </span>
                </div>
                
                <div className="md:col-span-4 sticky top-32">
                    <span className="font-mono text-[9px] font-bold text-aic-gold uppercase tracking-widest block mb-2">{step.duration}</span>
                    <h3 className="font-serif text-3xl font-medium text-aic-black mb-4">{step.title}</h3>
                    <p className="font-serif italic text-gray-400 text-lg">{step.tagline}</p>
                </div>

                <div className="md:col-span-7 pt-2">
                    <div className="bg-white p-12 border border-aic-black/5 shadow-sm">
                        <p className="font-serif text-lg text-gray-600 leading-relaxed mb-12">
                            {step.desc}
                        </p>
                        
                        <div className="pt-8 border-t border-aic-black/5 flex justify-between items-center">
                            <div>
                                <p className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Primary Deliverable</p>
                                <p className="font-mono text-xs font-bold text-aic-black uppercase tracking-wider">{step.deliverable}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-aic-black/10 flex items-center justify-center text-aic-black/20 font-mono text-[10px]">
                                OK
                            </div>
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-48 bg-aic-black p-24 text-center rounded-[3rem] overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-aic-gold/10 to-transparent pointer-events-none" />
            <h3 className="font-serif text-4xl text-white mb-8 relative z-10">Ready to secure your AI future?</h3>
            <div className="flex flex-col md:flex-row justify-center gap-8 relative z-10">
                <a href="/alpha" className="bg-white text-aic-black px-12 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-aic-gold transition-colors">
                    Apply for Alpha
                </a>
                <a href="/contact" className="border border-white/20 text-white px-12 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                    Talk to an Auditor
                </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}