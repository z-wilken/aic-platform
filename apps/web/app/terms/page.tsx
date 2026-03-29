"use client";

import { motion } from "framer-motion";
import { FileText, Shield, Scale, AlertTriangle } from "lucide-react";

export default function TermsOfUse() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-aic-navy text-white py-20">
        <div className="max-w-[1600px] mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-aic-copper" />
              <span className="text-aic-copper text-sm uppercase tracking-widest font-medium">Agreement</span>
            </div>
            <h1 className="text-5xl mb-6 font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
              Terms of Use
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Standard operating terms for accessing AIC platforms, certification registries, and 
              intellectual property relating to the Declaration of Algorithmic Rights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-gray-500 mb-8 italic">Last Updated: February 27, 2026</p>
            
            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing the AIC Pulse platform or utilizing our certification services, you agree to 
              comply with these terms and all applicable laws and regulations. If you do not agree with these 
              terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-6">
              Permission is granted to temporarily download one copy of the materials (information or software) 
              on AIC's website for personal, non-commercial transitory viewing only. This is the grant of a 
              license, not a transfer of title.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-2">Certification Integrity</h3>
                  <p className="text-sm text-amber-800">
                    The use of AIC certification marks, logos, and badges is strictly reserved for organizations 
                    and individuals with active, verified certification status. Misrepresentation of certification 
                    is a violation of IAF accreditation requirements and may lead to legal action.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">3. Accuracy of Materials</h2>
            <p className="text-gray-600 mb-6">
              The materials appearing on AIC's website could include technical, typographical, or photographic 
              errors. AIC does not warrant that any of the materials on its website are accurate, complete, or 
              current. AIC may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">4. Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These terms and conditions are governed by and construed in accordance with the laws of 
              South Africa and the international requirements of the IAF MLA, and you irrevocably submit 
              to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
