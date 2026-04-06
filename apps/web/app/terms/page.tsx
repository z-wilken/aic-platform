"use client";

import { motion } from "framer-motion";
import { FileText, Shield, Scale, AlertTriangle } from "lucide-react";

export default function TermsOfUse() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero */}
      <section className="bg-aic-navy text-white py-24 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-aic-copper" />
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono font-bold">Agreement</span>
            </div>
            <h1 className="text-5xl mb-6 font-serif italic">
              Terms of Use
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Standard operating terms for accessing the Pulse platform, certification registries, and 
              intellectual property relating to the Declaration of Algorithmic Rights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-aic prose-lg max-w-none">
            <p className="text-gray-400 mb-8 italic font-mono text-sm uppercase tracking-widest">Last Updated: February 2026</p>
            
            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              By accessing the AI Integrity Certification (Pty) Ltd (AIC) platforms or utilizing our certification services, 
              you agree to comply with these terms and all applicable laws and regulations in South Africa. 
              If you do not agree with these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">2. Use License</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) 
              on AIC's website for personal, non-commercial transitory viewing only. This is the grant of a 
              license, not a transfer of title.
            </p>

            <div className="bg-aic-paper border border-aic-copper/20 rounded-2xl p-10 my-12 shadow-sm">
              <div className="flex items-start gap-6">
                <AlertTriangle className="w-8 h-8 text-aic-copper shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-aic-navy mb-4 font-serif text-xl">Certification Integrity</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The use of AIC certification marks, logos, and badges is strictly reserved for organisations 
                    and individuals with active, verified certification status. Misrepresentation of certification 
                    is a violation of our accreditation roadmap and POPIA Section 71 requirements and may lead to legal action.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">3. Accuracy of Materials</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              The materials appearing on AIC's website could include technical, typographical, or photographic 
              errors. AIC does not warrant that any of the materials on its website are accurate, complete, or 
              current. AIC may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2 className="text-aic-navy font-serif italic text-3xl mb-6">4. Governing Law</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of 
              South Africa, and you irrevocably submit to the exclusive jurisdiction of the courts in the 
              Republic of South Africa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
