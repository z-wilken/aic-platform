'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-bold text-aic-gold font-mono uppercase tracking-[0.4em] mb-6"
                >
                    Our Mission
                </motion.p>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-aic-black"
                >
                    The Trust Gap.
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="mt-12 text-2xl leading-relaxed text-gray-600 font-serif font-light italic"
                >
                    AI adoption is stalling not because of technology, but because of liability. AIC bridges the gap between innovation and regulation.
                </motion.p>
                
                <div className="mt-24 space-y-24">
                    <motion.section 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-aic-black/5 pt-12"
                    >
                        <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-aic-black">Why AIC Exists</h2>
                        <div className="space-y-6 text-gray-600 font-serif leading-relaxed text-lg">
                            <p>
                                Most global standards (like ISO 42001) focus on organizational governance. While valuable, they don&apos;t solve the specific legal exposure created by South African law.
                            </p>
                            <p>
                                AIC was built to be the &quot;Accountability Layer.&quot; We don&apos;t just audit your code; we validate your <span className="font-bold text-aic-black underline decoration-aic-gold underline-offset-4">Human-in-the-Loop</span> processes.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-aic-black/5 pt-12"
                    >
                        <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-aic-black">The Philosophy</h2>
                        <div className="space-y-8">
                            <p className="text-gray-600 font-serif leading-relaxed text-lg">
                                We believe in proportional regulation. A chatbot recommending a playlist should not face the same scrutiny as an algorithm denying a home loan.
                            </p>
                            <ul className="space-y-12">
                                {[
                                    { level: "01", title: "Critical Impact", desc: "For life-altering decisions, we require proof of explainability and active human review." },
                                    { level: "02", title: "Elevated Risk", desc: "For high-volume automated decisions, we mandate statistical bias auditing." },
                                    { level: "03", title: "Standard Automation", desc: "For low-risk tasks, transparency is the only requirement." }
                                ].map((item) => (
                                    <li key={item.level} className="group">
                                        <span className="block font-mono text-[10px] text-gray-400 group-hover:text-aic-gold transition-colors mb-2">LEVEL {item.level}</span>
                                        <h4 className="text-xl font-serif font-medium text-aic-black mb-2">{item.title}</h4>
                                        <p className="text-gray-500 font-serif">{item.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.section>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-12 bg-aic-black text-white text-center"
                >
                    <p className="font-serif text-2xl italic mb-8">&quot;We do not regulate AI. We certify that humans remain accountable.&quot;</p>
                    <a href="/contact" className="font-mono text-xs font-bold uppercase tracking-[0.3em] border-b border-white/20 pb-2 hover:border-white transition-colors">
                        Connect with the Founder
                    </a>
                </motion.div>
            </div>
        </div>
      </div>
    </main>
  );
}