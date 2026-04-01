"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, TrendingUp, TrendingDown, Minus, Download, Search, ChevronDown, Award, AlertTriangle, CheckCircle, Info, Building2, Globe, Users, Shield, Loader2, RefreshCw } from "lucide-react";

// Simplified UI components for web app
const Button = ({ children, className, variant, size }: any) => (
  <button className={`px-4 py-2 rounded-lg font-medium transition-all ${variant === 'outline' ? 'border border-aic-navy text-aic-navy hover:bg-aic-navy/5' : 'bg-aic-navy text-white hover:bg-aic-navy/90'} ${className}`}>
    {children}
  </button>
);

const Card = ({ children, className, onClick }: any) => (
  <div onClick={onClick} className={`bg-white border border-gray-100 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className, variant }: any) => (
  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${variant === 'outline' ? 'border border-current' : ''} ${className}`}>
    {children}
  </span>
);

type MaturityLevel = "Leading" | "Established" | "Developing" | "Emerging" | "Basic";
type TrendDirection = "up" | "down" | "stable";

interface CompanyData {
  id: string;
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
  hasAICertification: boolean;
}

const maturityLevelColors: Record<MaturityLevel, { bg: string; text: string; border: string }> = {
  Leading: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  Established: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Developing: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Emerging: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  Basic: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

export default function AIGovernanceIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [sortBy, setSortBy] = useState<"rank" | "maturity" | "board" | "rights">("rank");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.aiccertified.cloud';
        const res = await fetch(`${baseUrl}/api/public/leaderboard${selectedIndustry !== 'all' ? `?industry=${selectedIndustry}` : ''}`);
        if (res.ok) {
          const rawData = await res.json();
          const mapped: CompanyData[] = rawData.map((row: any, i: number) => ({
            id: row.id,
            rank: i + 1,
            company: row.company,
            industry: row.industry,
            maturityScore: row.maturityScore || 0,
            maturityLevel: row.maturityScore >= 85 ? 'Leading' : row.maturityScore >= 75 ? 'Established' : row.maturityScore >= 60 ? 'Developing' : 'Emerging',
            boardOversight: row.boardOversight,
            rightsCompliance: row.rightsCompliance,
            transparency: row.transparency,
            riskManagement: row.riskManagement,
            trend: row.trend || 'stable',
            rankChange: 0,
            hasAICertification: row.hasAICertification
          }));
          setCompanies(mapped);
        } else {
            // Mock data for JSE Top 40 if API fails
            setCompanies([
                { id: "1", rank: 1, company: "Investec", industry: "Financial Services", maturityScore: 82, maturityLevel: "Established", boardOversight: 85, rightsCompliance: 80, transparency: 78, riskManagement: 85, trend: "up", rankChange: 0, hasAICertification: true },
                { id: "2", rank: 2, company: "Discovery", industry: "Insurance", maturityScore: 78, maturityLevel: "Established", boardOversight: 82, rightsCompliance: 75, transparency: 72, riskManagement: 83, trend: "stable", rankChange: 0, hasAICertification: false },
                { id: "3", rank: 3, company: "Standard Bank", industry: "Financial Services", maturityScore: 71, maturityLevel: "Developing", boardOversight: 75, rightsCompliance: 68, transparency: 65, riskManagement: 76, trend: "up", rankChange: 1, hasAICertification: false },
                { id: "4", rank: 4, company: "Naspers", industry: "Technology", maturityScore: 68, maturityLevel: "Developing", boardOversight: 70, rightsCompliance: 62, transparency: 75, riskManagement: 65, trend: "down", rankChange: -1, hasAICertification: false },
            ]);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, [selectedIndustry]);

  const industries = ["all", ...Array.from(new Set(companies.map((c) => c.industry)))];

  const filteredCompanies = companies
    .filter((c) => {
      const matchesSearch = c.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = selectedIndustry === "all" || c.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "maturity":
          return b.maturityScore - a.maturityScore;
        case "board":
          return b.boardOversight - a.boardOversight;
        case "rights":
          return b.rightsCompliance - a.rightsCompliance;
        default:
          return a.rank - b.rank;
      }
    });

  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="bg-aic-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-aic-copper via-transparent to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-aic-copper" />
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono">
                JSE Top 40 AI Maturity Rankings
              </span>
            </div>
            <h1 className="text-5xl mb-6 font-serif italic">
              South African AI Governance Index
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              The benchmark ranking of South Africa's largest listed companies based on AI maturity, 
              POPIA Section 71 compliance, and board-level accountability.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="bg-aic-copper hover:bg-aic-copper/90 text-white px-8 py-4 font-bold">
                <Download className="w-4 h-4 mr-2" />
                Download Q1 2026 Report
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4">
                Our Methodology
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "40", label: "Companies Tracked", icon: Building2 },
              { value: "54", label: "Avg Maturity Score", icon: BarChart3 },
              { value: "15%", label: "POPIA 71 Ready", icon: Shield },
              { value: "R 2.4B", label: "Est. Compliance Gap", icon: AlertTriangle },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center md:items-start p-6 bg-aic-paper rounded-xl"
                >
                  <Icon className="w-5 h-5 text-aic-copper mb-2" />
                  <div className="text-3xl font-bold text-aic-navy font-mono">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Index Table */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-serif text-aic-navy mb-2">Corporate Rankings</h2>
              <p className="text-gray-500">Based on public disclosures and AIC verified data.</p>
            </div>
            <div className="flex gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        placeholder="Search JSE Top 40..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-aic-paper border-none rounded-lg focus:ring-2 focus:ring-aic-copper/50 text-sm"
                    />
                </div>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-10 h-10 animate-spin text-aic-copper" />
                <p className="text-gray-500 font-mono text-sm">Querying Governance Index...</p>
              </div>
            ) : (
              filteredCompanies.map((company, i) => {
                const isExpanded = expandedRow === company.id;
                const maturityColors = maturityLevelColors[company.maturityLevel];

                return (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className={`overflow-hidden transition-all cursor-pointer hover:border-aic-copper/30 ${
                        isExpanded ? "ring-2 ring-aic-copper" : ""
                      }`}
                      onClick={() => setExpandedRow(isExpanded ? null : company.id)}
                    >
                      {/* Main Row */}
                      <div className="p-6">
                        <div className="flex items-center gap-6">
                          {/* Rank */}
                          <div className="w-12 text-center">
                            <div className="text-3xl font-bold text-aic-navy font-mono">#{company.rank}</div>
                          </div>

                          {/* Company Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-bold text-aic-navy truncate font-serif">{company.company}</h3>
                              {company.hasAICertification && (
                                <Badge className="bg-aic-copper text-white shrink-0">
                                  <Shield className="w-3 h-3 mr-1" />
                                  AIC Certified
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 font-mono uppercase tracking-wider">
                              {company.industry}
                            </div>
                          </div>

                          {/* Maturity Score */}
                          <div className="text-center hidden sm:block px-6 border-l border-aic-paper">
                            <div className="text-2xl font-bold text-aic-navy font-mono">{company.maturityScore}</div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Score</div>
                          </div>

                          {/* Maturity Level */}
                          <div className="hidden md:block">
                            <Badge
                              className={`${maturityColors.bg} ${maturityColors.text} border ${maturityColors.border}`}
                            >
                              {company.maturityLevel}
                            </Badge>
                          </div>

                          {/* Trend */}
                          <div className="flex items-center gap-4">
                            {company.trend === "up" ? <TrendingUp className="w-5 h-5 text-green-600" /> : <TrendingDown className="w-5 h-5 text-red-600" />}
                            <ChevronDown
                              className={`w-6 h-6 text-gray-300 transition-transform ${
                                isExpanded ? "rotate-180 text-aic-copper" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="border-t border-aic-paper bg-aic-paper/30 p-8"
                        >
                                                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                    {[
                                                      { label: "Board Oversight", score: company.boardOversight, icon: Users },
                                                      { label: "Rights Compliance", score: company.rightsCompliance, icon: Shield },
                                                      { label: "Transparency", score: company.transparency, icon: Globe },
                                                      { label: "Risk Management", score: company.riskManagement, icon: AlertTriangle },
                                                    ].map((metric, j) => {
                                                      const Icon = metric.icon;
                                                      return (
                                                        <div key={j} className="bg-white rounded-xl p-6 shadow-sm">
                                                          <div className="flex items-center gap-2 mb-4">
                                                            <Icon className="w-4 h-4 text-aic-copper" />
                                                            <span className="text-xs text-gray-500 uppercase tracking-widest font-mono font-bold">{metric.label}</span>
                                                          </div>
                                                          <div className="text-3xl font-bold text-aic-navy mb-4 font-mono">{metric.score}</div>
                                                          <div className="w-full bg-aic-paper rounded-full h-1.5">
                                                            <div
                                                              className="bg-aic-navy h-full transition-all"
                                                              style={{ width: `${metric.score}%` }}
                                                            />
                                                          </div>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                          
                                                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                                                    <div className="flex items-center gap-6 text-sm">
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                alert("Human Review Requested: An AIC lead auditor will verify this assessment.");
                                                            }}
                                                            className="flex items-center gap-2 text-aic-copper hover:text-aic-navy transition-colors font-bold font-mono text-xs uppercase tracking-widest"
                                                        >
                                                            <RefreshCw className="w-4 h-4" /> Request Human Review
                                                        </button>
                                                    </div>
                                                    <Button variant="outline" className="text-xs uppercase tracking-widest font-bold font-mono">
                                                      View Full Profile
                                                    </Button>
                                                  </div>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-aic-paper">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-6 text-aic-copper" />
          <h2 className="text-4xl mb-6 font-serif italic">
            Improve Your JSE Ranking
          </h2>
          <p className="text-gray-600 mb-10 text-xl leading-relaxed">
            Founding Partners receive an immediate 15-point maturity score boost through verified 
            human accountability workflows.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
                href="/alpha-apply"
                className="inline-flex items-center gap-2 bg-aic-navy text-white px-10 py-4 rounded-lg font-bold hover:bg-aic-navy-mid transition-all shadow-lg"
            >
                Apply for Founding Slot
            </Link>
            <Button variant="outline" className="px-10 py-4 font-bold">
              Review Methodology
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
