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

  const certificationLevels = [
    {
      level: "Associate Accountability Practitioner",
      code: "AAP",
      description: "Entry-level certification for South African compliance officers and junior data scientists. Focuses on POPIA Section 71 fundamentals.",
      requirements: ["1+ year in technology or compliance", "Basic understanding of POPIA", "Pass AAP examination"],
      duration: "3 months preparation",
      examFee: "R 4,500",
      color: "border-blue-200 bg-blue-50",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      level: "Certified Accountability Lead",
      code: "CAL",
      description: "The primary professional credential for South African AI Ethics Leads and Risk Managers. Aligned with ISO/IEC 42001 and local regulations.",
      requirements: ["3+ years in governance or risk", "Bachelor's degree", "Pass CAL examination", "2 case studies"],
      duration: "6 months preparation",
      examFee: "R 12,500",
      color: "border-aic-gold/20 bg-aic-gold/5",
      badge: "bg-aic-gold/10 text-aic-gold",
      popular: true,
    },
    {
      level: "Senior Accountability Specialist",
      code: "SAS",
      description: "Executive-level certification for Chief Privacy Officers and Heads of AI. Requires strategic implementation experience.",
      requirements: ["7+ years in senior leadership", "Current CAL certification", "Board-level case study presentation"],
      duration: "12 months preparation",
      examFee: "R 25,000",
      color: "border-purple-200 bg-purple-50",
      badge: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000)` }} 
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 opacity-5 subtle-grid" />
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-aic-gold" />
              <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Personnel Certification</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
              Human Accountability<br />
              <span className="text-aic-gold">Practitioner Portal</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mb-10 leading-relaxed font-serif italic">
              Empowering South African professionals to bridge the gap between automated systems and human accountability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="px-8 py-4 font-bold shadow-xl shadow-aic-gold/20">
                View Learning Pathways <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4">
                Download Exam Syllabus
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "R 4,500", label: "Entry Exam Fee", icon: Briefcase },
              { value: "100%", label: "Local Recognition", icon: Globe },
              { value: "3", label: "Pathway Levels", icon: Award },
              { value: "POPIA", label: "Legal Foundation", icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <stat.icon className="w-5 h-5 text-aic-gold mx-auto mb-2" />
                <div className="text-3xl font-bold text-[#0f1f3d] font-mono">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-mono font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="py-24 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold">Certification Pathways</span>
            <h2 className="text-4xl text-[#0f1f3d] mt-4 mb-6 font-bold">Professional Credentials</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-serif italic">
              Designed for the South African market, aligned with SANAS accreditation standards and ISO/IEC 17024 requirements.
            </p>
          </div>

          <div className="space-y-8">
            {certificationLevels.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`p-10 border-2 ${cert.color} relative overflow-hidden group hover:shadow-xl transition-all`}>
                  <div className="flex flex-col lg:flex-row items-start gap-10">
                    <div className={`w-20 h-20 rounded-2xl ${cert.badge} flex items-center justify-center shrink-0 shadow-sm`}>
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
                                <CheckCircle className="w-5 h-5 text-aic-gold shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-[#0f1f3d] uppercase tracking-[0.2em] mb-6 font-mono border-b border-gray-100 pb-2">Details</h4>
                          <div className="space-y-4 text-sm text-gray-600 bg-white/50 p-6 rounded-2xl border border-gray-50">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-aic-gold" />
                              <span>{cert.duration}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Target className="w-5 h-5 text-aic-gold" />
                              <span>Fee: {cert.examFee}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-aic-gold to-[#b07d08] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 subtle-grid" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl text-white mb-6">Become a Certified Accountability Lead</h2>
            <p className="text-white/90 mb-12 text-xl leading-relaxed font-serif italic">
              Join the elite group of South African practitioners defining the future of human-accountable AI.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button className="bg-white text-aic-gold px-10 py-5 rounded-2xl shadow-2xl shadow-black/20">
                Register for Next Exam
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 px-10 py-5 rounded-2xl">
                Pathway Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
