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
  FileText,
  Download,
  ExternalLink,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Scale,
  Map,
  Newspaper,
  Loader2,
} from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1585417239901-f3a4085218b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBkaWdpdGFsJTIwbmV0d29yayUyMGRhdGElMjBjb21wbGlhbmNlfGVufDF8fHx8MTc3MTk2MjY5MXww&ixlib=rb-4.1.0&q=80&w=1080";

const rights = [
  {
    article: "Article I",
    icon: Eye,
    title: "Algorithmic Transparency",
    color: "blue",
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
    expanded: false,
  },
  {
    article: "Article II",
    icon: MessageSquare,
    title: "Algorithmic Explainability",
    color: "amber",
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
    expanded: false,
  },
  {
    article: "Article III",
    icon: Bell,
    title: "Right to be Informed",
    color: "emerald",
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
    expanded: false,
  },
  {
    article: "Article IV",
    icon: RefreshCw,
    title: "Decision Recourse",
    color: "purple",
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
    expanded: false,
  },
  {
    article: "Article V",
    icon: UserCheck,
    title: "Human Interaction Choice",
    color: "rose",
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
    expanded: false,
  },
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
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [standards, setStandards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStandards() {
      try {
        const res = await fetch('http://localhost:3001/api/public/standards');
        if (res.ok) {
          const data = await res.json();
          setStandards(data);
        }
      } catch (error) {
        console.error("Failed to fetch standards:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStandards();
  }, []);

  const filteredStandards = standards.filter(
    (s) =>
      (selectedRegion === "All Regions" || s.region === selectedRegion) &&
      (s.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.framework.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const regions = ["All Regions", ...Array.from(new Set(standards.map((s) => s.region)))];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-transparent" />
        <div className="relative max-w-[1600px] mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-[#c9920a]" />
            <span className="text-[#c9920a] text-sm uppercase tracking-widest">Governance Hub</span>
          </div>
          <h1 className="text-5xl text-white mb-4" style={{ fontFamily: "'Merriweather', serif", fontWeight: 700 }}>
            The Global Standard for<br />
            <span className="text-[#c9920a]">Algorithmic Rights</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mb-8">
            Access AIC's foundational Declaration of Algorithmic Rights, global standards maps, and real-time policy intelligence for researchers, regulators, and policymakers.
          </p>
          <div className="flex gap-4">
            <Link
              href="#declaration"
              className="inline-flex items-center gap-2 bg-[#c9920a] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#b07d08] transition-colors"
            >
              <Scale className="w-4 h-4" /> Declaration of Rights
            </Link>
            <Link
              href="#standards-map"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors border border-white/20"
            >
              <Map className="w-4 h-4" /> Global Standards Map
            </Link>
          </div>
        </div>
      </section>

      {/* Declaration of Algorithmic Rights */}
      <section id="declaration" className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-24">
              <span className="text-[#c9920a] text-sm uppercase tracking-widest">Universal Standard</span>
              <h2 className="text-3xl text-[#0f1f3d] mt-2 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
                Declaration of Algorithmic Rights
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Adopted by the AIC General Assembly in 2023, the Declaration of Algorithmic Rights establishes five fundamental entitlements for every person interacting with automated systems. These rights form the cornerstone of all AIC certification assessments.
              </p>
              <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Document Reference</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Version</span><span className="font-medium text-[#0f1f3d]">3.1 (2025)</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Languages</span><span className="font-medium text-[#0f1f3d]">24 Official</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Signatories</span><span className="font-medium text-[#0f1f3d]">67 Nations</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Last Amended</span><span className="font-medium text-[#0f1f3d]">Oct 2025</span></div>
                </div>
                <button className="mt-4 w-full flex items-center justify-center gap-2 bg-[#0f1f3d] text-white text-sm py-2.5 rounded-lg hover:bg-[#1a3160] transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
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
                    className={`border rounded-xl overflow-hidden transition-all ${right.colorClass}`}
                  >
                    <button
                      className="w-full flex items-center gap-4 p-5 text-left"
                      onClick={() => setExpandedRight(isExpanded ? null : i)}
                    >
                      <div className={`w-10 h-10 rounded-lg ${right.iconClass} flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-wider opacity-60">{right.article}</div>
                        <div className="font-semibold">{right.title}</div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 opacity-60" />
                      ) : (
                        <ChevronRight className="w-4 h-4 opacity-60" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 space-y-4">
                        <div>
                          <div className="text-xs uppercase tracking-wider opacity-60 mb-1">Scope of Application</div>
                          <p className="text-sm">{right.scope}</p>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider opacity-60 mb-2">Compliance Obligations</div>
                          <ul className="space-y-1.5">
                            {right.obligations.map((ob, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0 opacity-60"></span>
                                {ob}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider opacity-60 mb-1">Recognized Exceptions</div>
                          <p className="text-sm opacity-80">{right.exceptions}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Global Standards Map */}
      <section id="standards-map" className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="mb-10">
            <span className="text-[#c9920a] text-sm uppercase tracking-widest">Global Overview</span>
            <h2 className="text-3xl text-[#0f1f3d] mt-2 mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
              AI Regulatory Standards Map
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl">
              Track the status of AI governance legislation and voluntary frameworks across major jurisdictions, and see how they align with AIC's Declaration of Algorithmic Rights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search regions or frameworks..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white min-h-[400px] flex flex-col">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#c9920a]" />
                <p>Loading global standards...</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1f3d] text-white/70 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3">Region</th>
                    <th className="text-left px-5 py-3">Framework</th>
                    <th className="text-left px-5 py-3">Status</th>
                    <th className="text-left px-5 py-3 hidden md:table-cell">Risk Level</th>
                    <th className="text-left px-5 py-3">AIC Alignment</th>
                    <th className="text-left px-5 py-3 hidden lg:table-cell">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStandards.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#0f1f3d] flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#c9920a]" />
                        {s.region}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{s.framework}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          s.status === "Enacted" ? "bg-green-100 text-green-700" :
                          s.status === "Active" ? "bg-blue-100 text-blue-700" :
                          "bg-amber-100 text-amber-700"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className={`text-xs font-medium ${
                          s.level === "High" ? "text-red-600" :
                          s.level === "Moderate" ? "text-amber-600" :
                          "text-green-600"
                        }`}>
                          {s.level}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[100px]">
                            <div
                              className="h-1.5 rounded-full bg-[#c9920a]"
                              style={{ width: `${s.alignment}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 shrink-0">{s.alignment}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">{s.year}</td>
                    </tr>
                  ))}
                  {!loading && filteredStandards.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                        No standards found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-[#c9920a] text-sm uppercase tracking-widest">Intelligence</span>
              <h2 className="text-3xl text-[#0f1f3d] mt-2" style={{ fontFamily: "'Merriweather', serif" }}>
                Policy Updates
              </h2>
            </div>
            <button className="flex items-center gap-2 text-sm text-[#0f1f3d] border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
              <Newspaper className="w-4 h-4" /> All Updates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policyUpdates.map((update, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    update.tag === "Regulatory" ? "bg-red-50 text-red-700" :
                    update.tag === "Standards" ? "bg-blue-50 text-blue-700" :
                    update.tag === "Accreditation" ? "bg-green-50 text-green-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {update.tag}
                  </span>
                  <span className="text-xs text-gray-400">{update.date}</span>
                </div>
                <h3 className="text-[#0f1f3d] font-semibold mb-2 leading-snug">{update.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{update.summary}</p>
                <button className="flex items-center gap-1 text-sm text-[#c9920a] font-medium">
                  Read More <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
