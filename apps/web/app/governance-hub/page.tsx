'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Metadata } from 'next';

const rights = [
  {
    id: '01',
    title: 'Right to Human Agency',
    description:
      'Every person affected by an automated decision has the right to demand meaningful human review. No consequential outcome — employment, credit, healthcare, parole — may be determined solely by an algorithm.',
    regulation: 'POPIA Section 71',
    color: 'text-aic-gold',
    bgAccent: 'bg-aic-gold/5',
  },
  {
    id: '02',
    title: 'Right to Explanation',
    description:
      'Individuals must receive a clear, intelligible account of how an automated decision was reached — including the key data inputs, model logic, and the weight assigned to each factor.',
    regulation: 'EU AI Act Art. 13',
    color: 'text-aic-red',
    bgAccent: 'bg-aic-red/5',
  },
  {
    id: '03',
    title: 'Right to Empathy',
    description:
      'Communications about adverse automated decisions must be delivered with appropriate sensitivity and free from dehumanising language. Rejection notices must be drafted with care and compassion.',
    regulation: 'AIC Standard § 3',
    color: 'text-aic-gold',
    bgAccent: 'bg-aic-gold/5',
  },
  {
    id: '04',
    title: 'Right to Correction',
    description:
      'A clear and accessible appeals process must exist for every consequential automated decision. Individuals have the right to contest outcomes and have errors corrected without undue burden.',
    regulation: 'GDPR Art. 22',
    color: 'text-aic-red',
    bgAccent: 'bg-aic-red/5',
  },
  {
    id: '05',
    title: 'Right to Truth',
    description:
      'Organisations must proactively disclose when artificial intelligence meaningfully influences decisions that affect people. There is no right to be deceived about the role of automation in consequential outcomes.',
    regulation: 'ISO/IEC 42001 § 9',
    color: 'text-aic-gold',
    bgAccent: 'bg-aic-gold/5',
  },
];

const standards = [
  {
    code: 'POPIA § 71',
    jurisdiction: 'South Africa',
    summary:
      'Prohibits fully automated decisions without meaningful human intervention. The cornerstone of South African AI accountability law.',
    status: 'In force',
    href: 'https://popia.co.za',
  },
  {
    code: 'ISO/IEC 42001',
    jurisdiction: 'International',
    summary:
      'The global management system standard for responsible AI. Establishes governance, risk management, and accountability requirements.',
    status: 'Published 2023',
    href: '#corporate-portal',
  },
  {
    code: 'EU AI Act',
    jurisdiction: 'European Union',
    summary:
      'Risk-based classification requiring conformity assessments, human oversight, and transparency for high-risk AI systems.',
    status: 'In force 2024',
    href: '#',
  },
  {
    code: 'NIST AI RMF',
    jurisdiction: 'United States',
    summary:
      'Voluntary framework for managing risks of AI systems across Govern, Map, Measure, and Manage functions.',
    status: 'Published 2023',
    href: '#',
  },
  {
    code: 'IEEE 7000 Series',
    jurisdiction: 'International',
    summary:
      'Technical standards for ethically aligned system design, addressing transparency, privacy, and algorithmic bias.',
    status: 'Active',
    href: '#',
  },
  {
    code: 'EEOC Title VII',
    jurisdiction: 'United States',
    summary:
      'Enforces the Four-Fifths Rule to prevent algorithmic discrimination in employment selection and promotion.',
    status: 'Enforced',
    href: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function GovernanceHubPage() {
  return (
    <main className="min-h-screen bg-aic-paper">
      {/* Hero */}
      <section className="relative overflow-hidden py-32 bg-aic-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-aic-gold/10 via-transparent to-aic-red/5 pointer-events-none"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6"
          >
            Governance Hub
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-7xl font-medium tracking-tight text-white leading-[0.95] max-w-3xl"
          >
            Algorithmic Rights <br />
            <span className="italic text-aic-gold font-normal">& Global Standards.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 font-serif text-lg text-gray-300 max-w-xl leading-relaxed"
          >
            The AIC Governance Hub is the authoritative reference for AI accountability standards,
            the Declaration of Algorithmic Rights, and the global regulatory landscape governing
            automated decision systems.
          </motion.p>
        </div>
      </section>

      {/* The 5 Algorithmic Rights */}
      <section className="py-32 bg-aic-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
              The Declaration
            </h2>
            <p className="font-serif text-4xl md:text-5xl font-medium text-aic-black tracking-tight leading-tight max-w-2xl">
              The Five Algorithmic Rights.
            </p>
            <p className="mt-6 font-serif text-lg text-gray-500 max-w-xl leading-relaxed">
              AIC&apos;s audit framework is built on five universal rights that every individual holds
              with respect to automated decisions that affect their life, liberty, or livelihood.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-px border-y border-aic-black/5"
          >
            {rights.map((right) => (
              <motion.div
                key={right.id}
                variants={itemVariants}
                className={`group flex flex-col md:flex-row gap-8 md:gap-16 p-12 bg-white hover:${right.bgAccent} transition-colors border-b border-aic-black/5 last:border-0`}
              >
                <div className="flex-shrink-0 md:w-24">
                  <span className={`font-mono text-3xl font-bold ${right.color} tracking-tight`}>
                    {right.id}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <h3 className="font-serif text-2xl font-medium text-aic-black">{right.title}</h3>
                    <span className={`font-mono text-[9px] font-bold ${right.color} uppercase tracking-widest whitespace-nowrap border border-current px-3 py-1 self-start`}>
                      {right.regulation}
                    </span>
                  </div>
                  <p className="font-serif text-gray-600 text-base leading-relaxed">
                    {right.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Standards Grid */}
      <section className="py-32 bg-white border-y border-aic-black/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
              Regulatory Alignment
            </h2>
            <p className="font-serif text-4xl md:text-5xl font-medium text-aic-black tracking-tight leading-tight">
              Global Standards Directory.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-aic-black/5 border border-aic-black/5"
          >
            {standards.map((std) => (
              <motion.div
                key={std.code}
                variants={itemVariants}
                className="bg-white p-10 flex flex-col hover:bg-aic-paper transition-colors group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs font-bold text-aic-gold uppercase tracking-widest">
                    {std.jurisdiction}
                  </span>
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                    {std.status}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium text-aic-black mb-4">{std.code}</h3>
                <p className="font-serif text-sm text-gray-500 leading-relaxed flex-1">
                  {std.summary}
                </p>
                <div className="mt-8 pt-6 border-t border-aic-black/5">
                  <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-aic-black transition-colors">
                    View Standard →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-aic-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-medium text-white mb-6"
          >
            Apply the Standard.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-gray-400 text-lg mb-12 max-w-xl mx-auto"
          >
            Move from understanding rights to certifying compliance. Join the AIC Alpha programme
            and be part of shaping the standard.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/corporate-portal"
              className="font-mono text-[10px] font-bold text-white bg-aic-gold px-8 py-4 uppercase tracking-widest hover:bg-aic-gold/90 transition-colors"
            >
              Corporate Certification →
            </Link>
            <Link
              href="/professional-portal"
              className="font-mono text-[10px] font-bold text-white border border-white/20 px-8 py-4 uppercase tracking-widest hover:border-white transition-colors"
            >
              Professional Certification →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
