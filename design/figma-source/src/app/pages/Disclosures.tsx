import { useState } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Shield,
  Scale,
  Search,
  Download,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Globe,
  Lock,
  Users,
  Building2,
  Calendar,
  Eye,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface CertifiedOrganization {
  name: string;
  industry: string;
  certNumber: string;
  issueDate: string;
  expiryDate: string;
  status: "Active" | "Suspended" | "Expired";
  scope: string;
  country: string;
}

const certifiedOrgs: CertifiedOrganization[] = [
  {
    name: "Microsoft Corporation",
    industry: "Technology",
    certNumber: "AIC-42001-0012",
    issueDate: "January 15, 2025",
    expiryDate: "January 15, 2028",
    status: "Active",
    scope: "AI-powered cloud services and enterprise software",
    country: "United States",
  },
  {
    name: "JPMorgan Chase & Co.",
    industry: "Financial Services",
    certNumber: "AIC-42001-0034",
    issueDate: "March 8, 2025",
    expiryDate: "March 8, 2028",
    status: "Active",
    scope: "AI-driven risk assessment and fraud detection systems",
    country: "United States",
  },
  {
    name: "Siemens AG",
    industry: "Manufacturing",
    certNumber: "AIC-42001-0089",
    issueDate: "November 22, 2024",
    expiryDate: "November 22, 2027",
    status: "Active",
    scope: "Industrial automation and predictive maintenance AI",
    country: "Germany",
  },
  {
    name: "Johnson & Johnson",
    industry: "Healthcare",
    certNumber: "AIC-42001-0156",
    issueDate: "February 10, 2025",
    expiryDate: "February 10, 2028",
    status: "Active",
    scope: "Medical device AI and clinical decision support",
    country: "United States",
  },
  {
    name: "HSBC Holdings",
    industry: "Financial Services",
    certNumber: "AIC-42001-0201",
    issueDate: "December 5, 2024",
    expiryDate: "December 5, 2027",
    status: "Active",
    scope: "Credit scoring and anti-money laundering AI systems",
    country: "United Kingdom",
  },
];

const appealCases = [
  {
    caseId: "APP-2026-047",
    organization: "TechCorp Industries",
    dateSubmitted: "January 28, 2026",
    status: "Under Review",
    issue: "Certification decision dispute",
  },
  {
    caseId: "APP-2025-892",
    organization: "GlobalBank International",
    dateSubmitted: "December 12, 2025",
    status: "Resolved",
    issue: "Scope clarification request",
  },
  {
    caseId: "APP-2025-743",
    organization: "HealthAI Solutions",
    dateSubmitted: "October 20, 2025",
    status: "Resolved",
    issue: "Assessment timeline extension",
  },
];

export function Disclosures() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("impartiality");

  const filteredOrgs = certifiedOrgs.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.certNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3160] to-[#0a1628] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-[#c9920a]" />
              <span className="text-[#c9920a] text-sm uppercase tracking-widest font-medium">
                IAF MLA Mandatory Disclosures
              </span>
            </div>
            <h1 className="text-5xl mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Public Disclosures & Compliance
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              As an IAF Multilateral Recognition Arrangement (MLA) signatory, AIC maintains full transparency regarding
              our impartiality, accreditation status, certified organizations, and appeals processes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "IAF MLA Accredited", value: "Since 2023" },
              { icon: Globe, label: "Recognition", value: "100+ Countries" },
              { icon: Building2, label: "Certified Orgs", value: "340+" },
              { icon: Users, label: "Certified Professionals", value: "4,200+" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-6 h-6 text-[#c9920a] mx-auto mb-2" />
                  <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                  <div className="text-2xl font-bold text-[#0f1f3d]">{item.value}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="impartiality">Impartiality Statement</TabsTrigger>
              <TabsTrigger value="accreditation">Accreditation Status</TabsTrigger>
              <TabsTrigger value="directory">Certified Directory</TabsTrigger>
              <TabsTrigger value="appeals">Appeals Process</TabsTrigger>
            </TabsList>

            {/* Impartiality Statement */}
            <TabsContent value="impartiality">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#0f1f3d] rounded-lg flex items-center justify-center shrink-0">
                      <Scale className="w-6 h-6 text-[#c9920a]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#0f1f3d] mb-2">
                        Statement of Impartiality and Independence
                      </h2>
                      <p className="text-sm text-gray-500">Last updated: February 1, 2026</p>
                    </div>
                  </div>

                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div>
                      <h3 className="font-semibold text-[#0f1f3d] mb-2">Core Principle</h3>
                      <p>
                        The AI Certification Institute (AIC) operates as an independent, third-party accreditation and
                        certification body. We maintain strict impartiality in all certification activities and do not
                        provide consultancy services to organizations seeking certification.
                      </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-900 mb-2">Conflicts of Interest</h4>
                          <p className="text-sm text-amber-800">
                            AIC does <strong>not</strong> provide any of the following services to organizations it
                            certifies:
                          </p>
                          <ul className="mt-2 space-y-1 text-sm text-amber-800 list-disc list-inside">
                            <li>Management system implementation consulting</li>
                            <li>Internal audit services</li>
                            <li>Risk assessment design or execution</li>
                            <li>Policy or procedure development</li>
                            <li>Training that compromises impartiality</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#0f1f3d] mb-2">Independence Safeguards</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          {
                            title: "Financial Independence",
                            desc: "No single client represents more than 15% of annual revenue.",
                          },
                          {
                            title: "Personnel Separation",
                            desc: "Auditors cannot assess organizations they've consulted for within 3 years.",
                          },
                          {
                            title: "Board Oversight",
                            desc: "Independent ethics committee reviews all conflict of interest allegations.",
                          },
                          {
                            title: "Public Accountability",
                            desc: "Annual impartiality report published and audited by accreditation body.",
                          },
                        ].map((safeguard, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium text-[#0f1f3d] mb-1">{safeguard.title}</div>
                              <p className="text-sm text-gray-600">{safeguard.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#0f1f3d] mb-2">Reporting Concerns</h3>
                      <p className="mb-3">
                        If you believe AIC has violated its impartiality commitments, you may report concerns confidentially to:
                      </p>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-sm space-y-2">
                          <div>
                            <strong>Ethics Hotline:</strong> +1 (202) 555-0199 (24/7 voicemail)
                          </div>
                          <div>
                            <strong>Email:</strong> ethics@aic-cert.org
                          </div>
                          <div>
                            <strong>Postal Mail:</strong> AIC Ethics Committee, PO Box 8402, Washington, DC 20044
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 flex gap-3">
                      <Button className="bg-[#0f1f3d] hover:bg-[#1a3160] text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download Full Impartiality Policy (PDF)
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        IAF Impartiality Requirements
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Accreditation Status */}
            <TabsContent value="accreditation">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-6">
                  <Card className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-semibold text-[#0f1f3d]">Current Accreditation Status</h2>
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-500">Last verified: February 20, 2026</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          label: "Accrediting Body",
                          value: "ANAB (ANSI National Accreditation Board)",
                          icon: Building2,
                        },
                        {
                          label: "Accreditation Standard",
                          value: "ISO/IEC 17024:2012 (Personnel Certification)",
                          icon: FileText,
                        },
                        {
                          label: "Accreditation Number",
                          value: "PCT-1847",
                          icon: Lock,
                        },
                        {
                          label: "Valid Through",
                          value: "December 31, 2027",
                          icon: Calendar,
                        },
                        {
                          label: "IAF MLA Signatory",
                          value: "Yes (Full Recognition)",
                          icon: Globe,
                        },
                        {
                          label: "Last Surveillance Audit",
                          value: "November 2025 (No findings)",
                          icon: Eye,
                        },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="flex items-start gap-3 p-4 bg-[#f8fafc] rounded-lg">
                            <Icon className="w-5 h-5 text-[#c9920a] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                              <div className="font-medium text-[#0f1f3d]">{item.value}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  <Card className="p-8">
                    <h3 className="font-semibold text-[#0f1f3d] mb-4">What IAF MLA Recognition Means</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      The International Accreditation Forum (IAF) Multilateral Recognition Arrangement (MLA) ensures that
                      certificates issued by AIC are recognized globally. This means organizations certified by AIC do not
                      need additional certifications when operating in other countries within the MLA network.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { region: "North America", signatories: "4" },
                        { region: "Europe", signatories: "32" },
                        { region: "Asia-Pacific", signatories: "28" },
                        { region: "Latin America", signatories: "12" },
                        { region: "Africa", signatories: "14" },
                        { region: "Middle East", signatories: "10" },
                      ].map((region, i) => (
                        <div key={i} className="text-center p-4 bg-[#f8fafc] rounded-lg border border-gray-200">
                          <Globe className="w-6 h-6 text-[#c9920a] mx-auto mb-2" />
                          <div className="font-semibold text-[#0f1f3d]">{region.region}</div>
                          <div className="text-sm text-gray-500">{region.signatories} MLA Signatories</div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <div className="flex gap-3">
                    <Button className="bg-[#0f1f3d] hover:bg-[#1a3160] text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Accreditation Certificate
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Verify on ANAB Registry
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Certified Directory */}
            <TabsContent value="directory">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-8 mb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-[#0f1f3d] mb-2">
                        ISO/IEC 42001 Certified Organizations
                      </h2>
                      <p className="text-sm text-gray-500">
                        Public registry of all organizations with active AIC certifications. Updated daily.
                      </p>
                    </div>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>

                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by organization name, industry, or certificate number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="space-y-4">
                    {filteredOrgs.map((org, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-[#0f1f3d] text-lg">{org.name}</h3>
                              <Badge
                                className={
                                  org.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : org.status === "Suspended"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-red-100 text-red-700"
                                }
                              >
                                {org.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-500">
                              {org.industry} • {org.country}
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500 mb-1">Certificate Number</div>
                            <div className="font-mono text-[#0f1f3d]">{org.certNumber}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Validity Period</div>
                            <div className="text-gray-700">
                              {org.issueDate} — {org.expiryDate}
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-gray-500 mb-1">Certification Scope</div>
                            <div className="text-gray-700">{org.scope}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 mb-3">Showing 5 of 340+ certified organizations</p>
                    <Button variant="outline">Load More Organizations</Button>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Appeals Process */}
            <TabsContent value="appeals">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-6">
                  <Card className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#0f1f3d] rounded-lg flex items-center justify-center shrink-0">
                        <Scale className="w-6 h-6 text-[#c9920a]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-[#0f1f3d] mb-2">Appeals and Dispute Resolution</h2>
                        <p className="text-sm text-gray-500">
                          Fair, transparent process for challenging certification decisions
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                      <div>
                        <h3 className="font-semibold text-[#0f1f3d] mb-3">Grounds for Appeal</h3>
                        <p className="mb-3">You may file an appeal if you believe:</p>
                        <ul className="space-y-2">
                          {[
                            "A certification decision was based on incorrect or incomplete information",
                            "The assessment process did not follow AIC's published procedures",
                            "There was a conflict of interest or bias in the assessment team",
                            "The certification decision is inconsistent with international standards",
                          ].map((ground, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-[#c9920a] shrink-0 mt-0.5" />
                              <span>{ground}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-3">Appeal Process Timeline</h4>
                        <div className="space-y-3">
                          {[
                            { step: "1", title: "Submit Appeal", time: "Within 30 days of decision" },
                            { step: "2", title: "Acknowledgment", time: "Within 5 business days" },
                            { step: "3", title: "Independent Review", time: "30-45 days" },
                            { step: "4", title: "Final Decision", time: "Within 60 days of submission" },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-semibold text-sm shrink-0">
                                {item.step}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-blue-900">{item.title}</div>
                                <div className="text-sm text-blue-700">{item.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#0f1f3d] mb-3">How to File an Appeal</h3>
                        <div className="bg-white border border-gray-200 rounded-lg p-5">
                          <div className="space-y-3 text-sm">
                            <div>
                              <strong>Email:</strong> appeals@aic-cert.org
                            </div>
                            <div>
                              <strong>Online Portal:</strong>{" "}
                              <a href="#" className="text-[#c9920a] hover:underline">
                                aic-cert.org/appeals
                              </a>
                            </div>
                            <div>
                              <strong>Postal Mail:</strong> AIC Appeals Committee, 1225 Eye Street NW, Suite 550,
                              Washington, DC 20005
                            </div>
                            <div className="pt-3 border-t border-gray-200">
                              <strong>Required Information:</strong> Certificate number (if applicable), detailed
                              description of grounds for appeal, supporting documentation, and contact information.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                      <Button className="bg-[#0f1f3d] hover:bg-[#1a3160] text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download Appeals Form
                      </Button>
                      <Button variant="outline">View Full Appeals Policy</Button>
                    </div>
                  </Card>

                  <Card className="p-8">
                    <h3 className="font-semibold text-[#0f1f3d] mb-4">Recent Appeals Activity</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Transparency report showing recent appeals filed and their outcomes (anonymized per confidentiality
                      requirements).
                    </p>
                    <div className="space-y-3">
                      {appealCases.map((appeal, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#0f1f3d] rounded-lg flex items-center justify-center text-white font-mono text-xs">
                              {appeal.caseId.split("-")[2]}
                            </div>
                            <div>
                              <div className="font-medium text-[#0f1f3d]">{appeal.organization}</div>
                              <div className="text-sm text-gray-500">
                                {appeal.issue} • Submitted {appeal.dateSubmitted}
                              </div>
                            </div>
                          </div>
                          <Badge
                            className={
                              appeal.status === "Resolved"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }
                          >
                            {appeal.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl text-[#0f1f3d] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
            Questions About Our Processes?
          </h2>
          <p className="text-gray-600 mb-8">
            Our compliance team is available to answer questions about impartiality, accreditation, or appeals procedures.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-[#0f1f3d] hover:bg-[#1a3160] text-white px-8 py-3">Contact Compliance Team</Button>
            <Button variant="outline" className="px-8 py-3">
              <ExternalLink className="w-4 h-4 mr-2" />
              IAF Public Registry
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
