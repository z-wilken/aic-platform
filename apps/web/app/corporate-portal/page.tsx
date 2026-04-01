"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle, FileText, Download, ArrowRight, Building2, Clock, BarChart3, Zap, Globe, Lock, Search } from "lucide-react";

// D-11: Hero background
const heroBg = "https://images.unsplash.com/photo-1771931322109-180bb1b35bf8?q=80&w=2000&auto=format&fit=crop";

// D-5: Update pricing to ZAR and Founding Partner focus
const certificationTiers = [
  {
    tier: "Founding Partner",
    code: "POPIA Section 71 Aligned",
    price: "R 2,500",
    duration: "4–8 weeks",
    color: "#c87941",
    featured: true,
    features: [
      "POPIA Section 71 Gap Analysis",
      "Human-in-the-loop Workflow Audit",
      "Algorithmic Rights Readiness Score",
      "Founding Partner Badge & Kit",
      "Free Upgrade to SANAS Certification",
      "Locked Lifetime Pricing",
    ],
    audience: "First 5 South African organisations",
  },
  {
    tier: "Professional",
    code: "ISO/IEC 42001 – Standard",
    price: "Custom",
    duration: "8–12 weeks",
    color: "#0a1628",
    features: [
      "Full AIMS Implementation Audit",
      "Risk Treatment Plan Development",
      "ISO/IEC 42001 Readiness Review",
      "NIST AI RMF Cross-Mapping",
      "Annual Integrity Benchmarking",
    ],
    audience: "Enterprises deploying AI at scale",
  },
  {
    tier: "Enterprise",
    code: "Multi-site Group Audit",
    price: "Custom",
    duration: "12–24 weeks",
    color: "#0f2044",
    features: [
      "Multi-jurisdictional Compliance",
      "Board-level AI Governance Review",
      "Dedicated Certification Manager",
      "White-glove Appeals Management",
      "JSE Top 40 Index Priority Listing",
    ],
    audience: "Large conglomerates and groups",
  },
];

const riskTemplates = [
  { title: "POPIA Section 71 Checklist", desc: "Mandatory controls for automated decision-making under South African law.", type: "PDF / Word", size: "142 KB" },
  { title: "AI Risk Register Template", desc: "Comprehensive risk register aligned to ISO/IEC 42001 Annex A controls.", type: "Excel", size: "248 KB" },
  { title: "Human Agency SOP Template", desc: "Standard operating procedures for human intervention in AI systems.", type: "Word", size: "86 KB" },
  { title: "Empathy Audit Framework", desc: "AIC's proprietary methodology for auditing automated communication tone.", type: "PDF", size: "312 KB" },
];

const Badge = ({ children, className }: any) => (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${className}`}>
      {children}
    </span>
);

export default function CorporatePortal() {
  const [activeTab, setActiveTab] = useState<"certification" | "gap" | "templates">("certification");
  const [selectedRole, setSelectedRole] = useState<"Provider" | "Deployer" | "Integrator" | null>(null);

  return (
    <div className="font-sans bg-white">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-aic-navy">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-aic-navy via-aic-navy/80 to-transparent" />
        <div className="relative max-w-[1600px] mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-aic-copper" />
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono">Corporate Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-white mb-6 font-serif italic">
              Certify Your<br />
              <span className="text-aic-copper">AI Integrity</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mb-10 leading-relaxed">
              AI Integrity Certification (Pty) Ltd provides the benchmark for human accountability. 
              Move beyond ethics guidelines to verified POPIA Section 71 compliance.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab("certification")}
                className="bg-aic-copper text-white px-8 py-4 rounded-lg text-sm font-bold hover:bg-aic-copper/90 transition-all shadow-lg shadow-aic-copper/20 uppercase tracking-widest font-mono flex items-center gap-2"
              >
                Certification Tiers <ArrowRight className="w-4 h-4" />
              </button>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3 text-white/60 text-xs backdrop-blur-sm">
                <Lock className="w-4 h-4 text-aic-copper" />
                <p><strong>Secure Evidence:</strong> Audit data remains in your environment via isolated agents.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="bg-white border-b border-aic-paper sticky top-20 z-40">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto py-4">
            {[
              { id: "certification", label: "Certification", icon: Shield },
              { id: "gap", label: "Gap Analysis", icon: BarChart3 },
              { id: "templates", label: "Risk Templates", icon: FileText },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-2 py-2 text-xs font-bold uppercase tracking-widest transition-all font-mono border-b-2 ${
                  activeTab === id
                    ? "border-aic-copper text-aic-navy"
                    : "border-transparent text-gray-400 hover:text-aic-navy"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 py-24">
        {/* Certification Services */}
        {activeTab === "certification" && (
          <div>
            <div className="text-center mb-16">
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono font-bold">Regulatory Framework</span>
              <h2 className="text-4xl text-aic-navy mt-4 mb-4 font-serif italic">
                Accountability Certification
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Join the first South African organisations to prove human accountability in automated systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificationTiers.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative border rounded-2xl overflow-hidden bg-white ${tier.featured ? "border-aic-copper shadow-2xl scale-105 z-10" : "border-gray-100 shadow-sm"}`}
                >
                  {tier.featured && (
                    <div className="bg-aic-copper text-white text-center py-2 text-[10px] font-bold uppercase tracking-widest">
                      Limited Founding Program
                    </div>
                  )}
                  <div className="p-8">
                    <div className="text-[10px] uppercase tracking-widest text-aic-copper font-mono font-bold mb-2">{tier.code}</div>
                    <h3 className="text-2xl font-bold text-aic-navy mb-4 font-serif">{tier.tier}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-aic-navy font-mono">{tier.price}</span>
                        {tier.price !== "Custom" && <span className="text-gray-400 text-sm">/month</span>}
                    </div>
                    
                    <ul className="space-y-4 mb-10 border-t border-aic-paper pt-6">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-aic-copper shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest font-mono transition-all ${
                        tier.featured ? "bg-aic-navy text-white hover:bg-aic-navy-mid" : "border-2 border-aic-navy text-aic-navy hover:bg-aic-paper"
                      }`}
                    >
                      {tier.price === "Custom" ? "Request Proposal" : "Apply for Slot"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Gap Analysis */}
        {activeTab === "gap" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-10">
                <h2 className="text-2xl font-bold text-aic-navy mb-6 font-serif">Self-Assessment Tool</h2>
                <p className="text-gray-600 mb-8">Select your role to receive a customized POPIA Section 71 readiness checklist.</p>
                
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {["Provider", "Deployer", "Integrator"].map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role as any)}
                      className={`p-6 border-2 rounded-2xl text-center transition-all ${
                        selectedRole === role ? "border-aic-copper bg-aic-paper text-aic-navy" : "border-gray-50 hover:border-aic-paper"
                      }`}
                    >
                      <div className="font-bold text-sm uppercase tracking-widest font-mono">{role}</div>
                    </button>
                  ))}
                </div>

                {selectedRole ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="p-6 bg-aic-paper rounded-xl">
                            <h3 className="font-bold text-aic-navy mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-aic-copper" />
                                {selectedRole} Readiness Tasks
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 text-sm">
                                    <div className="w-4 h-4 rounded border-2 border-gray-200"></div>
                                    Identify all high-impact automated decisions
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 text-sm">
                                    <div className="w-4 h-4 rounded border-2 border-gray-200"></div>
                                    Document named accountable humans for each system
                                </li>
                                <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 text-sm">
                                    <div className="w-4 h-4 rounded border-2 border-gray-200"></div>
                                    Audit explainability logs for POPIA compliance
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-aic-paper rounded-2xl text-gray-400">
                        Please select an AI role above to begin.
                    </div>
                )}
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-aic-navy rounded-2xl p-8 text-white text-center shadow-xl">
                <div className="text-5xl font-bold text-aic-copper mb-2 font-mono">0%</div>
                <div className="text-white/50 text-[10px] uppercase tracking-widest font-mono mb-6">Audit Readiness</div>
                <div className="bg-white/10 p-6 rounded-xl text-left border border-white/10">
                  <h4 className="font-bold text-xs uppercase tracking-widest font-mono text-aic-copper mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Compliance Note
                  </h4>
                  <p className="text-xs leading-relaxed text-white/70">
                    POPIA Section 71 requires that data subjects are NOT subjected to decisions based solely on automated processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Templates */}
        {activeTab === "templates" && (
          <div>
            <div className="mb-12">
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono font-bold">Practitioner Resources</span>
              <h2 className="text-4xl text-aic-navy mt-4 mb-4 font-serif italic">
                Governance Templates
              </h2>
              <p className="text-gray-500 max-w-2xl text-lg">
                AIC-developed tools to accelerate your human-accountable AI implementation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {riskTemplates.map((template, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-aic-paper rounded-2xl p-6 bg-white hover:border-aic-copper transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-aic-paper flex items-center justify-center mb-4 group-hover:bg-aic-copper/10">
                    <FileText className="w-5 h-5 text-aic-navy group-hover:text-aic-copper" />
                  </div>
                  <h3 className="font-bold text-aic-navy mb-2 text-sm font-serif">{template.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6">{template.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <Badge className="bg-aic-paper text-aic-navy">{template.type}</Badge>
                    <button className="text-aic-copper hover:text-aic-navy transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Card = ({ children, className }: any) => (
    <div className={`bg-white border border-aic-paper rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
);
