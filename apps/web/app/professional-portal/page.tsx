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
} from "lucide-react";

// Assuming these are available in components/ui
const Button = ({ children, className, variant, asChild }: any) => (
  <button className={`px-4 py-2 rounded-lg font-medium transition-all ${variant === 'outline' ? 'border border-aic-navy text-aic-navy hover:bg-aic-navy/5' : 'bg-aic-navy text-white hover:bg-aic-navy/90'} ${className}`}>
    {children}
  </button>
);

const Card = ({ children, className }: any) => (
  <div className={`bg-white border border-gray-100 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className, variant }: any) => (
  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${variant === 'outline' ? 'border border-current' : ''} ${className}`}>
    {children}
  </span>
);

export default function ProfessionalPortal() {
  const [activeTab, setActiveTab] = useState("certifications");
  const [certifications, setCertifications] = useState<any[]>([]);
  const [examsData, setExamsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.aiccertified.cloud';
        const [certsRes, examsRes] = await Promise.all([
          fetch(`${baseUrl}/api/public/certifications`),
          fetch(`${baseUrl}/api/public/exams`)
        ]);

        if (certsRes.ok) setCertifications(await certsRes.json());
        if (examsRes.ok) setExamsData(await examsRes.json());
      } catch (error) {
        console.error("Failed to fetch professional portal data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const competencyDomains = [
    { name: "POPIA Section 71 Compliance", weight: "25%", description: "Legal requirements for automated decision-making in South Africa." },
    { name: "Human Agency & Empathy Design", weight: "20%", description: "Principles of human-in-the-loop and dignified automated communication." },
    { name: "Algorithmic Bias Testing", weight: "20%", description: "Statistical methods for identifying disparate impact and unfairness." },
    { name: "ISO/IEC 42001 Implementation", weight: "15%", description: "International standards for AI Management Systems (AIMS)." },
    { name: "Audit Evidence Collection", weight: "10%", description: "Maintaining immutable audit trails and decision logging." },
    { name: "Ethics Scenario Analysis", weight: "10%", description: "Resolving complex accountability gaps in automated systems." },
  ];

  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="bg-aic-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-aic-copper via-transparent to-transparent"></div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-aic-copper" />
              <span className="text-aic-copper text-xs uppercase tracking-widest font-mono">Professional Certification</span>
            </div>
            <h1 className="text-5xl mb-6 font-serif italic">
              Human Accountability Practitioner
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Earn your AIC credential — the benchmark for professionals responsible for AI governance in South Africa. 
              Aligned with POPIA Section 71 and the SANAS accreditation roadmap.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="bg-aic-copper hover:bg-aic-copper/90 text-white px-8 py-4">
                View Certification Path <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4">
                Download Study Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "R 2,500", label: "Founding Partner Rate", icon: Award },
              { value: "100%", icon: Shield, label: "POPIA Aligned" },
              { value: "SANAS", icon: Globe, label: "Accreditation Roadmap" },
            ].map((stat, i) => {
              const Icon = (stat as any).icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center p-6 bg-aic-paper rounded-xl"
                >
                  <Icon className="w-6 h-6 text-aic-copper mb-2" />
                  <div className="text-3xl font-bold text-aic-navy font-mono">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mt-1">{stat.label}</div>
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
                  { id: "certifications", label: "Certification Path" },
                  { id: "competencies", label: "Competency Domains" },
                  { id: "resources", label: "Resources" },
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
              {activeTab === "certifications" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <h2 className="text-3xl font-serif text-aic-navy mb-8">Professional Pathways</h2>
                  
                  {loading ? (
                    <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-aic-copper" /></div>
                  ) : certifications.length > 0 ? (
                    certifications.map((cert, i) => (
                      <Card key={i} className="p-8 border-l-4 border-aic-copper">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 bg-aic-paper rounded-xl flex items-center justify-center shrink-0">
                            <Award className="w-8 h-8 text-aic-navy" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-aic-navy">{cert.level}</h3>
                              <Badge className="bg-aic-copper/10 text-aic-copper">{cert.code}</Badge>
                            </div>
                            <p className="text-gray-600 mb-6 text-lg">{cert.description}</p>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                <h4 className="text-xs font-bold text-aic-navy uppercase tracking-widest mb-4 font-mono">Key Requirements</h4>
                                <ul className="space-y-3">
                                  {(cert.requirements || []).map((req: string, j: number) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                                      <Check className="w-4 h-4 text-aic-copper shrink-0 mt-0.5" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-aic-paper p-6 rounded-xl">
                                <h4 className="text-xs font-bold text-aic-navy uppercase tracking-widest mb-4 font-mono">Details</h4>
                                <div className="space-y-3 text-sm text-gray-700">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-aic-copper" />
                                    <span>Duration: {cert.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-aic-copper" />
                                    <span>Assessment: {cert.examFee}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-8">
                              <Button className="bg-aic-navy hover:bg-aic-navy-mid text-white px-8 py-3">
                                Apply for Certification
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="space-y-6">
                      <Card className="p-8 border-l-4 border-aic-copper">
                        <h3 className="text-2xl font-bold text-aic-navy mb-2">Founding Auditor (AIC-FA)</h3>
                        <p className="text-gray-600 mb-6 text-lg">Designed for the first wave of professionals leading POPIA Section 71 compliance projects.</p>
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                          <ul className="space-y-3">
                            <li className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-aic-copper shrink-0" /> Mastery of the 5 Algorithmic Rights</li>
                            <li className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-aic-copper shrink-0" /> POPIA Section 71 legal proficiency</li>
                          </ul>
                          <div className="bg-aic-paper p-4 rounded-lg">
                            <div className="text-xs text-gray-500 font-mono uppercase">Enrollment Status</div>
                            <div className="font-bold text-aic-navy">OPEN — Founding Partners Only</div>
                          </div>
                        </div>
                        <Button className="bg-aic-navy text-white px-6 py-3">Register Interest</Button>
                      </Card>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "competencies" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-3xl font-serif text-aic-navy mb-8">Competency Domains</h2>
                  <div className="grid gap-6">
                    {competencyDomains.map((domain, i) => (
                      <Card key={i} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-aic-navy">{domain.name}</h3>
                          <Badge className="bg-aic-copper text-white">{domain.weight}</Badge>
                        </div>
                        <p className="text-gray-600 mb-6">{domain.description}</p>
                        <div className="w-full bg-aic-paper rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-aic-copper h-full"
                            style={{ width: domain.weight }}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "resources" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-3xl font-serif text-aic-navy mb-8">Study Resources</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-8 hover:shadow-lg transition-shadow border-t-4 border-aic-copper">
                      <FileText className="w-10 h-10 text-aic-navy mb-4" />
                      <h4 className="text-xl font-bold text-aic-navy mb-2">The Practitioner Body of Knowledge</h4>
                      <p className="text-gray-500 mb-6 text-sm">Comprehensive guide to the AIC methodology and its legal foundations in POPIA.</p>
                      <Button variant="outline" className="w-full">Download PDF</Button>
                    </Card>
                    <Card className="p-8 hover:shadow-lg transition-shadow border-t-4 border-aic-copper">
                      <BookOpen className="w-10 h-10 text-aic-navy mb-4" />
                      <h4 className="text-xl font-bold text-aic-navy mb-2">Sample Assessment Cases</h4>
                      <p className="text-gray-500 mb-6 text-sm">Practice scenarios for human agency, explanation, and bias detection audits.</p>
                      <Button variant="outline" className="w-full">Download PDF</Button>
                    </Card>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-aic-navy text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Award className="w-12 h-12 mx-auto mb-6 text-aic-copper" />
          <h2 className="text-4xl mb-6 font-serif italic">
            Ready to Lead Human-Accountable AI?
          </h2>
          <p className="text-white/70 mb-10 text-xl leading-relaxed">
            Join the South African community of certified AI governance professionals. 
            Founding Partner organizations receive 5 complimentary practitioner certifications.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-aic-copper text-white hover:bg-aic-copper/90 px-10 py-4 font-bold">
              Start Your Application
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-4">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
