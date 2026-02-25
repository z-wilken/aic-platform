'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function BusinessPage() {
  const offerings = [
    { title: 'The Framework', href: '/tiers', desc: 'A proportional, risk-based approach to AI accountability mapping.' },
    { title: 'The Methodology', href: '/process', desc: 'An 8-week audit cycle from gap analysis to verified certification.' },
    { title: 'The Platform', href: '/business#pulse', desc: 'Continuous governance monitoring via the AIC Pulse telemetry suite.' }
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
            <h2 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6">For Organizations</h2>
            <p className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-aic-black leading-tight">
              De-risk Innovation. <br />Certify Trust.
            </p>
            <p className="mt-12 text-xl text-gray-500 font-serif leading-relaxed italic">
              Bridge the trust gap between your AI capabilities and regulatory demands. AIC provides the definitive proof of POPIA Section 71 compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-aic-black/5 border border-aic-black/5 mb-32">
            {offerings.map((item, i) => (
                <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-16 flex flex-col group hover:bg-aic-paper transition-colors"
                >
                    <h3 className="font-serif text-3xl font-medium text-aic-black mb-6">{item.title}</h3>
                    <p className="font-serif text-lg text-gray-500 leading-relaxed mb-12">{item.desc}</p>
                    <div className="mt-auto">
                        <Link href={item.href} className="text-[10px] font-mono font-bold uppercase tracking-widest text-aic-black border-b border-aic-black/10 group-hover:border-aic-black transition-all pb-1">
                            Learn more →
                        </Link>
                    </div>
                </motion.div>
            ))}
          </div>

          <div className="bg-aic-black text-white p-24 rounded-[3rem] text-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="text-[15vw] font-bold leading-none -rotate-12 absolute -bottom-12 -left-12">ALPHA</div>
            </div>
            
            <h3 className="font-serif text-4xl mb-8 relative z-10">Recruiting Cohort 1.</h3>
            <p className="text-gray-400 font-serif text-lg mb-12 max-w-xl mx-auto relative z-10 leading-relaxed">
                Be among the first 10 South African organizations to establish the benchmark for accountable AI. Receive early access, 50% discount, and help shape the future of governance.
            </p>
            <Link href="/alpha" className="bg-aic-gold text-aic-black px-12 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors inline-block relative z-10">
                Join the Alpha Program
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
