"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  MessageSquare,
  Heart,
  RotateCcw,
  Zap,
  Globe,
  Download,
  Search,
  ChevronDown,
  ChevronRight,
  Scale,
  Map,
  Loader2,
  Shield,
} from "lucide-react";

// D-11: Hero background
const heroBg = "https://images.unsplash.com/photo-1585417239901-f3a4085218b7?q=80&w=2000&auto=format&fit=crop";

// D-4: Fix Algorithmic Rights names to: Human Agency, Explanation, Empathy, Correction, Truth
const rights = [
  {
    article: "Article I",
    icon: Shield,
    title: "Human Agency",
    colorClass: "bg-aic-navy/5 border-aic-navy/10 text-aic-navy",
    iconClass: "bg-aic-navy/10 text-aic-navy",
    scope: "No final decision affecting a person's dignity, freedom, or livelihood shall be made solely by a machine.",
    obligations: [
        "A named human must remain accountable for automated outcomes",
        "Meaningful human intervention must be possible at all times",
        "Human override mechanisms must be established and logged",
        "Accountability cannot be delegated to an algorithm"
    ],
    exceptions: "Low-risk automated processes with no material impact on human rights.",
  },
  {
    article: "Article II",
    icon: MessageSquare,
    title: "Explanation",
    colorClass: "bg-aic-copper/5 border-aic-copper/10 text-aic-copper",
    iconClass: "bg-aic-copper/10 text-aic-copper",
    scope: "Every individual has the right to receive a meaningful, human-readable explanation of automated outcomes.",
    obligations: [
      "Provide plain-language explanations of decision logic",
      "Identify the key features that influenced a specific outcome",
      "Explanations must be provided within 30 days of request (POPIA aligned)",
      "Maintain decision logs for forensic audit purposes"
    ],
    exceptions: "Where disclosure would compromise security or trade secrets, while still providing functional reasoning.",
  },
  {
    article: "Article III",
    icon: Heart,
    title: "Empathy",
    colorClass: "bg-aic-navy/5 border-aic-navy/10 text-aic-navy",
    iconClass: "bg-aic-navy/10 text-aic-navy",
    scope: "Automated interactions must preserve human dignity and emotional intelligence.",
    obligations: [
      "Audit automated communications for tone and dignity",
      "Ensure clear escalation paths to human agents",
      "Remediate 'cold' bureaucratic rejection patterns",
      "Acknowledge the human impact of automated rejections"
    ],
    exceptions: "Purely technical machine-to-machine interactions.",
  },
  {
    article: "Article IV",
    icon: RotateCcw,
    title: "Correction",
    colorClass: "bg-aic-copper/5 border-aic-copper/10 text-aic-copper",
    iconClass: "bg-aic-copper/10 text-aic-copper",
    scope: "Every system must provide a clear, human-staffed mechanism to appeal and correct unjust decisions.",
    obligations: [
      "Establish a formal, accessible dispute resolution portal",
      "Guarantee timely human review of contested automated results",
      "Correct data inaccuracies leading to flawed automated outcomes",
      "Publish recourse statistics to maintain public trust"
    ],
    exceptions: "Automated outcomes that have already been reviewed and finalized by a human.",
  },
  {
    article: "Article V",
    icon: Zap,
    title: "Truth",
    colorClass: "bg-aic-navy/5 border-aic-navy/10 text-aic-navy",
    iconClass: "bg-aic-navy/10 text-aic-navy",
    scope: "Every person has the right to know if they are interacting with an AI system.",
    obligations: [
      "Explicitly disclose AI presence prior to engagement",
      "Use clear, unambiguous labeling for synthetic content",
      "Update notifications when AI systems are materially modified",
      "Prohibit deceptive personification of AI agents"
    ],
    exceptions: "Infrastructure-level AI with no direct human interface.",
  },
];

const Badge = ({ children, className }: any) => (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${className}`}>
      {children}
    </span>
);

export default function GovernanceHub() {
  const [expandedRight, setExpandedRight] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [standards, setStandards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStandards() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.aiccertified.cloud';
        const res = await fetch(`${baseUrl}/api/public/standards`);
        if (res.ok) {
          const data = await res.json();
          setStandards(data);
        } else {
            setStandards([
                { region: "South Africa", framework: "POPIA Section 71", status: "Enacted", level: "High", alignment: 100, year: 2013 },
                { region: "European Union", framework: "EU AI Act", status: "Active", level: "High", alignment: 85, year: 2024 },
                { region: "USA", framework: "NIST AI RMF", status: "Voluntary", level: "Moderate", alignment: 70, year: 2023 },
            ]);
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
      s.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.framework.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-aic-navy">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-aic-navy via-aic-navy/80 to-transparent" />
        <div className="relative max-w-[1600px] mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-aic-copper" />
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono">Governance Hub</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-white mb-6 font-serif italic">
              Benchmark for<br />
              <span className="text-aic-copper">Human Accountability</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mb-10 leading-relaxed">
              AI Integrity Certification (Pty) Ltd provides the foundational framework for responsible AI 
              governance in South Africa and beyond. Built on the 5 Algorithmic Rights.
            </p>
            <div className="flex gap-4">
              <Link
                href="#declaration"
                className="inline-flex items-center gap-2 bg-aic-copper text-white px-8 py-4 rounded-lg text-sm font-bold hover:bg-aic-copper/90 transition-all shadow-lg shadow-aic-copper/20"
              >
                <Scale className="w-4 h-4" /> The Declaration
              </Link>
              <Link
                href="#standards-map"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg text-sm font-bold hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
              >
                <Map className="w-4 h-4" /> Standards Map
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Declaration of Algorithmic Rights */}
      <section id="declaration" className="py-24 bg-aic-paper">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-24">
              <span className="text-aic-copper text-sm uppercase tracking-widest font-mono font-bold">The Standard</span>
              <h2 className="text-4xl text-aic-navy mt-4 mb-6 font-serif italic">
                Declaration of Algorithmic Rights
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                The Declaration establishes five fundamental entitlements for every person interacting with automated systems. 
                These rights are the benchmark for AI Integrity Certification (Pty) Ltd.
              </p>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold mb-4">Document Context</div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Legal Foundation</span><span className="font-bold text-aic-navy">POPIA Section 71</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Framework</span><span className="font-bold text-aic-navy">5 Rights v2.0</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Status</span><Badge className="bg-green-100 text-green-700">Enforced</Badge></div>
                </div>
                <button className="mt-8 w-full flex items-center justify-center gap-2 bg-aic-navy text-white text-xs font-bold py-4 rounded-lg hover:bg-aic-navy-mid transition-all shadow-md uppercase tracking-widest font-mono">
                  <Download className="w-4 h-4" /> Download the Declaration
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
                    className={`border rounded-2xl overflow-hidden transition-all bg-white shadow-sm hover:shadow-md ${isExpanded ? "ring-2 ring-aic-copper/50" : ""}`}
                  >
                    <button
                      className="w-full flex items-center gap-6 p-6 text-left"
                      onClick={() => setExpandedRight(isExpanded ? null : i)}
                    >
                      <div className={`w-12 h-12 rounded-xl ${right.iconClass} flex items-center justify-center shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-60 mb-1">{right.article}</div>
                        <div className="text-xl font-bold text-aic-navy font-serif">{right.title}</div>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-gray-300 transition-transform ${isExpanded ? "rotate-180 text-aic-copper" : ""}`} />
                    </button>
                    {isExpanded && (
                      <div className="px-8 pb-8 space-y-6 bg-aic-paper/20">
                        <div className="pt-4 border-t border-aic-paper">
                          <div className="text-[10px] uppercase tracking-widest font-mono font-bold text-aic-copper mb-2">Scope of Application</div>
                          <p className="text-lg text-gray-700">{right.scope}</p>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest font-mono font-bold text-aic-copper mb-3">Compliance Obligations</div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {right.obligations.map((ob, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-50">
                                <CheckCircle className="w-4 h-4 text-aic-copper shrink-0 mt-0.5" />
                                {ob}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-white/50 rounded-lg border border-dashed border-gray-200">
                          <div className="text-[10px] uppercase tracking-widest font-mono font-bold text-gray-400 mb-1">Recognized Exceptions</div>
                          <p className="text-sm italic text-gray-500">{right.exceptions}</p>
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

      {/* Standards Map */}
      <section id="standards-map" className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="mb-12">
            <span className="text-aic-copper text-sm uppercase tracking-widest font-mono font-bold">Policy Intelligence</span>
            <h2 className="text-4xl text-aic-navy mt-4 mb-4 font-serif italic">
              Regulatory Standards Map
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Track the status of AI governance legislation in South Africa and across global jurisdictions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search frameworks..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-none bg-aic-paper focus:ring-2 focus:ring-aic-copper/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm min-h-[400px] flex flex-col">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-aic-copper" />
                <p className="font-mono text-sm uppercase tracking-widest">Querying Policy Database...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-aic-navy text-white text-[10px] uppercase tracking-widest font-mono font-bold">
                      <th className="px-8 py-4">Region</th>
                      <th className="px-8 py-4">Framework</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4">Alignment</th>
                      <th className="px-8 py-4">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredStandards.map((s, i) => (
                      <tr key={i} className="hover:bg-aic-paper/30 transition-colors">
                        <td className="px-8 py-6 font-bold text-aic-navy flex items-center gap-3">
                          <Globe className="w-5 h-5 text-aic-copper" />
                          {s.region}
                        </td>
                        <td className="px-8 py-6 text-gray-600 font-medium">{s.framework}</td>
                        <td className="px-8 py-6">
                          <Badge className={
                            s.status === "Enacted" ? "bg-green-100 text-green-700" :
                            s.status === "Active" ? "bg-blue-100 text-blue-700" :
                            "bg-amber-100 text-amber-700"
                          }>
                            {s.status}
                          </Badge>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-aic-paper rounded-full h-1.5 max-w-[100px]">
                              <div
                                className="h-full rounded-full bg-aic-copper"
                                style={{ width: `${s.alignment}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold font-mono text-gray-500">{s.alignment}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-gray-400 font-mono text-sm">{s.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
