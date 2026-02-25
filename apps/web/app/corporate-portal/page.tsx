"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Download,
  ArrowRight,
  Users,
  Building2,
  Clock,
  BarChart3,
  ChevronRight,
  Star,
  Zap,
  Globe,
  Lock,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1771931322109-180bb1b35bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjByaXNrJTIwbWFuYWdlbWVudCUyMGNvbXBsaWFuY2UlMjBhdWRpdHxlbnwxfHx8fDE3NzE5NjI2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080";

const certificationTiers = [
  {
    tier: "Foundation",
    code: "ISO/IEC 42001 – Level 1",
    price: "$12,400",
    duration: "4–6 weeks",
    color: "#1d4ed8",
    features: [
      "AI Risk Inventory Assessment",
      "Gap Analysis Report (50+ controls)",
      "AIMS Policy Template Package",
      "Readiness Scorecard",
      "1 Remediation Consultation Session",
    ],
    audience: "Organizations initiating AI governance programs",
  },
  {
    tier: "Professional",
    code: "ISO/IEC 42001 – Level 2",
    price: "$38,000",
    duration: "8–12 weeks",
    color: "#c9920a",
    featured: true,
    features: [
      "Full AIMS Implementation Audit",
      "Risk Treatment Plan Development",
      "ISO/IEC 42001 Certification (3-year cycle)",
      "Algorithmic Rights Compliance Review",
      "NIST AI RMF Cross-Mapping",
      "3 Surveillance Audits included",
      "Chief Risk Officer Briefing Package",
    ],
    audience: "Mid-to-large enterprises deploying AI at scale",
  },
  {
    tier: "Enterprise",
    code: "ISO/IEC 42001 – Level 3",
    price: "Custom",
    duration: "12–24 weeks",
    color: "#0f1f3d",
    features: [
      "Multi-site AIMS Certification",
      "Board-level AI Governance Assessment",
      "Regulatory Alignment (EU AI Act, CCPA, etc.)",
      "Dedicated Certification Manager",
      "Annual AI Maturity Benchmarking",
      "AIC Global AI Governance Index Listing",
      "White-glove Appeals Management",
      "Unlimited Surveillance Audits",
    ],
    audience: "Fortune 500 companies and regulated industries",
  },
];

const gapControls = [
  { domain: "AI Strategy & Governance", controls: 12, completed: 9, risk: "Low" },
  { domain: "Risk Management Framework", controls: 18, completed: 11, risk: "Medium" },
  { domain: "Data Governance & Privacy", controls: 15, completed: 13, risk: "Low" },
  { domain: "Model Lifecycle Management", controls: 20, completed: 8, risk: "High" },
  { domain: "Algorithmic Rights Compliance", controls: 10, completed: 4, risk: "High" },
  { domain: "Incident Response & Monitoring", controls: 14, completed: 10, risk: "Medium" },
  { domain: "Human Oversight Mechanisms", controls: 8, completed: 6, risk: "Low" },
  { domain: "Third-Party AI Procurement", controls: 11, completed: 5, risk: "High" },
];

const riskTemplates = [
  { title: "AI Risk Register Template", desc: "Comprehensive 200-row risk register aligned to ISO/IEC 42001 Annex A controls and NIST AI RMF categories.", type: "Excel / CSV", size: "248 KB" },
  { title: "AIMS Policy Framework", desc: "Pre-populated AI Management System policy templates for Board, Executive, and Operational levels.", type: "Word / PDF", size: "1.2 MB" },
  { title: "Algorithmic Impact Assessment", desc: "Structured AIA form for assessing high-risk AI system deployments under EU AI Act Article 9 requirements.", type: "PDF / Word", size: "387 KB" },
  { title: "Vendor AI Due Diligence Checklist", desc: "40-point checklist for evaluating third-party AI provider compliance and contractual accountability.", type: "PDF / Excel", size: "156 KB" },
  { title: "AI Incident Response Playbook", desc: "Step-by-step playbook for classifying, responding to, and reporting AI system failures or biased outcomes.", type: "PDF", size: "892 KB" },
  { title: "NIST AI RMF Gap Analysis Workbook", desc: "Structured workbook mapping current controls to GOVERN, MAP, MEASURE, and MANAGE functions.", type: "Excel", size: "312 KB" },
];

const certifiedOrgs = [
  { name: "Meridian Financial Group", sector: "Finance", tier: "Enterprise", since: "2024", score: 94 },
  { name: "NovaTech Healthcare Systems", sector: "Healthcare", tier: "Professional", since: "2024", score: 88 },
  { name: "Apex Logistics Corp.", sector: "Supply Chain", tier: "Professional", since: "2023", score: 85 },
  { name: "GlobalEdge Insurance", sector: "Insurance", tier: "Enterprise", since: "2025", score: 91 },
  { name: "Pinnacle HR Solutions", sector: "HR Technology", tier: "Foundation", since: "2025", score: 76 },
];

export default function CorporatePortal() {
  const [activeTab, setActiveTab] = useState<"certification" | "gap" | "templates" | "directory">("certification");
  const [searchOrg, setSearchOrg] = useState("");

  const [selectedRole, setSelectedRole] = useState<"Provider" | "Deployer" | "Integrator" | null>(null);
  const [uploadStatus, setUploadStatus] = useState<Record<string, boolean>>({});

  const filteredOrgs = certifiedOrgs.filter(
    (o) =>
      o.name.toLowerCase().includes(searchOrg.toLowerCase()) ||
      o.sector.toLowerCase().includes(searchOrg.toLowerCase())
  );

  const getCustomizedChecklist = (role: string) => {
    switch(role) {
      case "Provider": return ["Model Robustness Documentation", "Dataset Lineage Reports", "API Security Specs"];
      case "Deployer": return ["Human Oversight SOPs", "Impact Assessment Logs", "End-user Disclosure Notices"];
      case "Integrator": return ["Supply Chain Risk Review", "API Interoperability Audit", "Third-party Liability Mapping"];
      default: return [];
    }
  };

  return (
    <div>
      {/* ... (Hero remains the same) ... */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/70 to-[#0f1f3d]/40" />
        <div className="relative max-w-[1600px] mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-[#c9920a]" />
            <span className="text-[#c9920a] text-sm uppercase tracking-widest">Corporate Portal</span>
          </div>
          <h1 className="text-5xl text-white mb-4" style={{ fontFamily: "'Merriweather', serif", fontWeight: 700 }}>
            ISO/IEC 42001 Certification<br />
            <span className="text-[#c9920a]">for Your Organization</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mb-8">
            Achieve internationally recognized AI Management System certification. AIC's conformity assessment services help Chief Risk Officers build defensible, auditable AI governance programs.
          </p>
          
          {/* Security Notification */}
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3 text-emerald-400 text-sm backdrop-blur-sm max-w-xl">
            <Lock className="w-4 h-4 shrink-0" />
            <p><strong>Secure Data Handling:</strong> All sensitive audit evidence is processed via isolated hybrid agents. No raw data leaves your controlled environment.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab("certification")}
              className="bg-[#c9920a] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#b07d08] transition-colors"
            >
              View Certification Tiers
            </button>
            <button
              onClick={() => setActiveTab("gap")}
              className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Run Gap Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {[
              { id: "certification", label: "Certification Services", icon: Shield },
              { id: "gap", label: "Gap Analysis & Upload", icon: BarChart3 },
              { id: "templates", label: "Risk Templates", icon: FileText },
              { id: "directory", label: "Certified Organizations", icon: Building2 },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === id
                    ? "border-[#c9920a] text-[#0f1f3d]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 py-16">
        {/* Certification Services */}
        {activeTab === "certification" && (
          // ... (Existing Tiers code) ...
          <div>
            <div className="text-center mb-12">
              <span className="text-[#c9920a] text-sm uppercase tracking-widest">ISO/IEC 42001</span>
              <h2 className="text-3xl text-[#0f1f3d] mt-2 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                AI Management System Certification
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                Select the certification tier that matches your organization's AI deployment scale, regulatory exposure, and governance maturity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificationTiers.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative border rounded-2xl overflow-hidden ${tier.featured ? "shadow-2xl scale-105" : "shadow-sm"}`}
                >
                  {tier.featured && (
                    <div className="absolute top-0 left-0 right-0 text-center py-2 text-white text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: tier.color }}>
                      Most Popular
                    </div>
                  )}
                  <div className={`p-8 ${tier.featured ? "mt-8" : ""}`}>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: tier.color + "15" }}
                    >
                      <Shield className="w-5 h-5" style={{ color: tier.color }} />
                    </div>
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">{tier.code}</div>
                    <h3 className="text-xl font-bold text-[#0f1f3d] mb-1">{tier.tier}</h3>
                    <div className="text-2xl font-bold mb-1" style={{ color: tier.color }}>{tier.price}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-5">
                      <Clock className="w-3 h-3" />
                      {tier.duration} timeline
                    </div>
                    <p className="text-xs text-gray-500 mb-5 italic">{tier.audience}</p>
                    <ul className="space-y-2.5 mb-8">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tier.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="w-full py-3 rounded-xl text-sm font-medium transition-all"
                      style={{
                        backgroundColor: tier.featured ? tier.color : "transparent",
                        color: tier.featured ? "white" : tier.color,
                        border: `2px solid ${tier.color}`,
                      }}
                    >
                      {tier.price === "Custom" ? "Request Proposal" : "Begin Assessment"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Gap Analysis Tool & Upload */}
        {activeTab === "gap" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0f1f3d] mb-4">Step 1: Select Your AI Role</h2>
                <div className="grid grid-cols-3 gap-4">
                  {["Provider", "Deployer", "Integrator"].map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role as any)}
                      className={`p-4 border-2 rounded-xl text-center transition-all ${
                        selectedRole === role ? "border-[#c9920a] bg-[#c9920a]/5 text-[#0f1f3d]" : "border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-bold">{role}</div>
                      <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">ISO 42001 Path</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedRole && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#c9920a]" />
                      Customized {selectedRole} Checklist
                    </h3>
                    <div className="space-y-3">
                      {getCustomizedChecklist(selectedRole).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg border border-gray-100">
                          <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center shrink-0"></div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                      <Download className="w-5 h-5 text-[#c9920a]" />
                      Audit Evidence Upload
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Model Cards (ISO Annex B)", id: "model_cards" },
                        { label: "Bias Audit Reports", id: "bias_audits" },
                        { label: "Training Data Summaries", id: "data_summaries" },
                        { label: "Human Oversight SOPs", id: "human_ops" },
                      ].map((field) => (
                        <div key={field.id} className="p-4 border border-dashed border-gray-300 rounded-xl hover:border-[#c9920a] transition-colors cursor-pointer group">
                          <div className="text-sm font-semibold text-gray-700 mb-1">{field.label}</div>
                          <div className="text-xs text-gray-400">Click or drag to upload evidence</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              {/* Readiness summary */}
              <div className="sticky top-24 space-y-6">
                <div className="bg-[#0f1f3d] rounded-2xl p-6 text-white text-center">
                  <div className="text-5xl font-bold text-[#c9920a]">{selectedRole ? "42%" : "0%"}</div>
                  <div className="text-white/70 text-sm mt-1">Audit Readiness</div>
                  <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-2 bg-[#c9920a] transition-all duration-1000" style={{ width: selectedRole ? "42%" : "0%" }}></div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-amber-800">
                  <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Compliance Notice
                  </h4>
                  <p className="text-xs leading-relaxed">
                    Under the AIC Declaration of Algorithmic Rights, all {selectedRole || "organizations"} must maintain auditable logs of human decision recourse paths.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Templates */}
        {activeTab === "templates" && (
          <div>
            <div className="mb-10">
              <span className="text-[#c9920a] text-sm uppercase tracking-widest">Resources</span>
              <h2 className="text-3xl text-[#0f1f3d] mt-2 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                AI Risk Management Templates
              </h2>
              <p className="text-gray-500 max-w-2xl text-sm">
                AIC-developed tools and templates to accelerate your AI governance implementation. All templates are aligned to ISO/IEC 42001 and NIST AI RMF.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {riskTemplates.map((template, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-gray-100 rounded-xl p-6 bg-white hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0f1f3d]/5 flex items-center justify-center mb-4">
                    <FileText className="w-5 h-5 text-[#0f1f3d]" />
                  </div>
                  <h3 className="font-semibold text-[#0f1f3d] mb-2 text-sm">{template.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">{template.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-500">{template.type}</span>
                      <span className="text-xs text-gray-400">{template.size}</span>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-[#c9920a] font-medium hover:gap-2 transition-all">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium text-amber-800 mb-1">Templates Are Starting Points</div>
                <p className="text-amber-700 text-sm">
                  These templates are designed to support your AI governance program but do not constitute formal ISO/IEC 42001 certification or legal advice. Engage an AIC-certified assessor for compliance assurance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Certified Organizations Directory */}
        {activeTab === "directory" && (
          <div>
            <div className="mb-10">
              <span className="text-[#c9920a] text-sm uppercase tracking-widest">Public Directory</span>
              <h2 className="text-3xl text-[#0f1f3d] mt-2 mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                Certified Organizations
              </h2>
              <p className="text-gray-500 max-w-2xl text-sm">
                Publicly searchable registry of ISO/IEC 42001-certified organizations. This directory is maintained per IAF MLA public disclosure requirements.
              </p>
            </div>

            <div className="relative mb-6 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search organizations or sector..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f3d]/20"
                value={searchOrg}
                onChange={(e) => setSearchOrg(e.target.value)}
              />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f1f3d] text-white/70 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3">Organization</th>
                    <th className="text-left px-5 py-3">Sector</th>
                    <th className="text-left px-5 py-3">Tier</th>
                    <th className="text-left px-5 py-3 hidden md:table-cell">Certified Since</th>
                    <th className="text-left px-5 py-3">AI Maturity Score</th>
                    <th className="text-left px-5 py-3 hidden lg:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {filteredOrgs.map((org, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium text-[#0f1f3d] flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#c9920a]" />
                        {org.name}
                      </td>
                      <td className="px-5 py-4 text-gray-500">{org.sector}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          org.tier === "Enterprise" ? "bg-[#0f1f3d] text-white" :
                          org.tier === "Professional" ? "bg-[#c9920a]/10 text-[#c9920a]" :
                          "bg-blue-50 text-blue-700"
                        }`}>
                          {org.tier}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{org.since}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full bg-[#c9920a]" style={{ width: `${org.score}%` }}></div>
                          </div>
                          <span className="text-xs font-medium text-gray-700">{org.score}/100</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="flex items-center gap-1 text-green-600 text-xs">
                          <CheckCircle className="w-3.5 h-3.5" /> Active
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredOrgs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-gray-400 text-sm">
                        No certified organizations found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
