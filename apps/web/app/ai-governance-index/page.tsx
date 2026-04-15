'use client';

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Award,
  CheckCircle,
  Building2,
  Globe,
  Shield,
  FileText,
  Calendar,
  ExternalLink,
  Info,
  BadgeCheck,
  Scale,
  Users,
  MapPin,
  Lock,
  Zap,
  Fingerprint,
  History,
  FileSearch,
  AlertCircle,
  Download,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";

interface AuditEvent {
  date: string;
  type: string;
  result: "Pass" | "Minor NC" | "Major NC";
  auditor: string;
}

interface ComplianceMetric {
  framework: string;
  score: number;
  status: "Full" | "Partial" | "Critical";
}

interface CertifiedCompany {
  id: string;
  name: string;
  industry: string;
  location: string;
  certificationDate: string;
  expiryDate: string;
  status: "Active" | "Pending" | "Suspended";
  certificateNumber: string;
  scope: string;
  certifiedProfessionals: number;
  website: string;
  integrityScore: number;
  // New "Legit" Fields
  leadAuditor: string;
  accreditationBody: string;
  complianceMatrix: ComplianceMetric[];
  auditHistory: AuditEvent[];
  transparencyUrl: string;
  aiEthicsOfficer: string;
}

const companies: CertifiedCompany[] = [
  {
    id: "msft-001",
    name: "Microsoft Corporation",
    industry: "Technology",
    location: "Redmond, USA",
    certificationDate: "2025-01-15",
    expiryDate: "2028-01-14",
    status: "Active",
    certificateNumber: "AIC-2025-MSFT-001",
    scope: "Global Azure AI services and OpenAI integration layer including model safety guardrails and automated content moderation systems.",
    certifiedProfessionals: 142,
    website: "https://microsoft.com",
    integrityScore: 96,
    leadAuditor: "Dr. Sarah Chen (AIC Senior Fellow)",
    accreditationBody: "IAF MLA / SANAS Accredited",
    transparencyUrl: "https://microsoft.com/ai/transparency",
    aiEthicsOfficer: "Natasha Crampton",
    complianceMatrix: [
      { framework: "EU AI Act", score: 98, status: "Full" },
      { framework: "NIST AI RMF", score: 95, status: "Full" },
      { framework: "ISO/IEC 42001", score: 96, status: "Full" },
    ],
    auditHistory: [
      { date: "2025-01-15", type: "Certification Audit", result: "Pass", auditor: "AIC Global" },
      { date: "2024-11-20", type: "Stage 2 Technical Review", result: "Minor NC", auditor: "AIC Global" },
      { date: "2024-10-05", type: "Stage 1 Readiness", result: "Pass", auditor: "AIC Global" },
    ],
  },
  {
    id: "jpm-002",
    name: "JPMorgan Chase & Co.",
    industry: "Financial Services",
    location: "New York, USA",
    certificationDate: "2025-03-10",
    expiryDate: "2028-03-09",
    status: "Active",
    certificateNumber: "AIC-2025-JPM-002",
    scope: "Internal algorithmic credit scoring, fraud detection systems, and automated wealth management advisory engines.",
    certifiedProfessionals: 85,
    website: "https://jpmorganchase.com",
    integrityScore: 92,
    leadAuditor: "Marcus Thorne (Certified Lead Auditor)",
    accreditationBody: "IAF MLA Accredited",
    transparencyUrl: "https://jpmorganchase.com/ai-governance",
    aiEthicsOfficer: "James Cummins",
    complianceMatrix: [
      { framework: "EU AI Act", score: 91, status: "Full" },
      { framework: "NIST AI RMF", score: 93, status: "Full" },
      { framework: "SEC Rule 240", score: 94, status: "Full" },
    ],
    auditHistory: [
      { date: "2025-03-10", type: "Certification Audit", result: "Pass", auditor: "AIC Global" },
      { date: "2025-01-12", type: "Pre-assessment", result: "Pass", auditor: "AIC Global" },
    ],
  },
  {
    id: "fin-004",
    name: "Sovereign Bank",
    industry: "Financial Services",
    location: "Johannesburg, RSA",
    certificationDate: "2025-08-05",
    expiryDate: "2028-08-04",
    status: "Active",
    certificateNumber: "AIC-2025-SOV-004",
    scope: "Retail banking automated decision systems, customer risk profiles, and POPIA-compliant automated processing modules.",
    certifiedProfessionals: 12,
    website: "https://sovereign.bank",
    integrityScore: 94,
    leadAuditor: "Thabo Mbeki (AIC RSA Division)",
    accreditationBody: "SANAS / IAF MLA",
    transparencyUrl: "https://sovereign.bank/governance",
    aiEthicsOfficer: "Elena Rodriguez",
    complianceMatrix: [
      { framework: "POPIA Sec 71", score: 99, status: "Full" },
      { framework: "EU AI Act", score: 92, status: "Full" },
      { framework: "ISO/IEC 42001", score: 94, status: "Full" },
    ],
    auditHistory: [
      { date: "2025-08-05", type: "Certification Audit", result: "Pass", auditor: "AIC Africa" },
    ],
  },
];

function RegistryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<CertifiedCompany | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const companyId = searchParams.get("company");
    if (companyId) {
      const company = companies.find((c) => c.id === companyId);
      if (company) {
        setSelectedCompany(company);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const handleOpenModal = (company: CertifiedCompany) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("company", company.id);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const closeRegistryModal = () => {
    setIsModalOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("company");
    window.history.pushState(null, "", window.location.pathname);
  };

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleCompanies = filteredCompanies.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-[#0f1f3d] mb-4">AIC Verified Registry</h1>
        <p className="text-xl text-[#6b7280] max-w-3xl leading-relaxed">
          The central authority for algorithmic accountability. Search the official public registry of organizations 
          that have achieved AIC Certification and verified their commitment to responsible AI.
        </p>
      </div>

      <div className="mb-12">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
          <Input
            placeholder="Search by company name, industry, or certificate number..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(9);
            }}
            className="pl-12 h-14 bg-white border-[#e5e7eb] rounded-xl text-lg shadow-sm focus:ring-[#c9920a]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleCompanies.map((company) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="cursor-pointer"
            onClick={() => handleOpenModal(company)}
          >
            <Card className="p-8 h-full border-[#e5e7eb] hover:border-[#c9920a] hover:shadow-xl transition-all duration-300 bg-white group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-[#f0f4f8] rounded-xl group-hover:bg-[#c9920a]/10 transition-colors">
                  <Building2 className="w-7 h-7 text-[#0f1f3d] group-hover:text-[#c9920a]" />
                </div>
                <Badge className="bg-[#c9920a] text-white px-3 py-1">
                  <BadgeCheck className="w-3.5 h-3.5 mr-1" />
                  Verified
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-[#0f1f3d] mb-2">{company.name}</h3>
              <p className="text-[#6b7280] mb-6 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {company.industry} • {company.location}
              </p>
              
              <div className="space-y-4 pt-6 border-t border-[#f0f4f8]">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6b7280] font-medium uppercase tracking-wider text-[10px]">Registry Status</span>
                  <span className="text-[#10b981] font-bold px-2 py-0.5 bg-[#10b981]/10 rounded">{company.status}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6b7280] font-medium uppercase tracking-wider text-[10px]">Integrity Score</span>
                  <span className="text-[#0f1f3d] font-bold text-lg">{company.integrityScore}<span className="text-[10px] text-[#6b7280] font-normal">/100</span></span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {visibleCount < filteredCompanies.length && (
        <div className="mt-16 flex justify-center">
          <Button 
            onClick={() => setVisibleCount(prev => prev + 9)}
            variant="outline"
            className="px-12 py-6 rounded-full border-2 border-[#0f1f3d] text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white font-bold transition-all text-lg"
          >
            Load More Verified Organizations
          </Button>
        </div>
      )}

      {/* Expanded Modal (50% Width / Notion Style) */}
      <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeRegistryModal()}>
        <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto p-0 border-none bg-white rounded-2xl shadow-2xl flex flex-col">
          {selectedCompany && (
            <div className="relative">
              {/* Header Visual */}
              <div className="h-40 bg-gradient-to-br from-[#0a1628] via-[#1a3160] to-[#0a1628] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
              </div>
              
              <div className="px-12 pb-16 relative">
                {/* Profile Floating Info */}
                <div className="flex flex-col md:flex-row gap-8 items-start -mt-12 mb-12">
                  <div className="bg-white p-6 rounded-3xl shadow-2xl border border-[#f0f4f8] z-10">
                    <Building2 className="w-16 h-16 text-[#c9920a]" />
                  </div>
                  <div className="flex-1 pt-4">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-4xl font-bold text-[#0f1f3d]">{selectedCompany.name}</h2>
                      <Badge className="bg-[#10b981] text-white px-3 py-1 text-xs">
                        {selectedCompany.status} Certification
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-6 items-center text-[#6b7280] font-medium">
                      <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-[#c9920a]" /> {selectedCompany.website}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#c9920a]" /> {selectedCompany.location}</span>
                      <span className="flex items-center gap-1.5"><Fingerprint className="w-4 h-4 text-[#c9920a]" /> {selectedCompany.certificateNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                  {/* Main Info Column */}
                  <div className="lg:col-span-8 space-y-12">
                    {/* Official Scope */}
                    <section>
                      <h4 className="flex items-center gap-2 text-[#0f1f3d] font-bold uppercase tracking-[0.2em] text-[10px] mb-6 border-b border-[#f0f4f8] pb-4">
                        <Shield className="w-4 h-4 text-[#c9920a]" /> Verified Certification Scope
                      </h4>
                      <p className="text-xl text-[#0f1f3d] leading-relaxed font-serif italic border-l-4 border-[#c9920a] pl-8 py-4 bg-[#f0f4f8]/30 rounded-r-2xl">
                        &quot;{selectedCompany.scope}&quot;
                      </p>
                    </section>

                    {/* Framework Alignment Matrix */}
                    <section>
                      <h4 className="flex items-center gap-2 text-[#0f1f3d] font-bold uppercase tracking-[0.2em] text-[10px] mb-8 border-b border-[#f0f4f8] pb-4">
                        <Scale className="w-4 h-4 text-[#c9920a]" /> Regulatory Alignment Matrix
                      </h4>
                      <div className="grid sm:grid-cols-3 gap-6">
                        {selectedCompany.complianceMatrix.map((item, idx) => (
                          <div key={idx} className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest mb-4">{item.framework}</div>
                            <div className="flex items-end gap-2">
                              <span className="text-3xl font-bold text-[#0f1f3d]">{item.score}%</span>
                              <Badge className="mb-1.5 bg-[#f0f4f8] text-[#0f1f3d] text-[10px] border-none">{item.status}</Badge>
                            </div>
                            <div className="w-full bg-[#f0f4f8] h-1.5 rounded-full mt-4">
                              <div className="bg-[#c9920a] h-full rounded-full" style={{ width: `${item.score}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Audit History Timeline */}
                    <section>
                      <h4 className="flex items-center gap-2 text-[#0f1f3d] font-bold uppercase tracking-[0.2em] text-[10px] mb-8 border-b border-[#f0f4f8] pb-4">
                        <History className="w-4 h-4 text-[#c9920a]" /> Independent Audit Trail
                      </h4>
                      <div className="space-y-4">
                        {selectedCompany.auditHistory.map((event, idx) => (
                          <div key={idx} className="flex items-center justify-between p-5 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb]">
                            <div className="flex items-center gap-6">
                              <div className="text-sm font-bold text-[#0f1f3d] w-24">{event.date}</div>
                              <div>
                                <div className="text-sm font-semibold text-[#0f1f3d]">{event.type}</div>
                                <div className="text-xs text-[#6b7280]">Audited by {event.auditor}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                                event.result === 'Pass' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-[#c9920a]/10 text-[#c9920a]'
                              }`}>
                                {event.result}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Sidebar Info Column */}
                  <div className="lg:col-span-4 space-y-8">
                    {/* Verification Seal */}
                    <Card className="p-8 border-2 border-[#0f1f3d] bg-[#0a1628] text-white rounded-[2rem] overflow-hidden relative group">
                      <Zap className="absolute -right-4 -top-4 w-24 h-24 text-[#c9920a] opacity-10 group-hover:rotate-12 transition-transform" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 text-[#c9920a] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
                          <Award className="w-4 h-4" /> Integrity Seal
                        </div>
                        <div className="text-5xl font-bold mb-2">{selectedCompany.integrityScore}</div>
                        <div className="text-[#6b7280] text-xs uppercase tracking-widest mb-8">Aggregate AIC Score</div>
                        
                        <div className="space-y-4 pt-8 border-t border-white/10">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-[#6b7280] uppercase tracking-widest font-bold">Lead Auditor</span>
                            <span className="text-sm font-medium">{selectedCompany.leadAuditor}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-[#6b7280] uppercase tracking-widest font-bold">AI Ethics Officer</span>
                            <span className="text-sm font-medium">{selectedCompany.aiEthicsOfficer}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-[#6b7280] uppercase tracking-widest font-bold">Valid Until</span>
                            <span className="text-sm font-medium text-[#c9920a]">{selectedCompany.expiryDate}</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Official Documents */}
                    <div className="space-y-3">
                      <Button className="w-full justify-between h-14 rounded-2xl bg-[#f0f4f8] text-[#0f1f3d] hover:bg-[#e5e7eb] border-none shadow-sm">
                        Certification Report (PDF) <Download className="w-4 h-4" />
                      </Button>
                      <Button className="w-full justify-between h-14 rounded-2xl bg-[#f0f4f8] text-[#0f1f3d] hover:bg-[#e5e7eb] border-none shadow-sm">
                        Transparency Disclosure <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" className="w-full justify-center text-xs text-[#6b7280] hover:text-[#d4183d]">
                        <AlertCircle className="w-3 h-3 mr-2" /> Report Audit Discrepancy
                      </Button>
                    </div>

                    {/* QR Placeholder */}
                    <div className="p-8 border-2 border-dashed border-[#e5e7eb] rounded-[2rem] flex flex-col items-center justify-center text-center">
                      <div className="w-32 h-32 bg-[#f0f4f8] rounded-2xl mb-4 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-[#6b7280] opacity-20" />
                      </div>
                      <span className="text-[10px] text-[#6b7280] uppercase font-bold tracking-widest">Scan to Verify Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AIGovernanceIndexPage() {
  return (
    <div className="bg-[#fcfcfd] min-h-screen">
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Registry...</div>}>
        <RegistryContent />
      </Suspense>

      {/* Methodology Section */}
      <section className="py-24 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 text-[#c9920a] mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">The Global Benchmark for AI Integrity</h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
            The AIC Registry is the world&apos;s most trusted record of algorithmic accountability. Organizations listed here
            have undergone rigorous technical and ethical audits to verify their compliance with global standards.
          </p>
          <div className="flex flex-wrap gap-8 justify-center opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#c9920a]" />
              <span className="text-sm font-medium tracking-wide">Independent Third-Party Audits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#c9920a]" />
              <span className="text-sm font-medium tracking-wide">ISO/IEC 42001 Alignment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#c9920a]" />
              <span className="text-sm font-medium tracking-wide">Quarterly Integrity Monitoring</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
