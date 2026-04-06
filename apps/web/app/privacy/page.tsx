"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Globe, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero */}
      <section className="bg-aic-navy text-white py-24 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-aic-copper" />
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono font-bold">Institutional Trust</span>
            </div>
            <h1 className="text-5xl mb-6 font-serif italic">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              AI Integrity Certification (Pty) Ltd is committed to the highest standards of data protection, 
              ensuring the confidentiality of institutional audit evidence and personal records.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-aic prose-lg max-w-none">
            <p className="text-gray-400 mb-8 italic font-mono text-sm uppercase tracking-widest">Last Updated: February 2026</p>
            
            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">1. Scope of Data Collection</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              AIC collects data necessary for the execution of conformity assessments and personnel certification. 
              This includes organisational governance documents, bias audit metadata, and professional competency evidence 
              required for POPIA Section 71 compliance verification.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="p-8 bg-aic-paper rounded-2xl border border-gray-100 shadow-sm">
                <Eye className="w-6 h-6 text-aic-copper mb-4" />
                <h3 className="font-bold text-aic-navy mb-2 font-serif text-lg">Transparency</h3>
                <p className="text-sm text-gray-600 leading-relaxed">We clearly disclose what data is required for certification and how it is utilized within our automated triage systems.</p>
              </div>
              <div className="p-8 bg-aic-paper rounded-2xl border border-gray-100 shadow-sm">
                <Shield className="w-6 h-6 text-aic-copper mb-4" />
                <h3 className="font-bold text-aic-navy mb-2 font-serif text-lg">Security</h3>
                <p className="text-sm text-gray-600 leading-relaxed">All audit evidence is stored in encrypted vaults with strict role-based access control (RBAC) enforced via institutional credentials.</p>
              </div>
            </div>

            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">2. Institutional Data Handling</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Audit evidence provided through the Corporate Portal is processed via isolated agents. 
              AIC does not utilize client audit data to train generalized AI models. All data handling 
              is compliant with POPIA (South Africa) and the AIC Declaration of Algorithmic Rights.
            </p>

            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">3. Data Retention</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Records are maintained for the duration of the certification cycle plus an additional 
              period for regulatory compliance auditing, unless requested otherwise by the client organisation 
              or required by South African law.
            </p>

            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">4. Contact Information</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              For inquiries regarding data protection or to exercise your rights under POPIA, 
              please contact our Information Officer at <a href="mailto:integrity@aiccertified.cloud" className="text-aic-copper underline font-bold">integrity@aiccertified.cloud</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
