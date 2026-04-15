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
    scope: "Global Azure AI services and OpenAI integration layer.",
    certifiedProfessionals: 142,
    website: "https://microsoft.com",
    integrityScore: 96,
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
    scope: "Internal algorithmic credit scoring and fraud detection systems.",
    certifiedProfessionals: 85,
    website: "https://jpmorganchase.com",
    integrityScore: 92,
  },
  {
    id: "health-003",
    name: "Lumina Health Systems",
    industry: "Healthcare",
    location: "London, UK",
    certificationDate: "2025-06-22",
    expiryDate: "2028-06-21",
    status: "Active",
    certificateNumber: "AIC-2025-LUM-003",
    scope: "AI-assisted diagnostic imaging and patient triage algorithms.",
    certifiedProfessionals: 34,
    website: "https://luminahealth.io",
    integrityScore: 89,
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
    scope: "Retail banking automated decision systems and customer risk profiles.",
    certifiedProfessionals: 12,
    website: "https://sovereign.bank",
    integrityScore: 94,
  },
  {
    id: "logi-005",
    name: "Nexus Logistics",
    industry: "Transportation",
    location: "Singapore",
    certificationDate: "2025-09-12",
    expiryDate: "2028-09-11",
    status: "Active",
    certificateNumber: "AIC-2025-NEX-005",
    scope: "Autonomous fleet routing and supply chain optimization engines.",
    certifiedProfessionals: 18,
    website: "https://nexuslogistics.sg",
    integrityScore: 85,
  },
];

function RegistryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<CertifiedCompany | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Deep Linking
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
    // Update URL without refreshing
    const params = new URLSearchParams(searchParams.toString());
    params.set("company", company.id);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Remove query param
    const params = new URLSearchParams(searchParams.toString());
    params.delete("company");
    window.history.pushState(null, "", pathname); // Need to define pathname or just use window.location.pathname
  };
  
  // Alternative to handleCloseModal that uses router
  const closeRegistryModal = () => {
    setIsModalOpen(false);
    router.push('/ai-governance-index', { scroll: false });
  };

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-[#0f1f3d] mb-4">AIC Verified Registry</h1>
        <p className="text-xl text-[#6b7280] max-w-3xl leading-relaxed">
          The central authority for algorithmic accountability. Search the official public registry of organizations 
          that have achieved AIC Certification and verified their commitment to responsible AI.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-12">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
          <Input
            placeholder="Search by company name, industry, or certificate number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 bg-white border-[#e5e7eb] rounded-xl text-lg shadow-sm focus:ring-[#c9920a]"
          />
        </div>
      </div>

      {/* Registry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="cursor-pointer"
            onClick={() => handleOpenModal(company)}
          >
            <Card className="p-6 h-full border-[#e5e7eb] hover:border-[#c9920a] hover:shadow-xl transition-all duration-300 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#f0f4f8] rounded-lg">
                  <Building2 className="w-6 h-6 text-[#0f1f3d]" />
                </div>
                <Badge className="bg-[#c9920a] text-white">
                  <BadgeCheck className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-[#0f1f3d] mb-1">{company.name}</h3>
              <p className="text-sm text-[#6b7280] mb-4">{company.industry} • {company.location}</p>
              
              <div className="space-y-3 pt-4 border-t border-[#f0f4f8]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Status</span>
                  <span className="text-[#10b981] font-bold">{company.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Integrity Score</span>
                  <span className="text-[#0f1f3d] font-bold">{company.integrityScore}/100</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Company Detail Modal (Notion-style) */}
      <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeRegistryModal()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white rounded-2xl shadow-2xl">
          {selectedCompany && (
            <div className="relative">
              {/* Cover/Header Area */}
              <div className="h-32 bg-gradient-to-r from-[#0a1628] to-[#1a3160]" />
              
              <div className="px-8 pb-12">
                {/* Floating Icon */}
                <div className="relative -top-8 bg-white p-4 rounded-2xl shadow-lg border border-[#f0f4f8] inline-block">
                  <Building2 className="w-12 h-12 text-[#c9920a]" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div>
                    <h2 className="text-4xl font-bold text-[#0f1f3d] mb-2">{selectedCompany.name}</h2>
                    <div className="flex flex-wrap gap-4 items-center text-[#6b7280]">
                      <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {selectedCompany.website}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {selectedCompany.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-[#10b981] text-white px-4 py-1.5 text-sm rounded-full">
                      {selectedCompany.status} Certification
                    </Badge>
                    <span className="text-xs font-mono text-[#6b7280] uppercase tracking-widest">
                      ID: {selectedCompany.certificateNumber}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-12">
                    {/* Scope Section */}
                    <section>
                      <h4 className="flex items-center gap-2 text-[#0f1f3d] font-bold uppercase tracking-wider text-sm mb-4">
                        <Shield className="w-4 h-4 text-[#c9920a]" /> Certification Scope
                      </h4>
                      <p className="text-lg text-[#0f1f3d] leading-relaxed font-serif italic border-l-4 border-[#c9920a] pl-6 py-2 bg-[#f0f4f8]/50 rounded-r-lg">
                        &quot;{selectedCompany.scope}&quot;
                      </p>
                    </section>

                    {/* Integrity Metrics */}
                    <section>
                      <h4 className="flex items-center gap-2 text-[#0f1f3d] font-bold uppercase tracking-wider text-sm mb-6">
                        <Scale className="w-4 h-4 text-[#c9920a]" /> Integrity Telemetry
                      </h4>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="text-sm text-[#6b7280] mb-2">Aggregate Score</div>
                          <div className="text-5xl font-bold text-[#c9920a]">{selectedCompany.integrityScore}<span className="text-2xl text-[#6b7280]/40">/100</span></div>
                        </div>
                        <div>
                          <div className="text-sm text-[#6b7280] mb-2">Accountable Personnel</div>
                          <div className="text-5xl font-bold text-[#0f1f3d]">{selectedCompany.certifiedProfessionals}<span className="text-lg text-[#6b7280]/40 ml-2 uppercase font-mono tracking-tighter">Certified</span></div>
                        </div>
                      </div>
                    </section>

                    {/* Disclaimer */}
                    <div className="p-6 bg-[#f0f4f8] rounded-xl border border-[#e5e7eb] flex gap-4">
                      <Info className="w-6 h-6 text-[#0f1f3d] shrink-0" />
                      <p className="text-sm text-[#6b7280] leading-relaxed">
                        This registry entry constitutes public evidence of certification. The scope of certification is limited 
                        to the systems and processes described above as verified during the most recent audit cycle.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="p-6 border-[#e5e7eb] shadow-sm bg-[#f9fafb]">
                      <h5 className="font-bold text-[#0f1f3d] mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#c9920a]" /> Audit Lifecycle
                      </h5>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-[#e5e7eb]">
                          <span className="text-xs text-[#6b7280] uppercase font-bold tracking-widest">Issued</span>
                          <span className="text-sm font-semibold">{selectedCompany.certificationDate}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[#e5e7eb]">
                          <span className="text-xs text-[#6b7280] uppercase font-bold tracking-widest">Expires</span>
                          <span className="text-sm font-semibold">{selectedCompany.expiryDate}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-xs text-[#6b7280] uppercase font-bold tracking-widest">Standards</span>
                          <span className="text-sm font-semibold">ISO/IEC 42001</span>
                        </div>
                      </div>
                      <Button className="w-full mt-8 bg-[#0a1628] hover:bg-[#1a3160] text-white">
                        <Lock className="w-3 h-3 mr-2" /> Verify via Ledger
                      </Button>
                    </Card>

                    <div className="flex flex-col gap-3">
                      <Button variant="outline" className="w-full justify-between">
                        Download Public PDF <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between">
                        Report Discrepancy <AlertTriangle className="w-4 h-4" />
                      </Button>
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

import { AlertTriangle } from "lucide-react";

export default function AIGovernanceIndexPage() {
  return (
    <div className="bg-[#fcfcfd] min-h-screen">
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Registry...</div>}>
        <RegistryContent />
      </Suspense>

      {/* Methodology Section (Simplified for Registry) */}
      <section className="py-24 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 text-[#c9920a] mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">The Global Benchmark for AI Integrity</h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
            The AIC Registry is the world&apos;s most trusted record of algorithmic accountability. Organizations listed here
            have undergone rigorous technical and ethical audits to verify their compliance with global standards.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#c9920a]" />
              <span>Independent Third-Party Audits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#c9920a]" />
              <span>ISO/IEC 42001 Alignment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#c9920a]" />
              <span>Quarterly Integrity Monitoring</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
