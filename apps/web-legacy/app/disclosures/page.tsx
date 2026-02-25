'use client';

import { motion } from 'framer-motion';

const disclosures = [
  {
    category: 'Impartiality',
    title: 'Impartiality Policy',
    lastUpdated: 'January 2026',
    summary:
      'AIC is committed to impartiality in all certification activities. This policy governs the management of conflicts of interest, independence of certification decisions, and the separation of certification from consulting or training activities.',
    items: [
      'Certification decisions are made by trained assessors independent of the applicant organisation.',
      'AIC does not provide consultancy, implementation, or AI development services to any organisation it certifies.',
      'All assessors complete annual conflict-of-interest declarations.',
      'The Impartiality Committee meets quarterly to review and manage threats to impartiality.',
    ],
  },
  {
    category: 'Governance',
    title: 'Governance Structure',
    lastUpdated: 'January 2026',
    summary:
      'AIC operates as an independent certification body. Our governance structure is designed to prevent commercial interests from influencing certification outcomes.',
    items: [
      'An independent Impartiality Committee with representation from civil society, industry, and academia.',
      'The Certification Committee is the sole authority for issuing, suspending, or withdrawing certificates.',
      'Advisory Board members are prohibited from participating in individual certification decisions.',
      'Annual governance reports are published on this page.',
    ],
  },
  {
    category: 'Accreditation',
    title: 'Accreditation Status',
    lastUpdated: 'February 2026',
    summary:
      'AIC is pursuing formal accreditation under the international framework for personnel (ISO/IEC 17024) and management system (ISO/IEC 17021) certification bodies.',
    items: [
      'ISO/IEC 17024 (Personnel Certification) — Application submitted, assessment pending.',
      'ISO/IEC 17021 (Management System Certification) — Scoping phase.',
      'IAF MLA alignment — Targeted for completion Q4 2026.',
      'SANAS (South Africa) — Initial engagement completed.',
    ],
  },
  {
    category: 'Complaints',
    title: 'Complaints & Appeals',
    lastUpdated: 'January 2026',
    summary:
      'AIC operates a formal complaints and appeals process available to any party affected by a certification decision or conduct of AIC personnel.',
    items: [
      'Complaints must be submitted in writing within 30 days of the matter arising.',
      'An initial response is provided within 5 working days.',
      'Appeals against certification decisions are heard by the independent Appeals Panel.',
      'The appeals process is free of charge to the appellant.',
    ],
  },
  {
    category: 'Fees',
    title: 'Fee Schedule & Transparency',
    lastUpdated: 'February 2026',
    summary:
      'AIC publishes its fee schedule for all certification activities. Fees are structured to be proportionate to the scope and complexity of the certification.',
    items: [
      'Corporate certification fees are available on request from the Corporate Portal.',
      'Professional credential fees are listed on the Professional Portal.',
      'No certification decision is contingent on fee payment beyond the application stage.',
      'Waiver provisions exist for qualifying non-profit and public sector organisations.',
    ],
  },
  {
    category: 'Privacy',
    title: 'Privacy & Data Handling',
    lastUpdated: 'January 2026',
    summary:
      'AIC processes personal data as required for certification activities in compliance with the Protection of Personal Information Act (POPIA).',
    items: [
      'Personal data is collected only for purposes directly related to certification.',
      'Data retention periods are published in our full privacy notice.',
      'Individuals have the right to access, correct, and request deletion of their personal data.',
      'AIC does not sell or license personal data to third parties.',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-aic-paper">
      {/* Hero */}
      <section className="py-32 bg-aic-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-6"
          >
            Disclosures · Impartiality & Accreditation Directory
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-7xl font-medium tracking-tight text-white leading-[0.95] max-w-3xl"
          >
            Transparency <br />
            <span className="italic text-aic-gold font-normal">by Default.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 font-serif text-lg text-gray-300 max-w-xl leading-relaxed"
          >
            AIC holds itself to the same standard it certifies others against. This page contains
            all required public disclosures for an accredited certification body — our impartiality
            policy, governance structure, accreditation status, and complaints process.
          </motion.p>
        </div>
      </section>

      {/* Status bar */}
      <div className="bg-white border-b border-aic-black/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-8">
            {[
              { label: 'Impartiality Committee', status: 'Active' },
              { label: 'Certification Body', status: 'Operating' },
              { label: 'SANAS Engagement', status: 'In progress' },
              { label: 'ISO 17024 Application', status: 'Submitted' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                  {s.label}:
                </span>
                <span className="font-mono text-[9px] font-bold text-aic-black uppercase tracking-widest">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclosures */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-px border-t border-aic-black/5"
          >
            {disclosures.map((doc) => (
              <motion.div
                key={doc.category}
                variants={itemVariants}
                className="group bg-aic-paper hover:bg-white transition-colors border-b border-aic-black/5 p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
                  {/* Left meta */}
                  <div>
                    <span className="font-mono text-[9px] font-bold text-aic-gold uppercase tracking-widest block mb-3">
                      {doc.category}
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-aic-black mb-3">
                      {doc.title}
                    </h3>
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                      Updated: {doc.lastUpdated}
                    </span>
                  </div>

                  {/* Right content */}
                  <div>
                    <p className="font-serif text-gray-600 text-base leading-relaxed mb-8">
                      {doc.summary}
                    </p>
                    <ul className="space-y-3">
                      {doc.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 font-serif text-sm text-gray-500 leading-relaxed">
                          <span className="w-1 h-1 bg-aic-gold mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-white border-t border-aic-black/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-3xl font-medium text-aic-black mb-4">
                Request Additional Disclosures
              </h2>
              <p className="font-serif text-gray-500 leading-relaxed mb-6">
                If you require any information not published on this page, or wish to submit a
                formal complaint or appeal, please contact the AIC Secretariat.
              </p>
              <a
                href="mailto:disclosures@aic.co.za"
                className="font-mono text-[10px] font-bold text-aic-black border-b border-aic-black pb-1 hover:text-aic-gold hover:border-aic-gold transition-colors uppercase tracking-widest"
              >
                disclosures@aic.co.za
              </a>
            </div>
            <div className="border-l border-aic-black/5 pl-16">
              <h3 className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mb-6">
                Registered Body Details
              </h3>
              <div className="space-y-4 font-mono text-[10px] text-gray-500">
                <div>
                  <span className="text-aic-black block">AI Integrity Certification (Pty) Ltd</span>
                  <span>Registration No. (Pending)</span>
                </div>
                <div>
                  <span className="block">Sandton, Gauteng</span>
                  <span>South Africa</span>
                </div>
                <div>
                  <span className="block font-bold text-aic-black">POPIA Information Officer</span>
                  <a href="mailto:popia@aic.co.za" className="hover:text-aic-black transition-colors">
                    popia@aic.co.za
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
