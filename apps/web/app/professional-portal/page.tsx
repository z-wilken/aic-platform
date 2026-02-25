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
  TrendingUp,
  Download,
  Search,
  CheckCircle,
  Shield,
  Globe,
  Target,
  Briefcase,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function ProfessionalPortal() {
  const [activeTab, setActiveTab] = useState("certifications");
  const [searchQuery, setSearchQuery] = useState("");
  const [certifications, setCertifications] = useState<any[]>([]);
  const [examsData, setExamsData] = useState<any[]>([]);
  const [resourcesData, setResourcesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [certsRes, examsRes, resourcesRes] = await Promise.all([
          fetch('http://localhost:3001/api/public/certifications'),
          fetch('http://localhost:3001/api/public/exams'),
          fetch('http://localhost:3001/api/public/resources')
        ]);

        if (certsRes.ok) setCertifications(await certsRes.json());
        if (examsRes.ok) setExamsData(await examsRes.json());
        if (resourcesRes.ok) setResourcesData(await resourcesRes.json());
      } catch (error) {
        console.error("Failed to fetch professional portal data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const competencyDomains = [
    { name: "Algorithmic Rights Framework", weight: "20%", description: "Mastery of the 5 core rights and their application" },
    { name: "ISO/IEC 42001 Implementation", weight: "25%", description: "AIMS lifecycle, controls, and auditing" },
    { name: "AI Risk Management (NIST)", weight: "20%", description: "Govern, Map, Measure, Manage functions" },
    { name: "Regulatory Compliance", weight: "15%", description: "EU AI Act, GDPR, sectoral regulations" },
    { name: "Stakeholder Communication", weight: "10%", description: "Board reporting, public disclosure, incident response" },
    { name: "Applied Ethics & Case Analysis", weight: "10%", description: "Real-world governance scenarios" },
  ];

  const certifiedProfessionals = [
    { name: "Dr. Sarah Chen", role: "Chief AI Officer", company: "TechGlobal Inc.", cert: "SAIGS", year: "2024" },
    { name: "Marcus Williams", role: "AI Ethics Lead", company: "FinanceSecure", cert: "CAEL", year: "2025" },
    { name: "Priya Desai", role: "Responsible AI Manager", company: "HealthAI Solutions", cert: "CAEL", year: "2025" },
    { name: "James O'Brien", role: "AI Governance Consultant", company: "Independent", cert: "SAIGS", year: "2024" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3160] to-[#0a1628] text-white py-20">
        <div className="max-w-[1600px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-[#c9920a]" />
              <span className="text-[#c9920a] text-sm uppercase tracking-widest font-medium">ISO/IEC 17024 Personnel Certification</span>
            </div>
            <h1 className="text-5xl mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Professional Portal
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Earn your AIC credential — the globally recognized standard for AI Ethics Leads, Chief AI Officers, and governance professionals. ISO/IEC 17024 accredited and accepted in 100+ jurisdictions.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="bg-[#c9920a] hover:bg-[#b07d08] text-white px-6 py-3">
                Start Your Certification Journey <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-3">
                View Exam Schedule
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                  <Icon className="w-5 h-5 text-[#c9920a] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#0f1f3d]">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1600px] mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="certifications">Certification Levels</TabsTrigger>
              <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
              <TabsTrigger value="competencies">Competency Domains</TabsTrigger>
              <TabsTrigger value="resources">Study Resources</TabsTrigger>
              <TabsTrigger value="directory">Professional Directory</TabsTrigger>
            </TabsList>

            {/* Certifications Tab */}
            <TabsContent value="certifications">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl text-[#0f1f3d] mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Certification Pathways
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">
                    AIC offers three levels of ISO/IEC 17024 accredited personnel certification, designed to match your career stage and governance responsibilities.
                  </p>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#c9920a]" /></div>
                ) : (
                  certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className={`p-8 border-2 ${cert.color} relative overflow-hidden`}>
                        {cert.popular && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-[#c9920a] text-white">Most Popular</Badge>
                          </div>
                        )}
                        <div className="flex items-start gap-6">
                          <div className={`w-16 h-16 rounded-xl ${cert.badge} flex items-center justify-center shrink-0`}>
                            <Award className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-semibold text-[#0f1f3d]">{cert.level}</h3>
                              <Badge variant="outline" className={cert.badge}>{cert.code}</Badge>
                            </div>
                            <p className="text-gray-600 mb-6">{cert.description}</p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-sm font-semibold text-[#0f1f3d] mb-3">Requirements</h4>
                                <ul className="space-y-2">
                                  {(Array.isArray(cert.requirements) ? cert.requirements : []).map((req: string, j: number) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-[#0f1f3d] mb-3">Certification Details</h4>
                                <div className="space-y-2 text-sm text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#c9920a]" />
                                    <span>Preparation Time: {cert.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-[#c9920a]" />
                                    <span>Exam Fee: {cert.examFee}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-[#c9920a]" />
                                    <span>Valid: 3 years (renewal required)</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                              <Button className="bg-[#0f1f3d] hover:bg-[#1a3160] text-white">
                                Apply for {cert.code}
                              </Button>
                              <Button variant="outline">Download Requirements Guide</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Exams Tab */}
            <TabsContent value="exams">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl text-[#0f1f3d] mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Upcoming Examinations
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">
                    All exams are proctored in accordance with ISO/IEC 17024 standards. Online and in-person options available.
                  </p>
                </div>

                <Card className="p-6">
                  {loading ? (
                    <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-[#c9920a]" /></div>
                  ) : (
                    <div className="space-y-4">
                      {examsData.map((exam, i) => (
                        <div
                          key={i}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-gray-200 rounded-lg hover:border-[#c9920a] transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#0f1f3d] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                              {exam.date.split(" ")[1]?.replace(",", "") || "TBD"}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-[#0f1f3d]">{exam.date}</span>
                                <Badge variant="outline">{exam.certCode}</Badge>
                              </div>
                              <div className="text-sm text-gray-500">{exam.location}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm">
                              <span className={exam.seats?.includes("Unlimited") ? "text-green-600" : "text-amber-600"}>
                                {exam.seats}
                              </span>
                            </div>
                            <Button className="bg-[#c9920a] hover:bg-[#b07d08] text-white">
                              Register Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Can't find a suitable date?</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Request a custom exam session for your organization. Minimum 5 candidates required.
                      </p>
                      <Button size="sm" variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-100">
                        Request Custom Session
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Competencies Tab */}
            <TabsContent value="competencies">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl text-[#0f1f3d] mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Competency Domains
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">
                    All AIC exams assess competency across six core domains, weighted according to their importance in real-world governance practice.
                  </p>
                </div>

                <div className="grid gap-4">
                  {competencyDomains.map((domain, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-[#0f1f3d]">{domain.name}</h3>
                          <Badge className="bg-[#c9920a] text-white">{domain.weight}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{domain.description}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#c9920a] h-2 rounded-full"
                            style={{ width: domain.weight }}
                          />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">Assessment Format</h4>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Multiple-choice questions (60%), case analysis (30%), and ethics scenario evaluation (10%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Timed examination (3 hours for CAEL, 4 hours for SAIGS)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Results delivered within 10 business days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl text-[#0f1f3d] mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Study Resources
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">
                    Free preparation materials for all AIC certification candidates. Additional paid courses available through accredited training providers.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {loading ? (
                    <div className="col-span-2 flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-[#c9920a]" /></div>
                  ) : (
                    resourcesData.map((resource, i) => {
                      const Icon = resource.type === 'PDF' ? FileText : BookOpen;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Card className="p-5 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="w-10 h-10 bg-[#0f1f3d] rounded-lg flex items-center justify-center shrink-0">
                                  <Icon className="w-5 h-5 text-[#c9920a]" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-[#0f1f3d] mb-1">{resource.title}</h4>
                                  <div className="text-sm text-gray-500">
                                    {resource.type} • {resource.size}
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="shrink-0" asChild>
                                <a href={resource.downloadUrl || "#"}>
                                  <Download className="w-4 h-4" />
                                </a>
                              </Button>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })
                  )}
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-gradient-to-br from-[#0f1f3d] to-[#1a3160] text-white">
                    <BookOpen className="w-8 h-8 text-[#c9920a] mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Accredited Training Providers</h4>
                    <p className="text-white/70 text-sm mb-4">
                      Instructor-led courses from AIC-approved training organizations. Includes live workshops and 1-on-1 mentorship.
                    </p>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Find Training Providers
                    </Button>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-[#c9920a] to-[#b07d08] text-white">
                    <Users className="w-8 h-8 text-white mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Study Groups & Community</h4>
                    <p className="text-white/90 text-sm mb-4">
                      Join peer study groups, attend webinars, and connect with certified professionals preparing for exams.
                    </p>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Join Community
                    </Button>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Directory Tab */}
            <TabsContent value="directory">
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl text-[#0f1f3d] mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Certified Professional Directory
                  </h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">
                    Search our public directory of AIC-certified professionals. All certifications are independently verified and maintained in our ISO/IEC 17024 registry.
                  </p>
                </div>

                <Card className="p-6 mb-6">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, company, or certification level..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button className="bg-[#0f1f3d] hover:bg-[#1a3160] text-white">
                      Search
                    </Button>
                  </div>
                </Card>

                <div className="space-y-4">
                  {certifiedProfessionals.map((professional, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-[#0f1f3d] rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {professional.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-[#0f1f3d]">{professional.name}</h4>
                                <Badge className="bg-[#c9920a] text-white">{professional.cert}</Badge>
                              </div>
                              <div className="text-sm text-gray-600">{professional.role}</div>
                              <div className="text-sm text-gray-500">{professional.company}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-green-600 text-sm mb-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>Verified</span>
                            </div>
                            <div className="text-xs text-gray-500">Certified {professional.year}</div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-3">Showing 4 of 4,200+ certified professionals</p>
                  <Button variant="outline">Load More Results</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#c9920a] to-[#b07d08] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-12 h-12 mx-auto mb-4 text-white" />
          <h2 className="text-3xl mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
            Begin Your AIC Certification Journey
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join the global community of certified AI governance professionals. Register for your first exam or schedule a consultation to discuss your certification pathway.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-white text-[#c9920a] hover:bg-white/90 px-8 py-3">
              Register for Exam
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
