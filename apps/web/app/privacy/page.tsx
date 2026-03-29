"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Globe, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-aic-navy text-white py-20">
        <div className="max-w-[1600px] mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-aic-copper" />
              <span className="text-aic-copper text-sm uppercase tracking-widest font-medium">Institutional Trust</span>
            </div>
            <h1 className="text-5xl mb-6 font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
              Privacy Policy
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              AIC is committed to the highest standards of data protection and privacy, ensuring the confidentiality of 
              institutional audit evidence and personal professional records.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-gray-500 mb-8 italic">Last Updated: February 27, 2026</p>
            
            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">1. Scope of Data Collection</h2>
            <p className="text-gray-600 mb-6">
              AIC collects data necessary for the execution of conformity assessments under ISO/IEC 42001 and 
              personnel certification under ISO/IEC 17024. This includes organizational governance documents, 
              bias audit metadata, and professional competency evidence.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <Eye className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="font-bold text-[#0f1f3d] mb-2">Transparency</h3>
                <p className="text-sm text-gray-600">We clearly disclose what data is required for certification and how it is utilized within our automated triage systems.</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                <Shield className="w-6 h-6 text-emerald-600 mb-3" />
                <h3 className="font-bold text-[#0f1f3d] mb-2">Security</h3>
                <p className="text-sm text-gray-600">All audit evidence is stored in encrypted vaults with strict role-based access control (RBAC) enforced via Sovereign Identity.</p>
              </div>
            </div>

            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">2. Institutional Data Handling</h2>
            <p className="text-gray-600 mb-6">
              Audit evidence provided through the Corporate Portal is processed via isolated agents. 
              AIC does not utilize client audit data to train generalized AI models. All data handling 
              is compliant with POPIA, GDPR, and the AIC Declaration of Algorithmic Rights.
            </p>

            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">3. Data Retention</h2>
            <p className="text-gray-600 mb-6">
              Records are maintained for the duration of the 3-year certification cycle plus an additional 
              year for regulatory compliance auditing, unless requested otherwise by the client organization 
              or required by law.
            </p>

            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">4. Contact Information</h2>
            <p className="text-gray-600 mb-6">
              For inquiries regarding data protection or to exercise your rights under our framework, 
              please contact our Data Protection Officer at <a href="mailto:privacy@aic-cert.org" className="text-aic-copper underline">privacy@aic-cert.org</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
