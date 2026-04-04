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
  Heart,
  RotateCcw,
  Zap,
} from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1585417239901-f3a4085218b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000";

const rights = [
  {
    article: "Article I",
    icon: Shield,
    title: "Human Agency",
    colorClass: "bg-blue-50 border-blue-200 text-blue-800",
    iconClass: "bg-blue-100 text-blue-700",
    scope: "No final decision affecting a person's dignity, freedom, or livelihood shall be made solely by a machine.",
    obligations: [
      "Named human accountability for every AI system",
      "Mandatory human override capability for high-risk decisions",
      "Disclosure of automated vs. human-led processing steps",
      "Registry of human supervisors for all consequential systems",
    ],
    exceptions: "Low-risk routine automated transactions under strict monitoring.",
  },
  {
    article: "Article II",
    icon: MessageSquare,
    title: "Explanation",
    colorClass: "bg-amber-50 border-amber-200 text-amber-800",
    iconClass: "bg-amber-100 text-amber-700",
    scope: "Every individual has the right to receive a meaningful, human-readable explanation of automated outcomes.",
    obligations: [
      "Plain-language explanation of decision logic",
      "Identification of key data points influencing the result",
      "Timely delivery of explanations (within 30 days)",
      "Accessible format for all users",
    ],
    exceptions: "Protection of trade secrets, provided a functional explanation is still offered.",
  },
  {
    article: "Article III",
    icon: Heart,
    title: "Empathy",
    colorClass: "bg-emerald-50 border-emerald-200 text-emerald-800",
    iconClass: "bg-emerald-100 text-emerald-700",
    scope: "Automated interactions must preserve human dignity and emotional integrity.",
    obligations: [
      "Elimination of cold, bureaucratic algorithm-only rejection",
      "Design for dignity in automated customer service",
      "Context-aware response mechanisms",
      "Mandatory 'warm' hand-off to human support for distressed users",
    ],
    exceptions: "Purely technical or non-consequential data processing.",
  },
  {
    article: "Article IV",
    icon: RotateCcw,
    title: "Correction",
    colorClass: "bg-purple-50 border-purple-200 text-purple-800",
    iconClass: "bg-purple-100 text-purple-700",
    scope: "Every system must provide a clear, human-staffed mechanism to appeal and correct automated decisions.",
    obligations: [
      "Easily accessible 'Appeal' or 'Review' pathway",
      "Guaranteed review by a qualified human professional",
      "Timely correction of erroneous data or biased outcomes",
      "Transparency in the appeals process metrics",
    ],
    exceptions: "Legally mandated automated freezes (e.g., AML/Sanctions) subject to judicial review.",
  },
  {
    article: "Article V",
    icon: Zap,
    title: "Truth",
    colorClass: "bg-rose-50 border-rose-200 text-rose-800",
    iconClass: "bg-rose-100 text-rose-700",
    scope: "Every person has the right to know if they are interacting with an AI system.",
    obligations: [
      "Prior notification of AI system engagement",
      "Distinct labeling of AI-generated content or responses",
      "Verification of human vs. synthetic identity",
      "Prohibition of deceptive anthropomorphism",
    ],
    exceptions: "Security and law enforcement operations under specific legal warrant.",
  },
];

const globalStandards = [
  { region: "South Africa", framework: "POPIA Section 71", status: "Active", level: "High", year: "2013", alignment: 100 },
  { region: "European Union", framework: "EU AI Act", status: "Enacted", level: "High", year: "2024", alignment: 95 },
  { region: "United States", framework: "NIST AI RMF", status: "Active", level: "Moderate", year: "2023", alignment: 82 },
  { region: "Global", framework: "ISO/IEC 42001", status: "Active", level: "High", year: "2023", alignment: 90 },
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
      <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-aic-gold" />
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Governance Hub</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight font-serif italic">
              Declaration of<br />
              <span className="text-aic-gold">Algorithmic Rights</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mb-10 leading-relaxed">
              Establishing the South African benchmark for ensures that automated systems preserve human dignity.
            </p>
            <div className="flex gap-4">
              <a
                href="#declaration"
                className="inline-flex items-center gap-2 bg-aic-gold text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-mono hover:bg-[#b07d08] transition-all shadow-lg shadow-aic-gold/20"
              >
                <Scale className="w-4 h-4" /> Review the Rights
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
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">The 5 Rights</span>
              <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-6 leading-tight font-bold">
                Foundational Accountability
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 font-serif italic">
                Our framework ensures that automated systems are not "lawless" but subject to human agency and empathy.
              </p>
              <div className="bg-aic-paper rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold mb-4">Document Reference</div>
                <div className="space-y-4 text-sm font-sans">
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Framework</span><span className="font-bold text-[#0f1f3d]">DAR v3.1</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Alignment</span><span className="font-bold text-[#0f1f3d]">POPIA §71</span></div>
                </div>
                <button className="mt-8 w-full flex items-center justify-center gap-2 bg-[#0f1f3d] text-white text-[11px] font-bold py-4 rounded-xl hover:bg-[#1a3160] transition-all uppercase tracking-widest font-mono shadow-xl">
                  <Download className="w-4 h-4" /> Download Full PDF
                </button>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-4">
              {rights.map((right, i) => {
                const RightIcon = right.icon;
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
                        <RightIcon className="w-6 h-6" />
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
                          <div className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-60 mb-2">Scope</div>
                          <p className="text-lg leading-relaxed font-serif italic">{right.scope}</p>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-60 mb-4">Requirements for Certification</div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {right.obligations.map((ob, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm bg-white/50 p-4 rounded-xl border border-black/5">
                                <CheckCircle className="w-5 h-5 text-aic-gold shrink-0 mt-0.5" />
                                <span>{ob}</span>
                              </li>
                            ))}
                          </ul>
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

      {/* Standards Map */}
      <section id="standards-map" className="py-24 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Compliance Mapping</span>
          <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-6 font-bold">Global Regulatory Alignment</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-serif italic">
            See how the Declaration of Algorithmic Rights maps to global and local legislation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-xl">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-[#0f1f3d] text-white/70 text-[10px] uppercase tracking-[0.2em] font-mono">
                  <th className="text-left px-8 py-5">Region</th>
                  <th className="text-left px-8 py-5">Framework</th>
                  <th className="text-left px-8 py-5">Status</th>
                  <th className="text-left px-8 py-5">AIC Alignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStandards.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 font-bold text-[#0f1f3d] flex items-center gap-3">
                      <Globe className="w-5 h-5 text-aic-gold" />
                      {s.region}
                    </td>
                    <td className="px-8 py-6 text-gray-600">{s.framework}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono bg-green-50 text-green-700 border border-green-100">
                        {s.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-mono font-bold text-aic-gold">{s.alignment}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
