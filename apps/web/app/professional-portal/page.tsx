'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const certificationPaths = [
  {
    code: 'AIC-AO',
    title: 'Accountability Officer',
    audience: 'Senior leaders, Chief AI Officers, Compliance Directors',
    description:
      'The flagship credential for executives responsible for AI governance at the organisational level. Covers risk management, regulatory compliance, and accountability architecture.',
    duration: '40 hours CPD',
    format: 'Online self-paced + proctored exam',
    prerequisites: '5+ years professional experience',
    outcomes: [
      'Design organisation-wide AI governance frameworks',
      'Oversee POPIA § 71 and ISO/IEC 42001 compliance',
      'Lead certification audit preparation',
      'Manage human-oversight escalation protocols',
    ],
    badge: 'AIC-AO',
    color: 'text-aic-gold',
    borderColor: 'border-aic-gold',
    bgColor: 'bg-aic-gold/5',
  },
  {
    code: 'AIC-TA',
    title: 'Technical Auditor',
    audience: 'ML Engineers, Data Scientists, AI Architects',
    description:
      'For technical practitioners who design, evaluate, and audit AI systems for accountability. Deep coverage of bias detection, explainability (SHAP/LIME), and hash-chain audit integrity.',
    duration: '60 hours CPD',
    format: 'Online + hands-on lab assessments',
    prerequisites: 'Technical degree or equivalent',
    outcomes: [
      'Conduct bias analysis using Four-Fifths Rule',
      'Implement SHAP/LIME explainability pipelines',
      'Verify SHA-256 audit chain integrity',
      'Design drift monitoring systems',
    ],
    badge: 'AIC-TA',
    color: 'text-aic-red',
    borderColor: 'border-aic-red',
    bgColor: 'bg-aic-red/5',
  },
  {
    code: 'AIC-CF',
    title: 'Compliance Facilitator',
    audience: 'Compliance Officers, Legal Professionals, HR Leaders',
    description:
      'Equips professionals to facilitate AI accountability within their function. Focused on policy, process design, employee rights, and the operational mechanics of human oversight.',
    duration: '30 hours CPD',
    format: 'Online self-paced + scenario exams',
    prerequisites: 'No prior AI experience required',
    outcomes: [
      'Map AI systems to POPIA and employment law',
      'Draft human oversight policies and procedures',
      'Manage correction request workflows',
      'Train staff on algorithmic rights',
    ],
    badge: 'AIC-CF',
    color: 'text-gray-500',
    borderColor: 'border-gray-400',
    bgColor: 'bg-gray-50',
  },
];

const faqs = [
  {
    q: 'How long does certification take?',
    a: 'The AIC-CF can be completed in 3–4 weeks at your own pace. AIC-AO typically takes 6–8 weeks, and AIC-TA 8–12 weeks due to the lab components.',
  },
  {
    q: 'Are credentials recognised internationally?',
    a: 'AIC personnel certifications are aligned with ISO/IEC 17024, the international standard for personnel certification bodies. We are pursuing IAF MLA accreditation for full global recognition.',
  },
  {
    q: 'What is the recertification requirement?',
    a: 'Credentials are valid for 3 years. Renewal requires 20 hours of CPD and a short recertification assessment. The AI governance landscape evolves rapidly — continuous learning is essential.',
  },
  {
    q: 'Can my organisation enrol multiple staff?',
    a: 'Yes. Corporate cohort pricing is available for organisations enrolling 5 or more candidates. Contact us to discuss volume licensing.',
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

export default function ProfessionalPortalPage() {
  return (
    <main className="min-h-screen bg-aic-paper">
      {/* Hero */}
      <section className="relative overflow-hidden py-32 bg-aic-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-bl from-aic-red/8 via-transparent to-transparent pointer-events-none"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6"
          >
            Professional Portal · ISO/IEC 17024 Personnel Certification
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-serif text-6xl md:text-7xl font-medium tracking-tight text-white leading-[0.95] max-w-3xl"
          >
            Become Certified <br />
            <span className="italic text-aic-gold font-normal">in AI Accountability.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 font-serif text-lg text-gray-300 max-w-xl leading-relaxed"
          >
            AIC professional credentials signal that you have the knowledge, skills, and
            competency to lead AI accountability within your organisation. Aligned with ISO/IEC
            17024 and globally recognised.
          </motion.p>
        </div>
      </section>

      {/* Credential Paths */}
      <section className="py-32 bg-aic-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
              Certification Paths
            </h2>
            <p className="font-serif text-4xl md:text-5xl font-medium text-aic-black tracking-tight leading-tight max-w-2xl">
              Three Credentials. <br />One Standard.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-aic-black/5 border border-aic-black/5"
          >
            {certificationPaths.map((path) => (
              <motion.div
                key={path.code}
                variants={itemVariants}
                className={`bg-aic-paper p-10 flex flex-col hover:bg-white transition-colors group`}
              >
                {/* Badge code */}
                <div className="flex justify-between items-start mb-8">
                  <span className={`font-mono text-xs font-bold ${path.color} border ${path.borderColor} px-3 py-1 uppercase tracking-widest`}>
                    {path.code}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-medium text-aic-black mb-2">{path.title}</h3>
                <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mb-6">
                  {path.audience}
                </p>
                <p className="font-serif text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                  {path.description}
                </p>

                {/* Meta */}
                <div className="space-y-3 border-t border-aic-black/5 pt-8 mb-8">
                  {[
                    { label: 'Duration', value: path.duration },
                    { label: 'Format', value: path.format },
                    { label: 'Prerequisites', value: path.prerequisites },
                  ].map((m) => (
                    <div key={m.label} className="flex justify-between items-start gap-4">
                      <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest shrink-0">
                        {m.label}
                      </span>
                      <span className="font-mono text-[10px] text-aic-black text-right">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Outcomes */}
                <div>
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block mb-4">
                    Learning Outcomes
                  </span>
                  <ul className="space-y-2">
                    {path.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 font-mono text-[10px] text-gray-500">
                        <span className={`w-1 h-1 ${path.color.replace('text-', 'bg-')} mt-1.5 shrink-0`} />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-aic-black/5">
                  <Link
                    href="/alpha"
                    className={`font-mono text-[10px] font-bold ${path.color} uppercase tracking-widest hover:underline`}
                  >
                    Register Interest →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Verification */}
      <section className="py-24 bg-white border-y border-aic-black/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
                Credential Verification
              </h2>
              <p className="font-serif text-4xl font-medium text-aic-black tracking-tight leading-tight mb-6">
                Verify Any <br />AIC Credential.
              </p>
              <p className="font-serif text-gray-500 text-lg leading-relaxed mb-8">
                Every AIC professional certificate is publicly verifiable. Share your credential
                ID and anyone can instantly confirm its authenticity, scope, and validity period.
              </p>
              <Link
                href="/verify"
                className="font-mono text-[10px] font-bold text-aic-black border border-aic-black px-8 py-4 uppercase tracking-widest hover:bg-aic-black hover:text-white transition-all inline-block"
              >
                Verify a Credential →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-aic-black/10 p-10 bg-aic-paper"
            >
              <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mb-6">
                Sample Certificate
              </p>
              <div className="border-l-4 border-aic-gold pl-6">
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2">
                  Credential
                </p>
                <p className="font-serif text-2xl font-medium text-aic-black mb-4">
                  AIC Accountability Officer
                </p>
                <p className="font-mono text-[9px] text-aic-gold uppercase tracking-widest">
                  AIC-AO-2026-00142
                </p>
              </div>
              <div className="mt-8 space-y-3">
                {[
                  { label: 'Issued', value: '25 February 2026' },
                  { label: 'Expires', value: '25 February 2029' },
                  { label: 'Status', value: 'Active' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">{r.label}</span>
                    <span className={`font-mono text-[10px] ${r.label === 'Status' ? 'text-green-600' : 'text-aic-black'}`}>
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-aic-paper">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">
              FAQs
            </h2>
            <p className="font-serif text-4xl font-medium text-aic-black tracking-tight">
              Common Questions.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-px border-t border-aic-black/5"
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                variants={itemVariants}
                className="py-8 border-b border-aic-black/5"
              >
                <h3 className="font-serif text-xl font-medium text-aic-black mb-4">{faq.q}</h3>
                <p className="font-serif text-gray-500 text-base leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
