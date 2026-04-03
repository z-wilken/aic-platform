"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Calendar, 
  FileText, 
  BookOpen, 
  Check, 
  ArrowRight, 
  Clock, 
  Users, 
  Target, 
  Download, 
  CheckCircle, 
  Shield, 
  Loader2, 
  Globe, 
  Briefcase, 
  TrendingUp, 
  Search 
} from "lucide-react";

// Assuming these are available in components/ui
const Button = ({ children, className, variant, asChild }: any) => (
  <button className={`px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-[11px] transition-all font-mono ${variant === 'outline' ? 'border-2 border-[#0f1f3d] text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white' : 'bg-aic-gold text-white hover:bg-[#b07d08]'} ${className}`}>
    {children}
  </button>
);

const Card = ({ children, className }: any) => (
  <div className={`bg-white border border-gray-100 rounded-2xl shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className, variant }: any) => (
  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] font-mono ${variant === 'outline' ? 'border border-current' : 'bg-gray-100 text-gray-600'} ${className}`}>
    {children}
  </span>
);

export default function ProfessionalPortal() {
  const [activeTab, setActiveTab] = useState("certifications");
  const [searchQuery, setSearchQuery] = useState("");

  const certificationLevels = [
    {
      level: "Associate AI Ethics Practitioner",
      code: "AAEP",
      description: "Entry-level certification for professionals entering the AI governance field. Covers fundamental algorithmic rights and basic AI risk identification.",
      requirements: ["1+ year in technology or compliance", "No prior AI certification required", "Pass AAEP examination (70% threshold)"],
      duration: "4-6 months preparation",
      examFee: "$495",
      color: "border-blue-200 bg-blue-50",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      level: "Certified AI Ethics Lead",
      code: "CAEL",
      description: "Professional certification for AI Ethics Leads, Responsible AI Managers, and AI Governance Officers. Aligned with ISO/IEC 42001 requirements.",
      requirements: ["3+ years in AI governance, ethics, or risk management", "Bachelor's degree or equivalent experience", "Pass CAEL examination (75% threshold)", "Submit 2 case studies demonstrating applied governance"],
      duration: "6-9 months preparation",
      examFee: "$1,295",
      color: "border-aic-gold/20 bg-aic-gold/5",
      badge: "bg-aic-gold/10 text-aic-gold",
      popular: true,
    },
    {
      level: "Senior AI Governance Specialist",
      code: "SAIGS",
      description: "Advanced certification for Chief AI Officers, VPs of AI Governance, and senior leaders. Requires demonstrated organizational impact and strategic governance implementation.",
      requirements: ["7+ years in senior AI governance or risk leadership", "Current CAEL certification (or equivalent)", "Pass SAIGS examination (80% threshold)", "Present board-level governance case study", "Peer review by two certified practitioners"],
      duration: "12+ months preparation",
      examFee: "$2,495",
      color: "border-purple-200 bg-purple-50",
      badge: "bg-purple-100 text-purple-700",
    },
  ];

  const competencyDomains = [
    { name: "Algorithmic Rights Framework", weight: "20%", description: "Mastery of the 5 core rights and their application" },
    { name: "ISO/IEC 42001 Implementation", weight: "25%", description: "AIMS lifecycle, controls, and auditing" },
    { name: "AI Risk Management (NIST)", weight: "20%", description: "Govern, Map, Measure, Manage functions" },
    { name: "Regulatory Compliance", weight: "15%", description: "EU AI Act, GDPR, sectoral regulations" },
    { name: "Stakeholder Communication", weight: "10%", description: "Board reporting, public disclosure, incident response" },
    { name: "Applied Ethics & Case Analysis", weight: "10%", description: "Real-world governance scenarios" },
  ];

  const resources = [
    { title: "ISO/IEC 42001:2023 Study Guide", type: "PDF", size: "2.4 MB", icon: FileText },
    { title: "NIST AI RMF Mapping Workbook", type: "XLSX", size: "890 KB", icon: FileText },
    { title: "Algorithmic Rights Case Compendium", type: "PDF", size: "5.1 MB", icon: BookOpen },
    { title: "Sample Exam Questions (CAEL)", type: "PDF", size: "1.2 MB", icon: FileText },
    { title: "EU AI Act Compliance Checklist", type: "PDF", size: "780 KB", icon: FileText },
    { title: "Professional Code of Conduct", type: "PDF", size: "320 KB", icon: Shield },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000)` }} 
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 opacity-10 subtle-grid" />
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-aic-gold" />
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">ISO/IEC 17024 Personnel Certification</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6">
              Professional Portal
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed font-serif italic">
              Earn your AIC credential — the globally recognized standard for AI Ethics Leads, Chief AI Officers, and governance professionals. ISO/IEC 17024 accredited and accepted in 100+ jurisdictions.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button className="px-8 py-4">
                Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4">
                View Exam Schedule
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "4,200+", label: "Certified Professionals", icon: Users },
              { value: "89%", label: "Pass Rate (First Attempt)", icon: TrendingUp },
              { value: "48", label: "Countries Represented", icon: Globe },
              { value: "$125K", label: "Average Salary Increase", icon: Briefcase },
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
                  <Icon className="w-6 h-6 text-aic-gold mx-auto mb-3" />
                  <div className="text-3xl font-bold text-[#0f1f3d] font-mono">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1 font-mono">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-24 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4">
          {/* Navigation Bar for Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            {[
              { id: "certifications", label: "Certification Levels" },
              { id: "competencies", label: "Competency Domains" },
              { id: "resources", label: "Study Resources" },
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

          {/* Certifications Tab */}
          {activeTab === "certifications" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl text-[#0f1f3d] mb-4">Certification Pathways</h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg font-serif italic">
                  AIC offers three levels of ISO/IEC 17024 accredited personnel certification, designed to match your career stage and governance responsibilities.
                </p>
              </div>

              {certificationLevels.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`p-10 border-2 ${cert.color} relative overflow-hidden group hover:shadow-xl transition-all`}>
                    {cert.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-aic-gold text-white text-[10px] font-bold px-6 py-2 uppercase tracking-widest transform rotate-45 translate-x-[30%] translate-y-[50%] font-mono">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col lg:flex-row items-start gap-10">
                      <div className={`w-20 h-20 rounded-2xl ${cert.badge} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                        <Award className="w-10 h-10" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <h3 className="text-3xl font-bold text-[#0f1f3d]">{cert.level}</h3>
                          <Badge className={cert.badge}>{cert.code}</Badge>
                        </div>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">{cert.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-10">
                          <div>
                            <h4 className="text-[10px] font-bold text-[#0f1f3d] uppercase tracking-[0.2em] mb-6 font-mono border-b border-gray-100 pb-2">Requirements</h4>
                            <ul className="space-y-4">
                              {cert.requirements.map((req, j) => (
                                <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                                  <Check className="w-5 h-5 text-aic-gold shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-[#0f1f3d] uppercase tracking-[0.2em] mb-6 font-mono border-b border-gray-100 pb-2">Certification Details</h4>
                            <div className="space-y-4 text-sm text-gray-600 bg-white/50 p-6 rounded-2xl border border-gray-50">
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-aic-gold" />
                                <span className="font-medium">Time: {cert.duration}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Target className="w-5 h-5 text-aic-gold" />
                                <span className="font-medium">Fee: {cert.examFee}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-aic-gold" />
                                <span className="font-medium">Validity: 3 years (renewal required)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4">
                          <Button className="px-10 py-4">
                            Apply for {cert.code}
                          </Button>
                          <Button variant="outline" className="px-10 py-4">Download Guide</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Competencies Tab */}
          {activeTab === "competencies" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl text-[#0f1f3d] mb-4">Competency Domains</h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg font-serif italic">
                  All AIC exams assess competency across six core domains, weighted according to their importance in real-world governance practice.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {competencyDomains.map((domain, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-8 hover:border-aic-gold/30 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-[#0f1f3d]">{domain.name}</h3>
                        <Badge className="bg-aic-gold text-white font-mono">{domain.weight}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">{domain.description}</p>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-aic-gold h-full rounded-full transition-all duration-1000"
                          style={{ width: domain.weight }}
                        />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl text-[#0f1f3d] mb-4">Study Resources</h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg font-serif italic">
                  Free preparation materials for all AIC certification candidates. 
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, i) => {
                  const Icon = resource.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="p-6 hover:shadow-xl transition-all group">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#0f1f3d] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-aic-gold transition-colors">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#0f1f3d] mb-1 leading-snug">{resource.title}</h4>
                              <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                                {resource.type} • {resource.size}
                              </div>
                            </div>
                          </div>
                          <button className="text-gray-300 hover:text-aic-gold transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-aic-gold to-[#b07d08] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 subtle-grid" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-white mb-6">
              Begin Your AIC Certification Journey
            </h2>
            <p className="text-white/90 mb-12 text-xl leading-relaxed font-serif italic">
              Join the global community of certified AI governance professionals. Register for your first exam or schedule a consultation to discuss your certification pathway.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button className="bg-white text-aic-gold px-10 py-5 rounded-2xl shadow-2xl shadow-black/20">
                Register for Exam
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 px-10 py-5 rounded-2xl">
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
