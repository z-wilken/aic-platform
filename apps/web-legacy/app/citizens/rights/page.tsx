'use client';

import Navbar from '@/app/components/Navbar';
import { motion } from 'framer-motion';
import { InstitutionalFooter } from '@aic/ui';

export default function CitizenRightsHub() {
    const rights = [
        {
            id: 'agency',
            title: 'Right to Human Agency',
            desc: 'The right to have your case reviewed by a human being, ensuring automated systems do not replace human judgment in life-altering decisions.',
            marker: 'Section 71(1)'
        },
        {
            id: 'explanation',
            title: 'Right to Explanation',
            desc: 'The right to receive a clear, understandable reason for an automated decision, including the key factors that influenced the outcome.',
            marker: 'Section 71(3)(a)'
        },
        {
            id: 'empathy',
            title: 'Right to Empathy',
            desc: 'The right to communicate with an organization that values human dignity and maintains an empathetic approach to automated interactions.',
            marker: 'Constitutional Standard'
        },
        {
            id: 'correction',
            title: 'Right to Correction',
            desc: 'The right to contest an automated decision and have a human correction process verify and rectify any algorithmic errors.',
            marker: 'Section 71(3)(b)'
        },
        {
            id: 'truth',
            title: 'Right to Truth',
            desc: 'The right to know when you are interacting with an AI system and to receive honest disclosure about its limitations and scope.',
            marker: 'Transparency Mandate'
        }
    ];

    return (
        <main className="min-h-screen bg-aic-paper">
            <Navbar />
            
            <section className="py-32 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-serif font-bold text-aic-black tracking-tight mb-8"
                    >
                        Your Algorithmic Rights.
                    </motion.h1>
                    <p className="text-xl text-gray-500 font-serif italic max-w-2xl mx-auto leading-relaxed">
                        "No final decision affecting a person’s legal status shall be made solely by a machine."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rights.map((right, i) => (
                        <motion.div 
                            key={right.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-aic-black/5 p-12 rounded-[3rem] hover:shadow-2xl transition-all group"
                        >
                            <span className="text-[10px] font-mono font-bold text-aic-gold uppercase tracking-[0.4em] mb-8 block">{right.marker}</span>
                            <h3 className="text-3xl font-serif font-bold text-aic-black mb-6 group-hover:text-aic-gold transition-colors">{right.title}</h3>
                            <p className="text-gray-500 font-serif text-lg leading-relaxed italic">"{right.desc}"</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="bg-aic-black py-32 text-center text-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                    <h2 className="text-4xl font-serif mb-12">Empowering Digital Dignity</h2>
                    <p className="text-gray-400 font-serif italic text-lg mb-16 leading-relaxed">
                        If you believe your algorithmic rights have been violated, or if you have received an automated decision without a recourse path, you can lodge a concern in our public registry.
                    </p>
                    <button className="bg-white text-black px-12 py-5 font-mono text-xs font-bold uppercase tracking-[0.3em] hover:bg-aic-gold transition-all">
                        REPORT_ACCOUNTABILITY_CONCERN
                    </button>
                </div>
            </section>

            <InstitutionalFooter />
        </main>
    );
}