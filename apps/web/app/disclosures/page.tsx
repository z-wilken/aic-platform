"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Search,
  CheckCircle,
  Globe,
  Building2,
  Loader2,
  ArrowRight,
  Scale,
  AlertCircle,
  Download,
  ExternalLink,
  Lock,
  Calendar,
  Eye,
  Users,
} from "lucide-react";

// Assuming these are available in components/ui
const Button = ({ children, className, variant, size }: any) => (
  <button className={`px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-[11px] transition-all font-mono ${variant === 'outline' ? 'border-2 border-[#0f1f3d] text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white' : 'bg-aic-gold text-white hover:bg-[#b07d08]'} ${className}`}>
    {children}
  </button>
);

const Card = ({ children, className }: any) => (
  <div className={`bg-white border border-gray-100 rounded-[2rem] shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className, variant }: any) => (
  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] font-mono ${variant === 'outline' ? 'border border-current' : 'bg-gray-100 text-gray-600'} ${className}`}>
    {children}
  </span>
);

export default function Disclosures() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("impartiality");

  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000)` }} 
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 opacity-5 subtle-grid" />
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-aic-gold" />
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">
                IAF MLA Mandatory Disclosures
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6">
              Public Disclosures & Compliance
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed font-serif italic">
              As an IAF Multilateral Recognition Arrangement (MLA) signatory, AIC maintains full transparency regarding our impartiality, accreditation status, certified organizations, and appeals processes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, label: "IAF MLA Accredited", value: "Since 2023" },
              { icon: Globe, label: "Recognition", value: "100+ Countries" },
              { icon: Building2, label: "Certified Orgs", value: "340+" },
              { icon: Users, label: "Certified Professionals", value: "4,200+" },
            ].map((item, i) => {
              const StatIcon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <StatIcon className="w-6 h-6 text-aic-gold mx-auto mb-3" />
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1 font-mono">{item.label}</div>
                  <div className="text-2xl font-bold text-[#0f1f3d] font-mono">{item.value}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4">
          {/* Navigation Bar for Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm max-w-4xl">
            {[
              { id: "impartiality", label: "Impartiality Statement" },
              { id: "accreditation", label: "Accreditation Status" },
              { id: "appeals", label: "Appeals Process" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all font-mono ${
                  activeTab === tab.id
                    ? "bg-[#0f1f3d] text-white shadow-lg"
                    : "text-gray-500 hover:text-[#0f1f3d] hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12">
            {activeTab === "impartiality" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-12">
                  <div className="flex items-start gap-6 mb-10">
                    <div className="w-16 h-16 bg-[#0f1f3d] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <Scale className="w-8 h-8 text-aic-gold" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-[#0f1f3d] mb-2">
                        Statement of Impartiality and Independence
                      </h2>
                      <p className="text-sm text-gray-400 font-mono uppercase tracking-widest">Last updated: February 1, 2026</p>
                    </div>
                  </div>

                  <div className="space-y-10 text-gray-700 leading-relaxed max-w-4xl">
                    <div>
                      <h3 className="text-xl font-bold text-[#0f1f3d] mb-4 font-serif">Core Principle</h3>
                      <p className="text-lg leading-relaxed font-sans">
                        The AI Certification Institute (AIC) operates as an independent, third-party accreditation and
                        certification body. We maintain strict impartiality in all certification activities and do not
                        provide consultancy services to organizations seeking certification.
                      </p>
                    </div>

                    <div className="bg-amber-50 border-2 border-amber-100 rounded-[2rem] p-10">
                      <div className="flex items-start gap-6">
                        <AlertCircle className="w-8 h-8 text-amber-700 shrink-0 mt-1" />
                        <div>
                          <h4 className="text-xl font-bold text-amber-900 mb-4 font-serif">Conflict of Interest Prohibitions</h4>
                          <p className="text-base text-amber-800 mb-6 font-sans">
                            AIC does <strong>not</strong> provide any of the following services to organizations it
                            certifies:
                          </p>
                          <ul className="grid md:grid-cols-2 gap-4 text-sm text-amber-800 font-medium">
                            {[
                              "Management system implementation",
                              "Internal audit services",
                              "Risk assessment design",
                              "Policy or procedure development",
                              "Custom software integration",
                              "Direct employee training",
                            ].map((item) => (
                              <li key={item} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#0f1f3d] mb-6 font-serif">Independence Safeguards</h3>
                      <div className="grid md:grid-cols-2 gap-6">
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
                          <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-[#0f1f3d] mb-1 font-sans">{safeguard.title}</div>
                              <p className="text-sm text-gray-500 leading-relaxed">{safeguard.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-10 border-t border-gray-100 flex flex-wrap gap-4">
                      <Button className="px-8 py-4">
                        <Download className="w-4 h-4 mr-2" />
                        Download Impartiality Policy (PDF)
                      </Button>
                      <Button variant="outline" className="px-8 py-4">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        IAF Compliance Requirements
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "accreditation" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-8">
                  <Card className="p-12">
                    <div className="flex items-start gap-6 mb-10">
                      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-green-100">
                        <Shield className="w-8 h-8 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                          <h2 className="text-3xl font-bold text-[#0f1f3d]">Current Accreditation Status</h2>
                          <Badge className="bg-green-100 text-green-700 font-mono">Status: Active</Badge>
                        </div>
                        <p className="text-sm text-gray-400 font-mono uppercase tracking-widest">Last verified: February 20, 2026</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          label: "Accrediting Body",
                          value: "ANAB (ANSI National Accreditation Board)",
                          icon: Building2,
                        },
                        {
                          label: "Accreditation Standard",
                          value: "ISO/IEC 17024:2012 (Personnel)",
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
                          value: "Nov 2025 (No findings)",
                          icon: Eye,
                        },
                      ].map((item, i) => {
                        const AccIcon = item.icon;
                        return (
                          <div key={i} className="flex items-start gap-4 p-6 bg-aic-paper rounded-2xl border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                            <AccIcon className="w-6 h-6 text-aic-gold shrink-0 mt-0.5" />
                            <div>
                              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold mb-1">{item.label}</div>
                              <div className="font-bold text-[#0f1f3d] text-sm leading-tight">{item.value}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>

                  <Card className="p-12 bg-[#0f1f3d] text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 subtle-grid" />
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-6 font-serif">What IAF MLA Recognition Means</h3>
                      <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-3xl">
                        The International Accreditation Forum (IAF) Multilateral Recognition Arrangement (MLA) ensures that
                        certificates issued by AIC are recognized globally. This means organizations certified by AIC do not
                        need additional certifications when operating in other countries within the MLA network.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                          { region: "North America", signatories: "4" },
                          { region: "Europe", signatories: "32" },
                          { region: "Asia-Pacific", signatories: "28" },
                          { region: "Latin America", signatories: "12" },
                          { region: "Africa", signatories: "14" },
                          { region: "Middle East", signatories: "10" },
                        ].map((region, i) => (
                          <div key={i} className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                            <Globe className="w-5 h-5 text-aic-gold mx-auto mb-2" />
                            <div className="font-bold text-xs mb-1">{region.region}</div>
                            <div className="text-[9px] text-white/40 font-mono uppercase">{region.signatories} Signatories</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === "appeals" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-12">
                  <div className="flex items-start gap-6 mb-10">
                    <div className="w-16 h-16 bg-[#0f1f3d] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <Scale className="w-8 h-8 text-aic-gold" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-[#0f1f3d] mb-2">Appeals and Dispute Resolution</h2>
                      <p className="text-sm text-gray-400 font-mono uppercase tracking-widest">
                        Fair, transparent process for challenging certification decisions
                      </p>
                    </div>
                  </div>

                  <div className="space-y-10 text-gray-700 leading-relaxed max-w-4xl">
                    <div>
                      <h3 className="text-xl font-bold text-[#0f1f3d] mb-6 font-serif">Grounds for Appeal</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Incorrect or incomplete information used in decision",
                          "Assessment process bypassed AIC's published procedures",
                          "Conflict of interest or bias in the assessment team",
                          "Decision is inconsistent with ISO/IEC standards",
                        ].map((ground, i) => (
                          <li key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm list-none">
                            <CheckCircle className="w-5 h-5 text-aic-gold shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">{ground}</span>
                          </li>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-100 rounded-[2rem] p-10">
                      <h4 className="text-xl font-bold text-blue-900 mb-8 font-serif">Appeal Process Timeline</h4>
                      <div className="space-y-6">
                        {[
                          { step: "1", title: "Submit Appeal", time: "Within 30 days of decision" },
                          { step: "2", title: "Acknowledgment", time: "Within 5 business days" },
                          { step: "3", title: "Independent Review", time: "30-45 business days" },
                          { step: "4", title: "Final Decision", time: "Within 60 days of submission" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-6">
                            <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                              {item.step}
                            </div>
                            <div className="flex-1 border-b border-blue-100 pb-2">
                              <div className="font-bold text-blue-900 text-base">{item.title}</div>
                              <div className="text-[10px] text-blue-700 uppercase tracking-widest font-mono font-bold">{item.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-10 border-t border-gray-100 flex flex-wrap gap-4">
                      <Button className="px-8 py-4">
                        <Download className="w-4 h-4 mr-2" />
                        Download Appeals Form
                      </Button>
                      <Button variant="outline" className="px-8 py-4">View Full Policy</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
