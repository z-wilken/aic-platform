"use client";

import { motion } from "framer-motion";
import { Shield, Scale, CheckCircle, AlertCircle, Download, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function ImpartialityStatement() {
  const handleDownload = () => {
    toast.success("Downloading AIC Impartiality Policy v2.1 (Full PDF)");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-aic-navy text-white py-20">
        <div className="max-w-[1600px] mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-aic-copper" />
              <span className="text-aic-copper text-sm uppercase tracking-widest font-medium">ISO/IEC 17011 Requirement</span>
            </div>
            <h1 className="text-5xl mb-6 font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
              Statement of Impartiality
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Maintaining independence, objectivity, and freedom from conflicts of interest is the foundation 
              of trust in the AIC certification process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-gray-500 mb-8 italic">Last Updated: February 1, 2026</p>
            
            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">Institutional Independence</h2>
            <p className="text-gray-600 mb-6">
              The AI Certification Institute (AIC) is committed to impartiality in all its certification activities. 
              We understand the importance of impartiality in carrying out our certification activities, managing 
              conflicts of interest, and ensuring the objectivity of our certification activities.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 my-10">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-2">Our Conflict Prohibitions</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Per ISO/IEC 42001 and 17024 requirements, AIC prohibits its personnel from:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-amber-800 list-disc list-inside">
                    <li>Providing consultancy services to organizations seeking certification.</li>
                    <li>Auditing their own work or that of their recent employers (within 2 years).</li>
                    <li>Accepting gifts or inducements from certification candidates.</li>
                    <li>Participating in decision-making for candidates they have trained.</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-[#0f1f3d] font-bold text-2xl mb-4">Objective Decision Making</h2>
            <p className="text-gray-600 mb-6">
              AIC certification decisions are based on objective evidence obtained through a fair, valid, 
              and reliable assessment process. Decisions are made by competent personnel who have not participated 
              in the assessment of the candidate.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              {[
                { title: "Risk Identification", desc: "Ongoing identification of threats to impartiality arising from its activities or relationships." },
                { title: "Public Disclosure", desc: "Transparency regarding certification processes and impartiality safeguards." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-green-600 mb-3" />
                  <h4 className="font-bold text-[#0f1f3d] mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-gray-200 flex flex-wrap gap-4">
              <Button 
                onClick={handleDownload}
                className="bg-[#0f1f3d] hover:bg-[#1a3160] text-white px-6"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Full Policy
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.iaf.nu" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  IAF Impartiality Requirements
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
