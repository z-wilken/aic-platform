'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function CitizensRightsPage() {
  const rights = [
    {
      id: '01',
      title: 'The Right to Human Agency',
      legal: 'POPIA Section 71(1)',
      desc: 'You have the right not to be subject to a decision based solely on automated processing. Every high-stakes decision—credit, insurance, employment—must involve meaningful human intervention.',
      details: [
        'Mandatory human review for Tier 1 systems',
        'Visible override mechanisms',
        'Human accountability for every machine outcome'
      ]
    },
    {
      id: '02',
      title: 'The Right to Explanation',
      legal: 'POPIA Section 71(3)',
      desc: 'When an algorithm makes a decision about you, you are entitled to a clear, non-technical explanation of the logic used. "The computer said so" is not a legal justification.',
      details: [
        'Local feature importance analysis',
        'Plain-language decision factors',
        'Understanding the "Why" behind the "What"'
      ]
    },
    {
      id: '03',
      title: 'The Right to Empathy',
      legal: 'AIC Ethical Framework',
      desc: 'Algorithms must communicate with human dignity. Hostile or purely bureaucratic machine logic that causes distress is a violation of your dignity.',
      details: [
        'Tone and sentiment auditing',
        'Respectful rejection protocols',
        'Recognition of human context'
      ]
    },
    {
      id: '04',
      title: 'The Right to Correction',
      legal: 'POPIA Section 24',
      desc: 'If an AI system makes an error, you have the right to a human-led appeal process to contest and correct the outcome.',
      details: [
        'Formal appeal pathway',
        'Documented human reconsideration',
        'Prompt correction of algorithmic errors'
      ]
    },
    {
      id: '05',
      title: 'The Right to Truth',
      legal: 'AIC Transparency Standard',
      desc: 'You have the right to know when you are interacting with an AI. Deceptive simulation of human identity is strictly prohibited under the AIC standard.',
      details: [
        'Explicit AI disclosure',
        'Clear virtual assistant identity',
        'No deceptive human simulation'
      ]
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
            <h2 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6">The 5 Rights</h2>
            <p className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-aic-black leading-tight">
              Know Your <br />Algorithmic Rights.
            </p>
            <p className="mt-12 text-xl text-gray-500 font-serif leading-relaxed italic max-w-2xl">
              Algorithms are the new law. AIC ensures they remain subject to human values and Constitutional rights.
            </p>
          </motion.div>

          <div className="space-y-32">
            {rights.map((right, i) => (
              <motion.section 
                key={right.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-aic-black/5 pt-16"
              >
                <div className="lg:col-span-1">
                  <span className="font-serif text-4xl text-aic-gold italic opacity-50">{right.id}</span>
                </div>
                <div className="lg:col-span-5">
                  <h3 className="font-serif text-4xl font-medium text-aic-black mb-4">{right.title}</h3>
                  <span className="font-mono text-[9px] font-bold text-aic-red uppercase tracking-widest bg-aic-red/5 px-2 py-1 rounded">
                    {right.legal}
                  </span>
                </div>
                <div className="lg:col-span-6 space-y-8">
                  <p className="font-serif text-xl text-gray-600 leading-relaxed italic">
                    {right.desc}
                  </p>
                  <ul className="space-y-4">
                    {right.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-[10px] font-mono font-bold text-aic-black uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-aic-gold" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-48 bg-aic-black text-white p-24 rounded-[3rem] text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="font-serif text-4xl mb-8">Subject to Automated Decision-Making?</h3>
              <p className="text-gray-400 font-serif text-lg mb-12 max-w-xl mx-auto leading-relaxed italic">
                If you believe any of these rights have been compromised by an organization, you can file a formal appeal through our intermediate justice portal.
              </p>
              <Link href="/citizens/appeal" className="bg-white text-aic-black px-12 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-aic-gold transition-colors inline-block">
                Start Appeal Process
              </Link>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <div className="text-[15vw] font-bold leading-none -rotate-12">RIGHTS</div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
