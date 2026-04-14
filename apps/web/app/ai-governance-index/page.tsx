'use client';

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
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

const heroBg = "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwYnVzaW5lc3MlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzc1MjQ4MTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

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
  {
    rank: 6,
    company: "Walmart Inc.",
    industry: "Retail",
    maturityScore: 82,
    maturityLevel: "Established",
    boardOversight: 80,
    rightsCompliance: 85,
    transparency: 81,
    riskManagement: 82,
    trend: "stable",
    rankChange: 0,
    certifiedProfessionals: 4,
    hasAICertification: false,
  },
  {
    rank: 7,
    company: "Pfizer Inc.",
    industry: "Healthcare",
    maturityScore: 80,
    maturityLevel: "Established",
    boardOversight: 83,
    rightsCompliance: 79,
    transparency: 78,
    riskManagement: 80,
    trend: "up",
    rankChange: 2,
    certifiedProfessionals: 3,
    hasAICertification: true,
  },
  {
    rank: 8,
    company: "Amazon.com Inc.",
    industry: "Technology",
    maturityScore: 78,
    maturityLevel: "Established",
    boardOversight: 74,
    rightsCompliance: 81,
    transparency: 76,
    riskManagement: 82,
    trend: "down",
    rankChange: -3,
    certifiedProfessionals: 9,
    hasAICertification: false,
  },
  {
    rank: 9,
    company: "Goldman Sachs Group",
    industry: "Financial Services",
    maturityScore: 76,
    maturityLevel: "Established",
    boardOversight: 79,
    rightsCompliance: 75,
    transparency: 74,
    riskManagement: 76,
    trend: "stable",
    rankChange: 0,
    certifiedProfessionals: 7,
    hasAICertification: true,
  },
  {
    rank: 10,
    company: "Tesla Inc.",
    industry: "Automotive",
    maturityScore: 74,
    maturityLevel: "Developing",
    boardOversight: 70,
    rightsCompliance: 77,
    transparency: 72,
    riskManagement: 78,
    trend: "up",
    rankChange: 4,
    certifiedProfessionals: 2,
    hasAICertification: false,
  },
];

const maturityLevelColors: Record<MaturityLevel, { bg: string; text: string; border: string }> = {
  Leading: { bg: "bg-white", text: "text-[#0f1f3d]", border: "border-[#e5e7eb]" },
  Established: { bg: "bg-[#f0f4f8]", text: "text-[#0f1f3d]", border: "border-[#e5e7eb]" },
  Developing: { bg: "bg-[#c9920a]/10", text: "text-[#c9920a]", border: "border-[#c9920a]/20" },
  Emerging: { bg: "bg-[#1a3160]/10", text: "text-[#1a3160]", border: "border-[#e5e7eb]" },
  Basic: { bg: "bg-[#0a1628]/5", text: "text-[#0a1628]", border: "border-[#e5e7eb]" },
};

const industries = ["all", ...Array.from(new Set(companies.map((c) => c.industry)))];

export default function AIGovernanceIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [sortBy, setSortBy] = useState<"rank" | "maturity" | "board" | "rights">("rank");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

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

  const getTrendIcon = (trend: TrendDirection) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-[#c9920a]" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-[#d4183d]" />;
    return <Minus className="w-4 h-4 text-[#6b7280]/60" />;
  };

  const getRankChangeDisplay = (change: number) => {
    if (change === 0) return <span className="text-[#6b7280]/60">—</span>;
    if (change > 0) return <span className="text-[#c9920a]">+{change}</span>;
    return <span className="text-[#d4183d]">{change}</span>;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-12 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-[#0a1628]/40" />
        <div className="absolute inset-0 subtle-grid opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-[#c9920a]" />
              <span className="eyebrow text-[#c9920a]">
                Fortune 500 AI Maturity Rankings
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white mb-6">
              Global AI Governance Index
            </h1>
            <p className="text-xl text-white/80 max-w-3xl leading-[1.65]">
              The definitive ranking of Fortune 500 companies based on AI maturity, board oversight, algorithmic rights
              compliance, and human accountability. Updated quarterly.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="bg-[#c9920a] hover:bg-[#b07d08] text-white px-7 py-3">
                <Download className="w-4 h-4 mr-2" />
                Download Full Report (Q1 2026)
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-[#f0f4f8] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500", label: "Companies Tracked", icon: Building2 },
              { value: "72", label: "Average Maturity Score", icon: BarChart3 },
              { value: "23%", label: "With Board AI Committees", icon: Users },
              { value: "142", label: "AIC-Certified Orgs", icon: Award },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-5 h-5 text-[#c9920a] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#0f1f3d]">{stat.value}</div>
                  <div className="text-sm text-[#6b7280] mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#f0f4f8] border-[#e5e7eb]"
              />
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full md:w-64 bg-[#f0f4f8] border-[#e5e7eb]">
                <SelectValue placeholder="Filter by Industry" />
              </SelectTrigger>
              <SelectContent className="bg-[#f0f4f8]">
                <SelectItem value="all">All Industries</SelectItem>
                {industries.slice(1).map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="w-full md:w-64 bg-[#f0f4f8] border-[#e5e7eb]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#f0f4f8]">
                <SelectItem value="rank">Rank (Default)</SelectItem>
                <SelectItem value="maturity">Maturity Score</SelectItem>
                <SelectItem value="board">Board Oversight</SelectItem>
                <SelectItem value="rights">Rights Compliance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Main Index Table */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-[#0f1f3d]">Top 10 Rankings</h2>
              <p className="text-sm text-[#6b7280] mt-1">Based on Q1 2026 assessment cycle</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
              <Info className="w-4 h-4" />
              <span>Click row to expand details</span>
            </div>
          </div>

          <div className="space-y-3">
            {filteredCompanies.map((company, i) => {
              const isExpanded = expandedRow === company.rank;
              const maturityColors = maturityLevelColors[company.maturityLevel];

              return (
                <motion.div
                  key={company.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    className={`overflow-hidden transition-all cursor-pointer hover:shadow-lg bg-[#f0f4f8] border-[#e5e7eb] ${
                      isExpanded ? "ring-2 ring-[#c9920a]" : ""
                    }`}
                    onClick={() => setExpandedRow(isExpanded ? null : company.rank)}
                  >
                    {/* Main Row */}
                    <div className="p-5">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="w-12 text-center">
                          <div className="text-2xl font-bold text-[#0f1f3d]">#{company.rank}</div>
                          <div className="text-xs text-[#6b7280] mt-0.5">
                            {getRankChangeDisplay(company.rankChange)}
                          </div>
                        </div>

                        {/* Company Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold text-[#0f1f3d] truncate m-0">{company.company}</h3>
                            {company.hasAICertification && (
                              <Badge className="bg-[#c9920a] text-white shrink-0 rounded">
                                <Shield className="w-3 h-3 mr-1" />
                                AIC Certified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                            <span>{company.industry}</span>
                            <span className="w-1 h-1 rounded-full bg-[#e5e7eb]"></span>
                            <span>{company.certifiedProfessionals} certified professionals</span>
                          </div>
                        </div>

                        {/* Maturity Score */}
                        <div className="text-center hidden sm:block">
                          <div className="text-2xl font-bold text-[#0f1f3d]">{company.maturityScore}</div>
                          <div className="text-xs text-[#6b7280]">Maturity</div>
                        </div>

                        {/* Maturity Level */}
                        <div className="hidden md:block">
                          <Badge
                            className={`${maturityColors.bg} ${maturityColors.text} border ${maturityColors.border} rounded`}
                          >
                            {company.maturityLevel}
                          </Badge>
                        </div>

                        {/* Trend */}
                        <div className="flex items-center gap-1">
                          {getTrendIcon(company.trend)}
                          <ChevronDown
                            className={`w-5 h-5 text-[#e5e7eb] transition-transform ${
                              isExpanded ? "rotate-180" : ""
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
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-[#e5e7eb] bg-white p-6"
                      >
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {[
                            {
                              label: "Board Oversight",
                              score: company.boardOversight,
                              icon: Users,
                              color: "text-[#c9920a]",
                            },
                            {
                              label: "Rights Compliance",
                              score: company.rightsCompliance,
                              icon: Shield,
                              color: "text-[#c9920a]",
                            },
                            {
                              label: "Transparency",
                              score: company.transparency,
                              icon: Globe,
                              color: "text-[#c9920a]",
                            },
                            {
                              label: "Risk Management",
                              score: company.riskManagement,
                              icon: AlertTriangle,
                              color: "text-[#c9920a]",
                            },
                          ].map((metric, j) => {
                            const Icon = metric.icon;
                            return (
                              <div key={j} className="bg-[#f0f4f8] border border-[#e5e7eb] rounded p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Icon className={`w-4 h-4 ${metric.color}`} />
                                  <span className="text-sm text-[#6b7280]">{metric.label}</span>
                                </div>
                                <div className="text-2xl font-bold text-[#0f1f3d] mb-2">{metric.score}</div>
                                <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                                  <div
                                    className="bg-[#c9920a] h-2 rounded-full transition-all"
                                    style={{ width: `${metric.score}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e5e7eb] flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                            {company.hasAICertification ? (
                              <div className="flex items-center gap-1 text-[#c9920a]">
                                <CheckCircle className="w-4 h-4" />
                                <span>ISO/IEC 42001 Certified</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-[#c9920a]">
                                <AlertTriangle className="w-4 h-4" />
                                <span>Certification Recommended</span>
                              </div>
                            )}
                          </div>
                          <Button size="sm" variant="outline" className="border-[#0a1628] text-[#0a1628] rounded">
                            View Full Profile
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#6b7280] mb-4">Showing top 10 of 500 companies</p>
            <Button variant="outline" className="border-[#0a1628] text-[#0a1628] rounded">View Full Index (500 Companies)</Button>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 lg:py-24 bg-[#f0f4f8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#0f1f3d] mb-3">
              Assessment Methodology
            </h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              Our index uses a rigorous, multi-dimensional framework aligned with international standards and the Declaration of Algorithmic Rights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                category: "Board Oversight",
                weight: "30%",
                criteria: ["Dedicated AI committee", "Executive accountability", "Risk reporting frequency"],
              },
              {
                category: "Rights Compliance",
                weight: "25%",
                criteria: ["Algorithmic transparency", "Explainability mechanisms", "Recourse processes"],
              },
              {
                category: "Transparency",
                weight: "25%",
                criteria: ["Public disclosures", "AI inventory", "Impact assessments"],
              },
              {
                category: "Risk Management",
                weight: "20%",
                criteria: ["ISO/IEC 42001 alignment", "Testing protocols", "Incident response"],
              },
            ].map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full bg-white border-[#e5e7eb] rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-[#0f1f3d] m-0">{method.category}</h3>
                    <Badge className="bg-[#c9920a] text-white rounded">{method.weight}</Badge>
                  </div>
                  <ul className="space-y-2">
                    {method.criteria.map((criterion, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#6b7280]">
                        <CheckCircle className="w-4 h-4 text-[#c9920a] shrink-0 mt-0.5" />
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white border border-[#e5e7eb] rounded">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#0f1f3d] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#0f1f3d] mb-2">Data Sources & Verification</h4>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Rankings are based on publicly available disclosures, regulatory filings, third-party audits, and
                  direct company submissions. All data is independently verified by AIC&apos;s Research Division and updated
                  quarterly. Companies may dispute rankings through our formal appeals process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 lg:py-24 bg-[#0a1628] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, #c9920a 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-[#c9920a]" />
          <h2 className="text-white mb-4">
            Improve Your Organization&apos;s Ranking
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            AIC certification demonstrates commitment to responsible AI governance and can significantly boost your
            maturity score. Schedule a gap analysis to identify opportunities for improvement.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-[#c9920a] hover:bg-[#b07d08] text-white px-8 py-3 rounded">
              Request Gap Analysis
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
