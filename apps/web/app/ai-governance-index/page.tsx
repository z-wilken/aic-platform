'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample index data — in production this would be fetched from the platform API
const indexEntries = [
  {
    rank: 1,
    name: 'Standard Bank Group',
    sector: 'Financial Services',
    tier: 'TIER 2',
    score: 94,
    systems: 12,
    certified: true,
    trend: '+3',
  },
  {
    rank: 2,
    name: 'Naspers / Prosus',
    sector: 'Technology',
    tier: 'TIER 2',
    score: 91,
    systems: 8,
    certified: true,
    trend: '+1',
  },
  {
    rank: 3,
    name: 'Discovery Limited',
    sector: 'Insurance / Healthcare',
    tier: 'TIER 2',
    score: 88,
    systems: 15,
    certified: true,
    trend: '0',
  },
  {
    rank: 4,
    name: 'Capitec Bank',
    sector: 'Financial Services',
    tier: 'TIER 2',
    score: 85,
    systems: 6,
    certified: false,
    trend: '+5',
  },
  {
    rank: 5,
    name: 'MultiChoice Group',
    sector: 'Media & Entertainment',
    tier: 'TIER 3',
    score: 81,
    systems: 9,
    certified: false,
    trend: '+2',
  },
  {
    rank: 6,
    name: 'Absa Group',
    sector: 'Financial Services',
    tier: 'TIER 2',
    score: 78,
    systems: 18,
    certified: false,
    trend: '-1',
  },
];

const maturityDimensions = [
  {
    dimension: 'Governance & Oversight',
    weight: '25%',
    description:
      'Board-level AI accountability, designated ownership, and escalation protocols for high-risk automated decisions.',
  },
  {
    dimension: 'Transparency & Disclosure',
    weight: '20%',
    description:
      'Public disclosure of AI system use, algorithmic impact assessments, and meaningful explanation capabilities.',
  },
  {
    dimension: 'Fairness & Bias Control',
    weight: '25%',
    description:
      'Bias testing methodology, protected attribute monitoring, and adherence to the Four-Fifths Rule.',
  },
  {
    dimension: 'Human Rights Preservation',
    weight: '20%',
    description:
      'Functional correction mechanisms, appeal process quality, and right to human review implementation.',
  },
  {
    dimension: 'Audit & Immutability',
    weight: '10%',
    description:
      'Integrity of audit logs, cryptographic hash chain verification, and audit trail completeness.',
  },
];

const tierColors: Record<string, string> = {
  'TIER 1': 'text-aic-red border-aic-red',
  'TIER 2': 'text-aic-gold border-aic-gold',
  'TIER 3': 'text-gray-500 border-gray-400',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function AIGovernanceIndexPage() {
  return (
    <main className="min-h-screen bg-aic-paper">
      {/* Hero */}
      <section className="relative overflow-hidden py-32 bg-aic-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-aic-gold/5 to-transparent pointer-events-none"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6"
          >
            AI Governance Index · Updated Q1 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-7xl font-medium tracking-tight text-white leading-[0.95] max-w-3xl"
          >
            AI Maturity <br />
            <span className="italic text-aic-gold font-normal">Rankings.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 font-serif text-lg text-gray-300 max-w-xl leading-relaxed"
          >
            The AIC Governance Index ranks South Africa&apos;s largest organisations by the maturity
            of their AI accountability practices — from board-level governance to technical bias
            controls and human oversight mechanisms.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex gap-12"
          >
            {[
              { label: 'Organisations tracked', value: '247' },
              { label: 'Certified', value: '38' },
              { label: 'Avg. maturity score', value: '61/100' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl font-medium text-white">{s.value}</p>
                <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rankings Table */}
      <section className="py-32 bg-aic-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
                Index Rankings
              </h2>
              <p className="font-serif text-4xl font-medium text-aic-black tracking-tight leading-tight">
                Top Organisations <br />by AI Maturity Score.
              </p>
            </div>
            <Link
              href="/registry"
              className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-aic-black transition-colors border-b border-gray-300 pb-1 self-start"
            >
              Full Public Registry →
            </Link>
          </motion.div>

          {/* Table header */}
          <div className="hidden md:grid grid-cols-[3rem_1fr_1fr_auto_auto_auto_auto] gap-6 px-6 mb-4">
            {['Rank', 'Organisation', 'Sector', 'Tier', 'Score', 'Systems', 'Status'].map((h) => (
              <span key={h} className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                {h}
              </span>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border-t border-aic-black/5"
          >
            {indexEntries.map((entry) => (
              <motion.div
                key={entry.rank}
                variants={itemVariants}
                className="group grid grid-cols-1 md:grid-cols-[3rem_1fr_1fr_auto_auto_auto_auto] gap-4 md:gap-6 items-center px-6 py-6 border-b border-aic-black/5 hover:bg-white transition-colors"
              >
                <span className="font-mono text-sm font-bold text-gray-300">
                  {String(entry.rank).padStart(2, '0')}
                </span>
                <span className="font-serif text-base font-medium text-aic-black">{entry.name}</span>
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                  {entry.sector}
                </span>
                <span className={`font-mono text-[9px] font-bold border px-2 py-0.5 uppercase tracking-wider self-center ${tierColors[entry.tier] ?? 'text-gray-500 border-gray-400'}`}>
                  {entry.tier}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 bg-aic-black/10 rounded-full overflow-hidden hidden md:block">
                    <div
                      className="h-full bg-aic-gold rounded-full"
                      style={{ width: `${entry.score}%` }}
                    />
                  </div>
                  <span className="font-mono text-sm font-bold text-aic-black">{entry.score}</span>
                </div>
                <span className="font-mono text-[10px] text-gray-500">{entry.systems} systems</span>
                <div className="flex items-center gap-2">
                  {entry.certified ? (
                    <span className="font-mono text-[9px] font-bold text-green-600 uppercase tracking-wider">
                      Certified
                    </span>
                  ) : (
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">
                      Unverified
                    </span>
                  )}
                  <span className={`font-mono text-[9px] ${entry.trend.startsWith('+') ? 'text-green-500' : entry.trend.startsWith('-') ? 'text-aic-red' : 'text-gray-400'}`}>
                    {entry.trend !== '0' ? entry.trend : '—'}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-32 bg-white border-y border-aic-black/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
              Methodology
            </h2>
            <p className="font-serif text-4xl md:text-5xl font-medium text-aic-black tracking-tight leading-tight max-w-2xl">
              How We Score <br />AI Maturity.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-aic-black/5 border border-aic-black/5"
          >
            {maturityDimensions.map((dim) => (
              <motion.div
                key={dim.dimension}
                variants={itemVariants}
                className="bg-white p-10 hover:bg-aic-paper transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs font-bold text-aic-gold">{dim.weight}</span>
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                    Weight
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium text-aic-black mb-4">
                  {dim.dimension}
                </h3>
                <p className="font-serif text-sm text-gray-500 leading-relaxed">{dim.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 font-mono text-[9px] text-gray-400 max-w-2xl leading-relaxed"
          >
            Scores are derived from public disclosures, regulatory filings, AIC audit data (where
            organisations are certified), and AIC&apos;s proprietary assessment questionnaire. Unverified
            organisations are scored on publicly available information only. AIC is not liable for
            errors in self-reported data.
          </motion.p>
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
            Get Your Organisation Indexed.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-gray-400 text-lg mb-12 max-w-lg mx-auto"
          >
            Certified organisations receive a verified score, detailed maturity breakdown, and
            the AIC TrustBadge — the mark of AI accountability leadership.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/corporate-portal"
              className="font-mono text-[10px] font-bold text-aic-black bg-aic-gold px-10 py-4 uppercase tracking-widest hover:bg-aic-gold/90 transition-colors"
            >
              Get Certified →
            </Link>
            <Link
              href="/registry"
              className="font-mono text-[10px] font-bold text-white border border-white/20 px-10 py-4 uppercase tracking-widest hover:border-white transition-colors"
            >
              Browse Full Registry
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
