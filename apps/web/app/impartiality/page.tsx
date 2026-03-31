"use client";

import { motion } from "framer-motion";
import { Shield, Scale, CheckCircle, AlertCircle, Download, ExternalLink } from "lucide-react";

export default function ImpartialityStatement() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero */}
      <section className="bg-aic-navy text-white py-24 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-aic-copper" />
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono font-bold">Regulatory Requirement</span>
            </div>
            <h1 className="text-5xl mb-6 font-serif italic">
              Statement of Impartiality
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Maintaining independence, objectivity, and freedom from conflicts of interest is the foundation 
              of trust in the AI Integrity Certification (Pty) Ltd process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-aic prose-lg max-w-none">
            <p className="text-gray-400 mb-8 italic font-mono text-sm uppercase tracking-widest">Last Updated: February 2026</p>
            
            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">Institutional Independence</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              AI Integrity Certification (Pty) Ltd is committed to impartiality in all its certification activities. 
              As a South African benchmark for human accountability, we maintain strict objectivity in managing 
              conflicts of interest and ensuring the integrity of our assessments.
            </p>

            <div className="bg-aic-paper border border-gray-100 rounded-2xl p-10 my-12 shadow-sm">
              <div className="flex items-start gap-6">
                <AlertCircle className="w-8 h-8 text-aic-copper shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-aic-navy mb-4 font-serif text-xl">Our Conflict Prohibitions</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Per our accreditation roadmap and POPIA Section 71 requirements, AIC prohibits its personnel from:
                  </p>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-aic-copper shrink-0 mt-0.5" />
                        <span>Providing consultancy services to organisations seeking certification.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-aic-copper shrink-0 mt-0.5" />
                        <span>Auditing their own work or that of their recent employers (within 2 years).</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-aic-copper shrink-0 mt-0.5" />
                        <span>Accepting gifts or inducements from certification candidates.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-aic-copper shrink-0 mt-0.5" />
                        <span>Participating in decision-making for candidates they have trained.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">Objective Decision Making</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              AIC certification decisions are based on objective evidence obtained through a fair, valid, 
              and reliable assessment process. Decisions are made by competent personnel who have not participated 
              in the assessment of the candidate.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              {[
                { title: "Risk Identification", desc: "Ongoing identification of threats to impartiality arising from its activities or relationships." },
                { title: "Public Disclosure", desc: "Full transparency regarding certification processes and impartiality safeguards via the Pulse Registry." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-aic-copper/30 transition-colors">
                  <Scale className="w-6 h-6 text-aic-copper mb-4" />
                  <h4 className="font-bold text-aic-navy mb-2 font-serif text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-12 border-t border-aic-paper flex flex-wrap gap-4">
              <button className="bg-aic-navy text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest font-mono hover:bg-aic-navy-mid transition-all shadow-lg shadow-aic-navy/10 flex items-center gap-2">
                <Download className="w-4 h-4" /> Download Full Policy
              </button>
              <a 
                href="https://www.sanas.co.za" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-aic-navy text-aic-navy px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest font-mono hover:bg-aic-paper transition-all"
              >
                <ExternalLink className="w-4 h-4" /> SANAS Requirements
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
