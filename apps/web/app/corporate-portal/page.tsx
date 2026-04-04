"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle, FileText, Download, ArrowRight, Building2, Clock, BarChart3, Zap, Globe, Lock, Search, RefreshCw, Star, Users } from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1771931322109-180bb1b35bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000";

const certificationTiers = [
  {
    tier: "Founding Partner",
    code: "POPIA §71 + ISO 42001",
    price: "R 3,000 /mo",
    duration: "Ongoing",
    color: "#c9920a",
    featured: true,
    features: [
      "POPIA Section 71 Compliance Audit",
      "ISO/IEC 42001 Readiness Assessment",
      "Lifetime Price Lock",
      "Free Upgrade to SANAS Accreditation",
      "Monthly AI Integrity Intelligence Brief",
      "Priority Access to Audit Engine",
    ],
    audience: "Early adopters defining South African AI standards",
  },
  {
    tier: "Conformity Assessment",
    code: "ISO/IEC 42001 – Full",
    price: "R 185,000",
    duration: "8–12 weeks",
    color: "#0f1f3d",
    features: [
      "Full AIMS Implementation Audit",
      "Risk Treatment Plan Development",
      "Conformity Certificate (3-year cycle)",
      "Algorithmic Rights Compliance Review",
      "3 Surveillance Audits included",
      "Executive Board Briefing",
    ],
    audience: "Large enterprises requiring formal certification",
  },
  {
    tier: "Gap Analysis",
    code: "Baseline Review",
    price: "R 45,000",
    duration: "2 weeks",
    color: "#1d4ed8",
    features: [
      "AI Risk Inventory Assessment",
      "Gap Analysis Report (108 controls)",
      "Readiness Scorecard",
      "1 Remediation Workshop",
    ],
    audience: "Organizations assessing their current risk exposure",
  },
];

const gapControls = [
  { domain: "POPIA Section 71 Compliance", controls: 10, completed: 4, risk: "High" },
  { domain: "AI Strategy & Governance", controls: 12, completed: 9, risk: "Low" },
  { domain: "Risk Management Framework", controls: 18, completed: 11, risk: "Medium" },
  { domain: "Data Governance & Privacy", controls: 15, completed: 13, risk: "Low" },
  { domain: "Model Lifecycle Management", controls: 20, completed: 8, risk: "High" },
  { domain: "Algorithmic Rights Compliance", controls: 10, completed: 4, risk: "High" },
  { domain: "Incident Response & Monitoring", controls: 14, completed: 10, risk: "Medium" },
  { domain: "Human Oversight Mechanisms", controls: 8, completed: 6, risk: "Low" },
];

const riskTemplates = [
  { title: "POPIA Section 71 Checklist", desc: "Specific audit criteria for automated decision-making systems under South African law.", type: "PDF / Word", size: "156 KB" },
  { title: "AI Risk Register Template", desc: "Comprehensive 200-row risk register aligned to ISO/IEC 42001 Annex A controls.", type: "Excel / CSV", size: "248 KB" },
  { title: "AIMS Policy Framework", desc: "Pre-populated AI Management System policy templates for Board and Operational levels.", type: "Word / PDF", size: "1.2 MB" },
  { title: "Algorithmic Impact Assessment", desc: "Structured AIA form for assessing high-risk AI system deployments.", type: "PDF / Word", size: "387 KB" },
  { title: "Vendor AI Due Diligence", desc: "40-point checklist for evaluating third-party AI provider accountability.", type: "PDF / Excel", size: "156 KB" },
  { title: "SANAS Roadmap Guide", desc: "Step-by-step technical guide to the AIC accreditation process.", type: "PDF", size: "892 KB" },
];

const certifiedOrgs = [
  { name: "South African FinCorp", sector: "Finance", tier: "Founding Partner", since: "2024", score: 94 },
  { name: "Cape Health Systems", sector: "Healthcare", tier: "Gap Analysis", since: "2024", score: 88 },
  { name: "Jo'burg Logistics", sector: "Supply Chain", tier: "Conformity", since: "2023", score: 85 },
  { name: "Pretoria Insurance", sector: "Insurance", tier: "Founding Partner", since: "2025", score: 91 },
];

export default function CorporatePortal() {
  const [activeTab, setActiveTab] = useState<"certification" | "gap" | "templates" | "directory">("certification");
  const [searchOrg, setSearchOrg] = useState("");

  const filteredOrgs = certifiedOrgs.filter(
    (o) =>
      o.name.toLowerCase().includes(searchOrg.toLowerCase()) ||
      o.sector.toLowerCase().includes(searchOrg.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-aic-gold" />
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Corporate Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight">
              POPIA Section 71<br />
              <span className="text-aic-gold">Audit & Certification</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mb-10 leading-relaxed font-serif italic">
              Ensure your automated decision systems are legally defensible and ethically sound. We provide the South African benchmark for human accountability in AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab("certification")}
                className="bg-aic-gold text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-mono hover:bg-[#b07d08] transition-all shadow-lg shadow-aic-gold/20"
              >
                Join Founding Program
              </button>
              <button
                onClick={() => setActiveTab("gap")}
                className="bg-white/10 text-white border-2 border-white/20 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-mono hover:bg-white/20 transition-all"
              >
                Run Gap Analysis
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-2">
            {[
              { id: "certification", label: "Certification Services", icon: Shield },
              { id: "gap", label: "Gap Analysis Tool", icon: BarChart3 },
              { id: "templates", label: "Regulatory Templates", icon: FileText },
              { id: "directory", label: "Registry of Certified Orgs", icon: Building2 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all font-mono border-b-2 ${
                  activeTab === id
                    ? "border-aic-gold text-[#0f1f3d] bg-gray-50"
                    : "border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Certification Services */}
        {activeTab === "certification" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-16">
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">South African Standard</span>
              <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-6 font-bold">
                Conformity Assessment Tiers
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg font-serif italic">
                Select the audit path that aligns with your organization's risk profile and POPIA Section 71 requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {certificationTiers.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative border rounded-[2.5rem] overflow-hidden transition-all duration-500 bg-white group hover:shadow-2xl ${tier.featured ? "border-aic-gold shadow-xl scale-105 z-10" : "border-gray-100 shadow-sm hover:-translate-y-2"}`}
                >
                  {tier.featured && (
                    <div className="absolute top-0 left-0 right-0 text-center py-3 text-white text-[10px] font-bold uppercase tracking-[0.2em] font-mono" style={{ backgroundColor: tier.color }}>
                      Limited Founding Opportunity
                    </div>
                  )}
                  <div className={`p-10 ${tier.featured ? "mt-8" : ""}`}>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: tier.color + "15" }}
                    >
                      <Shield className="w-7 h-7" style={{ color: tier.color }} />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono font-bold mb-2">{tier.code}</div>
                    <h3 className="text-2xl font-bold text-[#0f1f3d] mb-2">{tier.tier}</h3>
                    <div className="text-3xl font-bold mb-2 font-mono" style={{ color: tier.color }}>{tier.price}</div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-6">
                      <Clock className="w-4 h-4" />
                      {tier.duration}
                    </div>
                    <p className="text-sm text-gray-500 mb-8 italic font-serif leading-relaxed border-l-2 border-gray-100 pl-4">{tier.audience}</p>
                    <ul className="space-y-4 mb-10">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                          <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: tier.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="w-full py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest font-mono transition-all shadow-lg"
                      style={{
                        backgroundColor: tier.featured ? tier.color : "transparent",
                        color: tier.featured ? "white" : tier.color,
                        border: `2px solid ${tier.color}`,
                      }}
                    >
                      {tier.tier === "Founding Partner" ? "Apply for Founding Slot" : "Request Quote"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gap Analysis Tool */}
        {activeTab === "gap" && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="mb-12 text-center md:text-left">
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Free Readiness Tool</span>
              <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-6 font-bold">
                POPIA §71 Gap Analysis
              </h2>
              <p className="text-gray-500 max-w-2xl text-lg font-serif italic">
                Indicative assessment of your organization's readiness for automated decision-making audits under South African law.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="md:col-span-1 bg-[#0f1f3d] rounded-[2rem] p-10 text-white text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 subtle-grid" />
                <div className="relative z-10">
                  <div className="text-6xl font-bold text-aic-gold font-mono">42%</div>
                  <div className="text-white/70 text-[10px] uppercase tracking-widest font-mono mt-4">Local Readiness</div>
                  <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-aic-gold transition-all duration-1000" style={{ width: "42%" }}></div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "POPIA Gaps", value: "6", color: "text-red-600", bg: "bg-red-50" },
                  { label: "Transparency Score", value: "34/100", color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Accountability", value: "Partial", color: "text-blue-600", bg: "bg-blue-50" },
                ].map((item, i) => (
                  <div key={i} className={`border border-gray-100 rounded-2xl p-6 ${item.bg} flex flex-col justify-center`}>
                    <div className={`text-3xl font-bold font-mono ${item.color}`}>{item.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mt-2 font-bold">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {gapControls.map((control, i) => {
                const pct = Math.round((control.completed / control.controls) * 100);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-3 h-3 rounded-full shrink-0 ${
                            control.risk === "High" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
                            control.risk === "Medium" ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                          }`}
                        ></span>
                        <span className="font-bold text-[#0f1f3d] text-base uppercase tracking-tight">{control.domain}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono ${
                          control.risk === "High" ? "bg-red-50 text-red-700" :
                          control.risk === "Medium" ? "bg-amber-50 text-amber-700" :
                          "bg-green-50 text-green-700"
                        }`}>
                          {control.risk} Risk
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold font-mono text-gray-400">{pct}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Regulatory Templates */}
        {activeTab === "templates" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-16 text-center md:text-left">
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">South African Compliance</span>
              <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-6 font-bold">
                Regulatory Audit Templates
              </h2>
              <p className="text-gray-500 max-w-2xl text-lg font-serif italic">
                Tools and frameworks specifically designed for South African legal alignment and SANAS accreditation readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {riskTemplates.map((template, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-gray-100 rounded-3xl p-8 bg-white hover:shadow-2xl hover:border-aic-gold/30 transition-all group flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0f1f3d]/5 flex items-center justify-center mb-6 group-hover:bg-aic-gold transition-colors duration-500">
                    <FileText className="w-7 h-7 text-[#0f1f3d] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0f1f3d] mb-3 text-lg leading-tight group-hover:text-aic-gold transition-colors">{template.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">{template.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold px-3 py-1 bg-gray-100 rounded-lg text-gray-500 uppercase tracking-widest font-mono group-hover:bg-aic-gold/10 group-hover:text-aic-gold transition-colors">{template.type}</span>
                    </div>
                    <button className="flex items-center gap-2 text-aic-gold font-bold uppercase tracking-widest text-[10px] font-mono hover:gap-3 transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Directory */}
        {activeTab === "directory" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-12">
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Public Registry</span>
              <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-6 font-bold">
                Verified Certified Organizations
              </h2>
              <p className="text-gray-500 max-w-2xl text-lg font-serif italic">
                Registry of South African organizations holding active AIC certifications or Founding Partner status.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-xl bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="bg-[#0f1f3d] text-white/70 text-[10px] uppercase tracking-[0.2em] font-mono">
                      <th className="text-left px-8 py-5">Organization</th>
                      <th className="text-left px-8 py-5">Sector</th>
                      <th className="text-left px-8 py-5">Tier</th>
                      <th className="text-left px-8 py-5">Integrity Score</th>
                      <th className="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredOrgs.map((org, i) => (
                      <tr key={i} className="hover:bg-gray-50 group transition-colors">
                        <td className="px-8 py-6 font-bold text-[#0f1f3d] flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-aic-gold" />
                          {org.name}
                        </td>
                        <td className="px-8 py-6 text-gray-500">{org.sector}</td>
                        <td className="px-8 py-6">
                          <span className={`text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono ${
                            org.tier === "Founding Partner" ? "bg-aic-gold text-white" : "bg-blue-50 text-blue-700"
                          }`}>
                            {org.tier}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-aic-gold transition-all duration-1000" style={{ width: `${org.score}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-gray-700 font-mono">{org.score}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <CheckCircle className="w-4 h-4 text-green-500 inline-block" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
