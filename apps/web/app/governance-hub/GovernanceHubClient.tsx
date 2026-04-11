'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Globe,
  Download,
  Search,
  ChevronDown,
  ChevronRight,
  Scale,
  Map,
  Newspaper,
  Loader2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface Right {
  article: string;
  icon: any;
  title: string;
  colorClass: string;
  iconClass: string;
  scope: string;
  obligations: string[];
  exceptions: string;
}

interface Standard {
  region: string;
  framework: string;
  status: string;
  level: string;
  year: string;
  alignment: number;
}

interface PolicyUpdate {
  id: string | number;
  date: string;
  tag: string;
  title: string;
  summary: string;
}

interface GovernanceHubClientProps {
  heroBg: string;
  rights: Right[];
  globalStandards: Standard[];
  initialPolicyUpdates: PolicyUpdate[];
  initialNextCursor: string | null;
}

export default function GovernanceHubClient({
  heroBg,
  rights,
  globalStandards,
  initialPolicyUpdates,
  initialNextCursor,
}: GovernanceHubClientProps) {
  const [expandedRight, setExpandedRight] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  
  const [policyUpdates, setPolicyUpdates] = useState<PolicyUpdate[]>(initialPolicyUpdates);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMorePolicies = async () => {
    if (!nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const res = await fetch(`/api/notion/policy-updates?cursor=${nextCursor}`);
      const data = await res.json();
      setPolicyUpdates(prev => [...prev, ...data.results]);
      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error("Failed to load more policies:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const filteredStandards = globalStandards.filter(
    (s) =>
      (selectedRegion === "All Regions" || s.region === selectedRegion) &&
      (s.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.framework.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 to-[#0f1f3d]/85" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-[#c9920a]" />
            <span className="text-[#c9920a] text-sm uppercase tracking-widest">Governance Hub</span>
          </div>
          <h1 className="text-5xl text-white mb-4" style={{ fontFamily: "'Merriweather', serif", fontWeight: 700 }}>
            The Global Standard for<br />
            <span className="text-[#c9920a]">Algorithmic Rights</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mb-8">
            Access AIC&apos;s foundational Declaration of Algorithmic Rights, global standards maps, and real-time policy intelligence for researchers, regulators, and policymakers.
          </p>
          <div className="flex gap-4">
            <a
              href="#declaration"
              className="inline-flex items-center gap-2 bg-[#c9920a] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#b07d08] transition-colors"
            >
              <Scale className="w-4 h-4" /> Declaration of Rights
            </a>
            <a
              href="#standards-map"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors border border-white/20"
            >
              <Map className="w-4 h-4" /> Global Standards Map
            </a>
          </div>
        </div>
      </section>

      {/* Declaration of Algorithmic Rights */}
      <section id="declaration" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
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
                <a 
                  href="/AIC-Declaration-of-Algorithmic-Rights.pdf" 
                  download 
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-[#0f1f3d] text-white text-sm py-2.5 rounded-lg hover:bg-[#1a3160] transition-colors"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <span className="text-[#c9920a] text-sm uppercase tracking-widest">Global Overview</span>
            <h2 className="text-3xl text-[#0f1f3d] mt-2 mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
              AI Regulatory Standards Map
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl">
              Track the status of AI governance legislation and voluntary frameworks across major jurisdictions, and see how they align with AIC&apos;s Declaration of Algorithmic Rights.
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
              <option>All Regions</option>
              {globalStandards.map((s) => <option key={s.region}>{s.region}</option>)}
            </select>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
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
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
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
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1 }}
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

          {nextCursor && (
            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleLoadMorePolicies}
                disabled={isLoadingMore}
                className="bg-white border border-gray-200 text-[#0f1f3d] hover:bg-gray-50 px-8 py-6 h-auto text-base"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More Policy Updates"
                )}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
