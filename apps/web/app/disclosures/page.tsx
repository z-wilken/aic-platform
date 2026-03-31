"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Building2,
  Calendar,
  Eye,
  Loader2
} from "lucide-react";

// Assuming these are available in components/ui
const Button = ({ children, className, variant, size }: any) => (
  <button className={`px-4 py-2 rounded-lg font-medium transition-all ${variant === 'outline' ? 'border border-aic-navy text-aic-navy hover:bg-aic-navy/5' : 'bg-aic-navy text-white hover:bg-aic-navy/90'} ${className}`}>
    {children}
  </button>
);

const Card = ({ children, className }: any) => (
  <div className={`bg-white border border-gray-100 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className }: any) => (
  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

export default function Disclosures() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("impartiality");
  const [registry, setRegistry] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistry() {
      try {
        // D-9: Replace hardcoded localhost with env var
        const baseUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.aiccertified.cloud';
        const res = await fetch(`${baseUrl}/api/v1/public/registry`);
        if (res.ok) {
          const data = await res.json();
          setRegistry(data);
        }
      } catch (error) {
        console.error("Failed to fetch registry:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRegistry();
  }, []);

  const filteredOrgs = registry.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.tier.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <FileText className="w-6 h-6 text-aic-copper" />
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono">
                Mandatory Disclosures
              </span>
            </div>
            <h1 className="text-5xl mb-6 font-serif italic">
              Transparency & Compliance
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              AI Integrity Certification (Pty) Ltd is committed to full transparency regarding our methodology, 
              accreditation roadmap, and impartiality. As we move toward SANAS accreditation, we maintain 
              the highest standards of professional integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Status Bar */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, label: "Accreditation Path", value: "SANAS Roadmap" },
              { icon: Globe, label: "Regulatory Anchor", value: "POPIA Section 71" },
              { icon: Building2, label: "Founding Partners", value: "5 Slots Only" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center md:items-start p-6 bg-aic-paper rounded-xl"
                >
                  <Icon className="w-6 h-6 text-aic-copper mb-3" />
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">{item.label}</div>
                  <div className="text-xl font-bold text-aic-navy">{item.value}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-2">
                {[
                  { id: "impartiality", label: "Impartiality" },
                  { id: "accreditation", label: "Accreditation Roadmap" },
                  { id: "directory", label: "Certified Registry" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-6 py-4 rounded-lg transition-all font-medium ${
                      activeTab === tab.id
                        ? "bg-aic-navy text-white shadow-md"
                        : "text-gray-500 hover:bg-aic-paper hover:text-aic-navy"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">
              {activeTab === "impartiality" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-10">
                    <h2 className="text-3xl font-serif text-aic-navy mb-6">Impartiality Statement</h2>
                    <div className="prose prose-aic max-w-none text-gray-600 space-y-6 text-lg leading-relaxed">
                      <p>
                        AI Integrity Certification (Pty) Ltd operates as an independent, third-party certification body. 
                        To ensure trust in our Integrity Scores, we maintain strict separation between assessment and consultancy.
                      </p>
                      <div className="bg-aic-paper border-l-4 border-aic-copper p-6 my-8">
                        <h4 className="font-bold text-aic-navy mb-2 font-mono uppercase text-sm tracking-widest">Conflict of Interest Safeguards</h4>
                        <ul className="space-y-3">
                          <li className="flex gap-3 items-start">
                            <CheckCircle className="w-5 h-5 text-aic-copper shrink-0 mt-0.5" />
                            <span>We do not design or implement the AI systems we certify.</span>
                          </li>
                          <li className="flex gap-3 items-start">
                            <CheckCircle className="w-5 h-5 text-aic-copper shrink-0 mt-0.5" />
                            <span>We do not provide internal auditing services for client organizations.</span>
                          </li>
                          <li className="flex gap-3 items-start">
                            <CheckCircle className="w-5 h-5 text-aic-copper shrink-0 mt-0.5" />
                            <span>Our assessors are prohibited from providing consultancy to any organization they audit for a period of 2 years.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "accreditation" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-10">
                    <h2 className="text-3xl font-serif text-aic-navy mb-6">Accreditation Roadmap</h2>
                    <div className="space-y-8">
                      <p className="text-lg text-gray-600 leading-relaxed">
                        In South Africa, the formal accreditation body is SANAS (South African National Accreditation System). 
                        AIC is currently in the pre-application phase for ISO/IEC 17024 and ISO/IEC 42001 certification bodies.
                      </p>
                      <div className="relative border-l-2 border-aic-paper pl-8 space-y-12">
                        {[
                          { status: "Complete", title: "Methodology Development", desc: "The 5 Algorithmic Rights framework and Integrity Score calculation validated." },
                          { status: "In Progress", title: "Founding Partner Pilot", desc: "Testing the framework with the first 5 organizations under POPIA Section 71." },
                          { status: "Future", title: "SANAS Application", desc: "Formal submission for accreditation as a certification body (Estimated Q3 2026)." },
                          { status: "Future", title: "Full Accreditation", desc: "Targeting full SANAS recognition within 14 months of application." },
                        ].map((milestone, i) => (
                          <div key={i} className="relative">
                            <div className={`absolute -left-[41px] top-0 w-4 h-4 rounded-full border-4 border-white ${
                              milestone.status === "Complete" ? "bg-aic-copper" : 
                              milestone.status === "In Progress" ? "bg-aic-navy animate-pulse" : "bg-gray-200"
                            }`}></div>
                            <Badge className={
                              milestone.status === "Complete" ? "bg-green-100 text-green-700" : 
                              milestone.status === "In Progress" ? "bg-aic-copper/20 text-aic-copper" : "bg-gray-100 text-gray-400"
                            }>{milestone.status}</Badge>
                            <h4 className="text-xl font-bold text-aic-navy mt-2 mb-1">{milestone.title}</h4>
                            <p className="text-gray-500">{milestone.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "directory" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-10">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <h2 className="text-3xl font-serif text-aic-navy mb-2">Certified Registry</h2>
                        <p className="text-gray-500">
                          Public listing of organizations certified by AI Integrity Certification (Pty) Ltd.
                        </p>
                      </div>
                    </div>

                    <div className="relative mb-8">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        placeholder="Search organizations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-aic-paper rounded-xl border-none focus:ring-2 focus:ring-aic-copper/50"
                      />
                    </div>

                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 className="w-10 h-10 animate-spin text-aic-copper" />
                        <p className="text-gray-500 font-mono text-sm">Querying Trust Registry...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredOrgs.length > 0 ? (
                          filteredOrgs.map((org, i) => (
                            <div key={i} className="p-6 border border-gray-100 rounded-xl hover:border-aic-copper/30 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-bold text-aic-navy mb-1">{org.name}</h3>
                                  <div className="flex gap-2">
                                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                                    <Badge className="bg-aic-paper text-aic-navy">{org.tier}</Badge>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-gray-400 font-mono uppercase">Certified On</div>
                                  <div className="font-bold text-aic-navy">{new Date(org.certifiedAt).toLocaleDateString()}</div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 bg-aic-paper rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">No organizations found matching your search.</p>
                            <p className="text-sm text-gray-400 mt-1 italic">Note: Only Founding Partners and Alpha participants are currently listed.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
