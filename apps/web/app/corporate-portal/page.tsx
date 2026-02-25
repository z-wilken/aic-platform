'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const certificationSteps = [
  {
    step: '01',
    title: 'Self-Assessment',
    duration: '2–4 weeks',
    description:
      'Complete the AIC self-assessment diagnostic to map your AI systems against the 5 Algorithmic Rights and identify your applicable certification tier.',
    actions: ['AI inventory mapping', 'Risk classification by system', 'Gap analysis report'],
  },
  {
    step: '02',
    title: 'Evidence Submission',
    duration: '4–8 weeks',
    description:
      'Submit structured evidence packages demonstrating human oversight mechanisms, explanation capabilities, and correction pathways for each certified system.',
    actions: ['Policy documentation upload', 'Technical architecture review', 'Audit log samples'],
  },
  {
    step: '03',
    title: 'AIC Audit',
    duration: '3–6 weeks',
    description:
      'Our certified auditors conduct an independent review of your evidence. For Tier 1 systems, this includes on-site observation of human-in-the-loop processes.',
    actions: ['Document review', 'Technical interrogation', 'Stakeholder interviews'],
  },
  {
    step: '04',
    title: 'Certification Decision',
    duration: '2 weeks',
    description:
      'The AIC Certification Committee issues a binding decision. Successful certifications receive a dated certificate, TrustBadge, and entry in the public registry.',
    actions: ['Committee deliberation', 'Certificate issuance', 'Public registry listing'],
  },
  {
    step: '05',
    title: 'Continuous Monitoring',
    duration: 'Ongoing',
    description:
      'AIC Pulse provides continuous governance telemetry between audit cycles. Automated alerts flag drift, new system deployments, or compliance gaps.',
    actions: ['AIC Pulse dashboard', 'Drift alerts', 'Annual recertification'],
  },
];

const tiers = [
  {
    id: 'TIER 1',
    name: 'Critical Accountability',
    riskLevel: 'Critical Risk',
    color: 'text-aic-red',
    borderColor: 'border-aic-red',
    examples: ['Clinical diagnosis systems', 'Parole & sentencing tools', 'Child welfare decisions'],
    oversight: '100% human approval required',
    auditCycle: 'Annual + continuous',
    scope: 'All consequential decisions individually reviewed and overridable by a qualified human.',
  },
  {
    id: 'TIER 2',
    name: 'Elevated Supervision',
    riskLevel: 'Elevated Risk',
    color: 'text-aic-gold',
    borderColor: 'border-aic-gold',
    examples: ['Credit scoring systems', 'Resume screening tools', 'Insurance underwriting'],
    oversight: 'Human supervision with override',
    auditCycle: 'Annual',
    scope: 'Statistical sampling with human review; override mechanism mandated for all flagged outcomes.',
  },
  {
    id: 'TIER 3',
    name: 'Standard Governance',
    riskLevel: 'Standard Risk',
    color: 'text-gray-500',
    borderColor: 'border-gray-300',
    examples: ['Content recommendation', 'Spam filtering', 'Fraud scoring (low value)'],
    oversight: 'Periodic monitoring',
    auditCycle: 'Biennial',
    scope: 'Aggregate performance monitoring, annual model validation, public disclosure of system use.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function CorporatePortalPage() {
  return (
    <main className="min-h-screen bg-aic-paper">
      {/* Hero */}
      <section className="relative overflow-hidden py-32 bg-aic-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-tr from-aic-gold/8 via-transparent to-transparent pointer-events-none"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6"
          >
            Corporate Portal · ISO/IEC 42001 Certification
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-serif text-6xl md:text-7xl font-medium tracking-tight text-white leading-[0.95] max-w-3xl"
          >
            Certify Your <br />
            <span className="italic text-aic-gold font-normal">AI Accountability.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 font-serif text-lg text-gray-300 max-w-xl leading-relaxed"
          >
            The AIC Corporate Certification programme validates your organisation&apos;s AI
            governance against ISO/IEC 42001, POPIA Section 71, and the Declaration of Algorithmic
            Rights. De-risk your automated decision systems and earn the AIC TrustBadge.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/alpha"
              className="font-mono text-[10px] font-bold text-aic-black bg-aic-gold px-8 py-4 uppercase tracking-widest hover:bg-aic-gold/90 transition-colors self-start"
            >
              Apply for Alpha →
            </Link>
            <Link
              href="/assessment"
              className="font-mono text-[10px] font-bold text-white border border-white/20 px-8 py-4 uppercase tracking-widest hover:border-white transition-colors self-start"
            >
              Self-Assessment →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Three-Tier Model */}
      <section className="py-32 bg-aic-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
              Certification Framework
            </h2>
            <p className="font-serif text-4xl md:text-5xl font-medium text-aic-black tracking-tight leading-tight max-w-2xl">
              Three Tiers. <br />Proportional Oversight.
            </p>
            <p className="mt-6 font-serif text-gray-500 text-lg max-w-xl leading-relaxed">
              AIC maps the level of required human accountability to the potential impact of the
              automated decision. The higher the consequence, the more stringent the certification.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-aic-black/5 border border-aic-black/5"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.id}
                variants={itemVariants}
                className="bg-aic-paper p-10 flex flex-col hover:bg-white transition-colors group"
              >
                <div className="flex justify-between items-start mb-10">
                  <span className={`font-mono text-xs font-bold ${tier.color} uppercase tracking-widest`}>
                    {tier.id}
                  </span>
                  <span className={`font-mono text-[9px] ${tier.color} border ${tier.borderColor} px-2 py-0.5 uppercase tracking-wider`}>
                    {tier.riskLevel}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-medium text-aic-black mb-4">{tier.name}</h3>
                <p className="font-serif text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                  {tier.scope}
                </p>
                <div className="space-y-4 border-t border-aic-black/5 pt-8">
                  <div>
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block mb-2">
                      Human Oversight
                    </span>
                    <span className={`font-mono text-[10px] font-bold ${tier.color}`}>
                      {tier.oversight}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block mb-2">
                      Audit Cycle
                    </span>
                    <span className="font-mono text-[10px] font-bold text-aic-black">
                      {tier.auditCycle}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block mb-3">
                      Example Systems
                    </span>
                    <ul className="space-y-1.5">
                      {tier.examples.map((ex) => (
                        <li key={ex} className="flex items-center gap-2 font-mono text-[10px] text-gray-500">
                          <span className="w-1 h-1 bg-aic-black/20 rounded-full" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              href="/tiers"
              className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-aic-black transition-colors border-b border-gray-300 pb-1"
            >
              Full Framework Documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-32 bg-white border-y border-aic-black/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
              The Process
            </h2>
            <p className="font-serif text-4xl md:text-5xl font-medium text-aic-black tracking-tight leading-tight max-w-2xl">
              From Assessment <br />to Certificate.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-px border-t border-aic-black/5"
          >
            {certificationSteps.map((s) => (
              <motion.div
                key={s.step}
                variants={itemVariants}
                className="group flex flex-col md:flex-row gap-8 md:gap-16 py-10 border-b border-aic-black/5 hover:bg-aic-paper px-4 -mx-4 transition-colors"
              >
                <div className="md:w-20 shrink-0 flex items-start">
                  <span className="font-mono text-2xl font-bold text-aic-gold">{s.step}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h3 className="font-serif text-xl font-medium text-aic-black">{s.title}</h3>
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                      {s.duration}
                    </span>
                  </div>
                  <p className="font-serif text-gray-500 text-sm leading-relaxed mb-6">
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {s.actions.map((a) => (
                      <span
                        key={a}
                        className="font-mono text-[9px] text-gray-500 border border-aic-black/10 px-3 py-1 uppercase tracking-wider"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
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
            Ready to Certify?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-gray-400 text-lg mb-12 max-w-lg mx-auto"
          >
            Join AIC Alpha — our founding cohort of organisations shaping the standard for AI
            accountability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/alpha"
              className="font-mono text-[10px] font-bold text-aic-black bg-aic-gold px-10 py-4 uppercase tracking-widest hover:bg-aic-gold/90 transition-colors"
            >
              Apply for Alpha →
            </Link>
            <Link
              href="/contact"
              className="font-mono text-[10px] font-bold text-white border border-white/20 px-10 py-4 uppercase tracking-widest hover:border-white transition-colors"
            >
              Speak to an Advisor
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
