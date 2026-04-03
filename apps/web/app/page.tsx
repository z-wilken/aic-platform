"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Shield, 
  Award, 
  BarChart3, 
  BookOpen, 
  ArrowRight, 
  CheckCircle, 
  Eye, 
  MessageSquare, 
  Bell, 
  RefreshCw, 
  UserCheck, 
  Globe, 
  Users, 
  Building2, 
  Star, 
  ChevronRight 
} from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1694340016914-e684a924f5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000";

const algorithmicRights = [
  {
    icon: Eye,
    title: "Algorithmic Transparency",
    description: "Every individual has the right to know when an AI system is making decisions that affect them and to understand the logic behind those decisions.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: MessageSquare,
    title: "Algorithmic Explainability",
    description: "Individuals have the right to receive meaningful, human-readable explanations of automated outcomes that affect their rights, welfare, or opportunities.",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: Bell,
    title: "Right to be Informed",
    description: "All persons must be notified whenever they are interacting with or being evaluated by an automated system, prior to the interaction taking place.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: RefreshCw,
    title: "Decision Recourse",
    description: "No individual shall be subject to a decision based solely on automated processing that significantly affects their legal rights or personal circumstances.",
    color: "bg-purple-50 text-purple-700 border-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    icon: UserCheck,
    title: "Human Interaction Choice",
    description: "Every person retains the fundamental right to opt out of AI-mediated services and request human service in any context affecting their material interests.",
    color: "bg-rose-50 text-rose-700 border-rose-100",
    iconBg: "bg-rose-100",
  },
];

const stats = [
  { value: "4,200+", label: "Certified Professionals", icon: Users },
  { value: "340+", label: "Accredited Organizations", icon: Building2 },
  { value: "48", label: "Countries Represented", icon: Globe },
  { value: "97%", label: "Employer Recognition Rate", icon: Star },
];

const standards = [
  { code: "ISO/IEC 42001", name: "AI Management Systems", desc: "Framework for establishing, implementing, and continually improving an Artificial Intelligence Management System." },
  { code: "ISO/IEC 17024", name: "Personnel Certification", desc: "General requirements for bodies operating certification of persons, ensuring consistent and internationally recognized credentials." },
  { code: "NIST AI RMF", name: "Risk Management Framework", desc: "Voluntary framework for managing AI risks across the full lifecycle, mapping to Govern, Map, Measure, and Manage functions." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 hero-gradient" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-10 subtle-grid" />

        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-aic-gold/20 text-aic-gold-light text-xs rounded-full border border-aic-gold/30 uppercase tracking-widest font-mono">
                IAF MLA Accredited · ISO/IEC 17024
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight">
              Certifying the{" "}
              <span className="text-aic-gold">Human</span>{" "}
              Behind the Algorithm
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              AIC is the world's premier accreditation body focused on certifying the professionals accountable for AI — not just the machines. We establish the global standard for AI governance, ethics, and human responsibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/professional-portal"
                className="inline-flex items-center gap-2 bg-aic-gold hover:bg-aic-gold/90 text-white px-8 py-4 rounded-lg transition-all text-sm font-medium shadow-lg shadow-aic-gold/20"
              >
                Get Certified Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/governance-hub"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg transition-all text-sm font-medium backdrop-blur-sm"
              >
                Explore Algorithmic Rights <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
          <span className="font-mono uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-aic-navy-mid border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
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
                  <div className="flex justify-center mb-3">
                    <Icon className="w-6 h-6 text-aic-gold" />
                  </div>
                  <div className="text-white text-3xl font-bold font-mono">{stat.value}</div>
                  <div className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-mono mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Declaration of Algorithmic Rights */}
      <section className="py-24 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-aic-gold text-sm uppercase tracking-[0.3em] font-mono font-bold">Universal Standard</span>
            <h2 className="text-4xl text-aic-navy mt-4 mb-6">
              Declaration of Algorithmic Rights
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed italic font-serif">
              AIC's foundational framework establishing the inalienable rights of every individual interacting with automated systems. These five rights form the basis for all AIC certification assessments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithmicRights.map((right, i) => {
              const Icon = right.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`border rounded-2xl p-8 transition-all hover:shadow-xl hover:-translate-y-1 bg-white ${right.color} ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${right.iconBg} flex items-center justify-center mb-6 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono opacity-60 mb-2">Article {i + 1}</div>
                  <h3 className="text-xl font-bold mb-4">{right.title}</h3>
                  <p className="text-sm leading-relaxed opacity-80">{right.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/governance-hub"
              className="inline-flex items-center gap-2 text-aic-navy border-2 border-aic-navy px-8 py-4 rounded-xl hover:bg-aic-navy hover:text-white transition-all text-sm font-bold uppercase tracking-widest font-mono"
            >
              Read the Full Declaration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-24 bg-aic-navy-mid relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, #c9920a 0%, transparent 60%), radial-gradient(circle at 70% 50%, #1d4ed8 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-aic-gold text-sm uppercase tracking-[0.3em] font-mono font-bold">Professional Standards</span>
            <h2 className="text-4xl text-white mt-4 mb-6">
              Built on International Frameworks
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
              All AIC certification programs are rigorously aligned with the most authoritative international standards in AI governance and personnel certification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {standards.map((std, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="border border-white/10 rounded-3xl p-10 bg-white/5 backdrop-blur-md hover:border-aic-gold/40 transition-colors group"
              >
                <div className="text-aic-gold font-bold text-xl mb-2 font-mono">{std.code}</div>
                <div className="text-white text-lg font-medium mb-4">{std.name}</div>
                <p className="text-white/50 text-sm leading-relaxed mb-8">{std.desc}</p>
                <div className="flex items-center gap-2 text-aic-gold text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle className="w-4 h-4" />
                  <span>AIC Aligned</span>
                </div>
              </motion.div>
            ))}
          </div>
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
              Ready to Lead Responsible AI?
            </h2>
            <p className="text-white/80 mb-12 text-xl leading-relaxed font-serif italic">
              Join thousands of AI Ethics Leads, Chief AI Officers, and governance professionals who carry the AIC credential — the gold standard in human AI accountability.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                href="/professional-portal"
                className="inline-flex items-center gap-2 bg-white text-aic-gold px-10 py-5 rounded-2xl font-bold uppercase tracking-widest font-mono hover:bg-aic-navy hover:text-white transition-all shadow-2xl shadow-black/20"
              >
                Start Certification <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/alpha-apply"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest font-mono hover:bg-white/10 transition-all"
              >
                Institutional Inquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
