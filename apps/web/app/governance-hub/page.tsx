"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  MessageSquare,
  Bell,
  RefreshCw,
  UserCheck,
  Globe,
  Download,
  Search,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Scale,
  Map,
  Loader2,
  Shield,
  CheckCircle,
  Newspaper,
} from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1585417239901-f3a4085218b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000";

const rights = [
  {
    article: "Article I",
    icon: Eye,
    title: "Algorithmic Transparency",
    colorClass: "bg-blue-50 border-blue-200 text-blue-800",
    iconClass: "bg-blue-100 text-blue-700",
    scope: "All automated decision systems affecting natural persons",
    obligations: [
      "Disclose the existence of automated decision-making systems",
      "Publish the general logic and parameters used in decisions",
      "Maintain accessible records of AI system objectives",
      "Notify relevant authorities of high-risk system deployments",
    ],
    exceptions: "Exemptions available for national security systems under verified governmental review.",
  },
  {
    article: "Article II",
    icon: MessageSquare,
    title: "Algorithmic Explainability",
    colorClass: "bg-amber-50 border-amber-200 text-amber-800",
    iconClass: "bg-amber-100 text-amber-700",
    scope: "Decisions with material impact on individual rights, welfare, or opportunities",
    obligations: [
      "Provide plain-language explanations upon individual request",
      "Explain the key factors influencing any automated outcome",
      "Offer explanations within 30 days of a decision being made",
      "Maintain explanation logs for minimum 3 years",
    ],
    exceptions: "Proprietary algorithm details may be withheld where trade secrets apply, provided a functional explanation is still offered.",
  },
  {
    article: "Article III",
    icon: Bell,
    title: "Right to be Informed",
    colorClass: "bg-emerald-50 border-emerald-200 text-emerald-800",
    iconClass: "bg-emerald-100 text-emerald-700",
    scope: "All consumer-facing and employment-context AI interactions",
    obligations: [
      "Disclose AI interaction prior to engagement, not retrospectively",
      "Use plain and accessible language in disclosure notices",
      "Update notifications when AI systems are materially modified",
      "Maintain audit trails of disclosure delivery",
    ],
    exceptions: "Real-time fraud detection systems may operate without prior notice under monitored conditions.",
  },
  {
    article: "Article IV",
    icon: RefreshCw,
    title: "Decision Recourse",
    colorClass: "bg-purple-50 border-purple-200 text-purple-800",
    iconClass: "bg-purple-100 text-purple-700",
    scope: "All high-stakes automated decisions (credit, employment, healthcare, legal)",
    obligations: [
      "Provide a human review pathway for all consequential AI decisions",
      "Establish and publish a formal appeals process",
      "Guarantee timely review — within 30 days for most decisions",
      "Document all overrides and maintain accountability records",
    ],
    exceptions: "Low-risk routine automated transactions (e.g., email filtering) may be exempt.",
  },
  {
    article: "Article V",
    icon: UserCheck,
    title: "Human Interaction Choice",
    colorClass: "bg-rose-50 border-rose-200 text-rose-800",
    iconClass: "bg-rose-100 text-rose-700",
    scope: "All service providers offering AI-mediated customer or citizen interactions",
    obligations: [
      "Offer a human service alternative at no additional cost",
      "Process opt-out requests within a reasonable time frame",
      "Maintain sufficient human staffing to fulfill opt-out requests",
      "Prohibit penalization for choosing human service",
    ],
    exceptions: "Fully automated critical infrastructure (e.g., power grid management) is exempt where no practical alternative exists.",
  },
];

const globalStandards = [
  { region: "European Union", framework: "EU AI Act", status: "Enacted", level: "High", year: "2024", alignment: 95 },
  { region: "United States", framework: "NIST AI RMF + EO 14110", status: "Active", level: "Moderate", year: "2023", alignment: 82 },
  { region: "United Kingdom", framework: "UK Pro-Innovation AI Framework", status: "Active", level: "Moderate", year: "2023", alignment: 74 },
  { region: "South Africa", framework: "POPIA Section 71", status: "Active", level: "High", year: "2013", alignment: 100 },
  { region: "Singapore", framework: "Model AI Governance Framework", status: "Active", level: "Voluntary", year: "2023", alignment: 85 },
];

const policyUpdates = [
  {
    date: "Feb 2026",
    tag: "Regulatory",
    title: "EU AI Act High-Risk System Compliance Deadline Approaches",
    summary: "Organizations deploying high-risk AI systems under Annex III must achieve ISO/IEC 42001 compliance by August 2026. AIC has expanded its conformity assessment capacity.",
  },
  {
    date: "Jan 2026",
    tag: "Standards",
    title: "ISO/IEC 42001:2023 Amendment Published for Generative AI",
    summary: "The International Organization for Standardization has published Technical Corrigendum 1 addressing generative AI and large language model deployment requirements.",
  },
  {
    date: "Dec 2025",
    tag: "Policy",
    title: "NIST AI RMF Playbook v2.0 Released",
    summary: "NIST has released an updated AI Risk Management Framework Playbook with enhanced guidance on Govern function implementation and AI red-teaming protocols.",
  },
  {
    date: "Nov 2025",
    tag: "Accreditation",
    title: "AIC Achieves APAC MLA Recognition",
    summary: "AIC has been formally recognized under the Asia Pacific Accreditation Cooperation (APAC) Multilateral Recognition Arrangement, expanding credential portability across 21 member economies.",
  },
];

export default function GovernanceHub() {
  const [expandedRight, setExpandedRight] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStandards = globalStandards.filter(
    (s) =>
      s.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.framework.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-aic-gold" />
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Governance Hub</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight">
              The Global Standard for<br />
              <span className="text-aic-gold">Algorithmic Rights</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mb-10 leading-relaxed font-serif italic">
              Access AIC's foundational Declaration of Algorithmic Rights, global standards maps, and real-time policy intelligence for researchers, regulators, and policymakers.
            </p>
            <div className="flex gap-4">
              <a
                href="#declaration"
                className="inline-flex items-center gap-2 bg-aic-gold text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-mono hover:bg-[#b07d08] transition-all shadow-lg shadow-aic-gold/20"
              >
                <Scale className="w-4 h-4" /> Declaration of Rights
              </a>
              <a
                href="#standards-map"
                className="inline-flex items-center gap-2 bg-white/10 text-white border-2 border-white/20 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-mono hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Map className="w-4 h-4" /> Global Standards Map
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Declaration of Algorithmic Rights */}
      <section id="declaration" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Universal Standard</span>
              <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-6 leading-tight">
                Declaration of Algorithmic Rights
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 font-serif italic">
                Adopted by the AIC General Assembly, the Declaration establishes five fundamental entitlements for every person interacting with automated systems.
              </p>
              <div className="bg-aic-paper rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold mb-4">Document Reference</div>
                <div className="space-y-4 text-sm font-sans">
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Version</span><span className="font-bold text-[#0f1f3d]">3.1 (2025)</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Official Languages</span><span className="font-bold text-[#0f1f3d]">24</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Member Nations</span><span className="font-bold text-[#0f1f3d]">67</span></div>
                </div>
                <button className="mt-8 w-full flex items-center justify-center gap-2 bg-[#0f1f3d] text-white text-[11px] font-bold py-4 rounded-xl hover:bg-[#1a3160] transition-all uppercase tracking-widest font-mono shadow-xl">
                  <Download className="w-4 h-4" /> Download Full PDF
                </button>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-4">
              {rights.map((right, i) => {
                const Icon = right.icon;
                const isExpanded = expandedRight === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`border rounded-2xl overflow-hidden transition-all duration-500 ${right.colorClass} ${isExpanded ? "ring-2 ring-aic-gold shadow-2xl" : "shadow-sm hover:shadow-md"}`}
                  >
                    <button
                      className="w-full flex items-center gap-6 p-6 text-left focus:outline-none"
                      onClick={() => setExpandedRight(isExpanded ? null : i)}
                    >
                      <div className={`w-12 h-12 rounded-xl ${right.iconClass} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-60 mb-1">{right.article}</div>
                        <div className="text-xl font-bold">{right.title}</div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-6 h-6 opacity-40 transition-transform rotate-180" />
                      ) : (
                        <ChevronRight className="w-6 h-6 opacity-40" />
                      )}
                    </button>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="px-8 pb-8 space-y-6"
                      >
                        <div className="pt-6 border-t border-black/5">
                          <div className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-60 mb-2">Scope of Application</div>
                          <p className="text-lg leading-relaxed">{right.scope}</p>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-60 mb-4">Compliance Obligations</div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {right.obligations.map((ob, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm bg-white/50 p-4 rounded-xl border border-black/5">
                                <CheckCircle className="w-5 h-5 text-aic-gold shrink-0 mt-0.5" />
                                <span>{ob}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-white/30 rounded-xl border border-dashed border-black/10">
                          <div className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-40 mb-1">Recognized Exceptions</div>
                          <p className="text-sm italic opacity-70">{right.exceptions}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Global Standards Map */}
      <section id="standards-map" className="py-24 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Global Overview</span>
            <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-6 leading-tight">
              AI Regulatory Standards Map
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl font-serif italic">
              Track the status of AI governance legislation and see how frameworks align with the Declaration of Algorithmic Rights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search regions or frameworks..."
                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-aic-gold/10 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="bg-[#0f1f3d] text-white/70 text-[10px] uppercase tracking-[0.2em] font-mono">
                    <th className="text-left px-8 py-5">Region</th>
                    <th className="text-left px-8 py-5">Framework</th>
                    <th className="text-left px-8 py-5">Status</th>
                    <th className="text-left px-8 py-5 hidden md:table-cell">Risk Level</th>
                    <th className="text-left px-8 py-5">AIC Alignment</th>
                    <th className="text-left px-8 py-5 hidden lg:table-cell">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredStandards.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-8 py-6 font-bold text-[#0f1f3d] flex items-center gap-3">
                        <Globe className="w-5 h-5 text-aic-gold group-hover:scale-110 transition-transform" />
                        {s.region}
                      </td>
                      <td className="px-8 py-6 text-gray-600 font-medium">{s.framework}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono ${
                          s.status === "Enacted" ? "bg-green-100 text-green-700" :
                          s.status === "Active" ? "bg-blue-100 text-blue-700" :
                          "bg-amber-100 text-amber-700"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 hidden md:table-cell">
                        <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${
                          s.level === "High" ? "text-red-600" :
                          s.level === "Moderate" ? "text-amber-600" :
                          "text-green-600"
                        }`}>
                          {s.level}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-[100px] overflow-hidden">
                            <div
                              className="h-full bg-aic-gold transition-all duration-1000"
                              style={{ width: `${s.alignment}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-500 font-mono">{s.alignment}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-gray-400 font-mono hidden lg:table-cell">{s.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Policy Intelligence</span>
              <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-2 leading-tight">
                Global Policy Updates
              </h2>
            </div>
            <button className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest font-mono text-[#0f1f3d] border-2 border-[#0f1f3d] px-6 py-3 rounded-xl hover:bg-[#0f1f3d] hover:text-white transition-all">
              <Newspaper className="w-4 h-4" /> View All Updates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policyUpdates.map((update, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-gray-100 rounded-[2rem] p-10 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-aic-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 mb-6">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest font-mono ${
                    update.tag === "Regulatory" ? "bg-red-50 text-red-700" :
                    update.tag === "Standards" ? "bg-blue-50 text-blue-700" :
                    update.tag === "Accreditation" ? "bg-green-50 text-green-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {update.tag}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">{update.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0f1f3d] mb-4 leading-tight group-hover:text-aic-gold transition-colors">{update.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed mb-8 font-sans">{update.summary}</p>
                <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] font-mono text-aic-gold hover:gap-3 transition-all">
                  Read Analysis <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
