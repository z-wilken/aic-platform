'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function CitizensPage() {
  const rights = [
    { 
        id: '01', 
        title: 'Right to Human Intervention', 
        desc: 'You have the right not to be subject to a decision based solely on automated processing which results in legal consequences or substantial impact.' 
    },
    { 
        id: '02', 
        title: 'Right to Explanation', 
        desc: 'You are entitled to a clear, non-technical explanation of the logic used by an AI system to reach a decision about you.' 
    },
    { 
        id: '03', 
        title: 'Right to Empathy', 
        desc: 'Automated systems must communicate with human dignity. You should never be subjected to hostile or purely bureaucratic machine logic.' 
    },
    { 
        id: '04', 
        title: 'Right to Correction', 
        desc: 'If an AI system makes an error, you have the right to a human-led appeal process to contest and correct the outcome.' 
    }
  ];

  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      
      <div className="py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mb-32"
          >
            <h2 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6">For the Public</h2>
            <p className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-aic-black leading-tight">
              Know Your <br />Algorithmic Rights.
            </p>
            <p className="mt-12 text-xl text-gray-500 font-serif leading-relaxed italic">
              Algorithms are making decisions about your life, your credit, and your future. AIC ensures that humans—not just machines—remain accountable for those outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-aic-black/5 border border-aic-black/5 mb-32">
            {rights.map((right, i) => (
                <motion.div 
                    key={right.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-16 flex flex-col group hover:bg-aic-paper transition-colors"
                >
                    <span className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-widest mb-8">Article {right.id}</span>
                    <h3 className="font-serif text-3xl font-medium text-aic-black mb-6">{right.title}</h3>
                    <p className="font-serif text-lg text-gray-500 leading-relaxed mb-12">{right.desc}</p>
                    <div className="mt-auto">
                        <Link href="/docs/rights" className="text-[10px] font-mono font-bold uppercase tracking-widest text-aic-black border-b border-aic-black/10 group-hover:border-aic-black transition-all pb-1">
                            Read Legal Basis →
                        </Link>
                    </div>
                </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-aic-black text-white p-16 rounded-[3rem] overflow-hidden relative"
            >
                <div className="relative z-10">
                    <h3 className="font-serif text-4xl mb-8">Search the Registry.</h3>
                    <p className="text-gray-400 font-serif text-lg mb-12 leading-relaxed">
                        Verify if an organization is AIC-Certified. Our public registry lists firms that have proven their commitment to human accountability.
                    </p>
                    <Link href="/registry" className="bg-white text-aic-black px-12 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-aic-gold transition-colors inline-block">
                        Search Database
                    </Link>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-aic-red p-16 rounded-[3rem] text-white"
            >
                <h3 className="font-serif text-4xl mb-8">Report an Abuse.</h3>
                <p className="text-white/80 font-serif text-lg mb-12 leading-relaxed">
                    Have you been subjected to an automated decision that felt hostile, biased, or lacked human review? Report it to our lead auditors.
                </p>
                <Link href="/contact?type=report" className="bg-white text-aic-red px-12 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors inline-block">
                    Submit Report
                </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
