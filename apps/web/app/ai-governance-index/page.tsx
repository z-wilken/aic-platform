"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Search,
  ChevronDown,
  Award,
  AlertTriangle,
  CheckCircle,
  Info,
  Building2,
  Globe,
  Users,
  Shield,
  ArrowRight,
} from "lucide-react";

// Relevant hero for Index/Data focus
const heroBg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000";

type MaturityLevel = "Leading" | "Established" | "Developing" | "Emerging" | "Basic";
type TrendDirection = "up" | "down" | "stable";

interface CompanyData {
  rank: number;
  company: string;
  industry: string;
  maturityScore: number;
  maturityLevel: MaturityLevel;
  boardOversight: number;
  rightsCompliance: number;
  transparency: number;
  riskManagement: number;
  trend: TrendDirection;
  rankChange: number;
  certifiedProfessionals: number;
  hasAICertification: boolean;
}

const companies: CompanyData[] = [
  {
    rank: 1,
    company: "Microsoft Corporation",
    industry: "Technology",
    maturityScore: 94,
    maturityLevel: "Leading",
    boardOversight: 96,
    rightsCompliance: 93,
    transparency: 92,
    riskManagement: 95,
    trend: "up",
    rankChange: 2,
    certifiedProfessionals: 12,
    hasAICertification: true,
  },
  {
    rank: 2,
    company: "JPMorgan Chase & Co.",
    industry: "Financial Services",
    maturityScore: 91,
    maturityLevel: "Leading",
    boardOversight: 94,
    rightsCompliance: 89,
    transparency: 90,
    riskManagement: 91,
    trend: "stable",
    rankChange: 0,
    certifiedProfessionals: 8,
    hasAICertification: true,
  },
  {
    rank: 3,
    company: "Johnson & Johnson",
    industry: "Healthcare",
    maturityScore: 89,
    maturityLevel: "Leading",
    boardOversight: 91,
    rightsCompliance: 88,
    transparency: 87,
    riskManagement: 90,
    trend: "up",
    rankChange: 1,
    certifiedProfessionals: 6,
    hasAICertification: true,
  },
  {
    rank: 4,
    company: "Alphabet Inc.",
    industry: "Technology",
    maturityScore: 87,
    maturityLevel: "Leading",
    boardOversight: 85,
    rightsCompliance: 90,
    transparency: 89,
    riskManagement: 84,
    trend: "down",
    rankChange: -1,
    certifiedProfessionals: 15,
    hasAICertification: true,
  },
  {
    rank: 5,
    company: "Bank of America Corp.",
    industry: "Financial Services",
    maturityScore: 85,
    maturityLevel: "Established",
    boardOversight: 88,
    rightsCompliance: 83,
    transparency: 84,
    riskManagement: 85,
    trend: "up",
    rankChange: 3,
    certifiedProfessionals: 5,
    hasAICertification: true,
  },
];

const maturityLevelColors: Record<MaturityLevel, string> = {
  Leading: "bg-green-100 text-green-700",
  Established: "bg-blue-100 text-blue-700",
  Developing: "bg-amber-100 text-amber-700",
  Emerging: "bg-orange-100 text-orange-700",
  Basic: "bg-red-100 text-red-700",
};

export default function AIGovernanceIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filteredCompanies = companies.filter((c) =>
    c.company.toLowerCase().includes(searchQuery.toLowerCase())
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
              <BarChart3 className="w-5 h-5 text-aic-gold" />
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Data & Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight">
              Global AI<br />
              <span className="text-aic-gold">Governance Index</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mb-10 leading-relaxed font-serif italic">
              The definitive ranking of Fortune 500 companies based on AI maturity, board oversight, and human accountability metrics. Updated quarterly.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-aic-gold text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-mono hover:bg-[#b07d08] transition-all shadow-lg shadow-aic-gold/20">
                Download Q1 2026 Report
              </button>
              <button className="bg-white/10 text-white border-2 border-white/20 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-mono hover:bg-white/20 transition-all">
                Methodology
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500", label: "Companies Tracked", icon: Building2 },
              { value: "72", label: "Average Maturity", icon: BarChart3 },
              { value: "23%", label: "Board Oversight", icon: Shield },
              { value: "142", label: "Certified Orgs", icon: Award },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <stat.icon className="w-5 h-5 text-aic-gold mx-auto mb-2" />
                <div className="text-3xl font-bold text-[#0f1f3d] font-mono">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Index Table */}
      <section className="py-24 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl text-[#0f1f3d] mb-2 font-bold">Quarterly Rankings</h2>
              <p className="text-gray-500 font-serif italic text-lg">Top 10 Global Leaders in Responsible AI Governance</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search index..."
                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-aic-gold/10 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-xl bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="bg-[#0f1f3d] text-white/70 text-[10px] uppercase tracking-[0.2em] font-mono">
                    <th className="text-left px-8 py-5">Rank</th>
                    <th className="text-left px-8 py-5">Organization</th>
                    <th className="text-left px-8 py-5">Maturity Score</th>
                    <th className="text-left px-8 py-5">Level</th>
                    <th className="text-left px-8 py-5">Status</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredCompanies.map((company, i) => {
                    const isExpanded = expandedRow === company.rank;
                    return (
                      <React.Fragment key={company.rank}>
                        <tr 
                          className="hover:bg-gray-50 transition-colors group cursor-pointer"
                          onClick={() => setExpandedRow(isExpanded ? null : company.rank)}
                        >
                          <td className="px-8 py-6 font-mono font-bold text-[#0f1f3d]">#{company.rank}</td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-[#0f1f3d] flex items-center gap-2">
                              {company.company}
                              {company.hasAICertification && <Shield className="w-4 h-4 text-aic-gold" />}
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">{company.industry}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div className="h-full bg-aic-gold transition-all duration-1000" style={{ width: `${company.maturityScore}%` }}></div>
                              </div>
                              <span className="text-xs font-bold font-mono text-gray-700">{company.maturityScore}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono ${maturityLevelColors[company.maturityLevel]}`}>
                              {company.maturityLevel}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            {company.trend === "up" ? <TrendingUp className="w-4 h-4 text-green-500" /> : <Minus className="w-4 h-4 text-gray-300" />}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <ChevronDown className={`w-5 h-5 text-gray-300 transition-transform ${isExpanded ? "rotate-180 text-aic-gold" : ""}`} />
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-aic-paper/30">
                            <td colSpan={6} className="px-8 py-10">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                  { label: "Board Oversight", val: company.boardOversight },
                                  { label: "Rights Compliance", val: company.rightsCompliance },
                                  { label: "Transparency", val: company.transparency },
                                  { label: "Risk Management", val: company.riskManagement },
                                ].map((m, idx) => (
                                  <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-2">{m.label}</div>
                                    <div className="text-2xl font-bold text-[#0f1f3d] font-mono">{m.val}</div>
                                    <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-aic-gold" style={{ width: `${m.val}%` }}></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology CTA */}
      <section className="py-24 bg-[#0f1f3d] text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-5 subtle-grid" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}>
            <h2 className="text-4xl mb-6">Improve Your Global Standing</h2>
            <p className="text-white/60 text-xl mb-10 font-serif italic">
              AIC certification demonstrates a verifiable commitment to human accountability and ethics, significantly impacting your quarterly maturity score.
            </p>
            <button className="bg-aic-gold text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest font-mono hover:bg-[#b07d08] transition-all shadow-2xl">
              Request Assessment Briefing
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
