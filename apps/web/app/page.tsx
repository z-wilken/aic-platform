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
  Heart, 
  RotateCcw, 
  Zap, 
  Globe, 
  Users, 
  Building2, 
  Star, 
  ChevronRight 
} from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1694340016914-e684a924f5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000";

const algorithmicRights = [
  {
    icon: Shield,
    title: "Human Agency",
    description: "No final decision affecting a person's dignity, freedom, or livelihood shall be made solely by a machine. A named human must remain accountable.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: MessageSquare,
    title: "Explanation",
    description: "Every individual has the right to receive a meaningful, human-readable explanation of how an automated outcome was reached.",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "Automated interactions must preserve human dignity. Cold, bureaucratic rejection by algorithms is a design failure that must be remediated.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: RotateCcw,
    title: "Correction",
    description: "Every system must provide a clear, accessible, human-staffed mechanism to appeal and correct unjust automated decisions.",
    color: "bg-purple-50 text-purple-700 border-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    icon: Zap,
    title: "Truth",
    description: "Every person has the right to know if they are interacting with an AI system. Transparency is the foundation of trust.",
    color: "bg-rose-50 text-rose-700 border-rose-100",
    iconBg: "bg-rose-100",
  },
];

const stats = [
  { value: "R 2,500", label: "Monthly Founding Rate", icon: Award },
  { value: "5", label: "Founding Partner Slots", icon: Users },
  { value: "100%", label: "Human Accountability", icon: Shield },
  { value: "POPIA", label: "Section 71 Aligned", icon: Globe },
];

const standards = [
  { code: "POPIA Section 71", name: "Automated Decision Making", desc: "The legal requirement in South Africa for human intervention in automated decisions that significantly affect data subjects." },
  { code: "ISO/IEC 42001", name: "AI Management Systems", desc: "Framework for establishing, implementing, and continually improving an Artificial Intelligence Management System." },
  { code: "NIST AI RMF", name: "Risk Management Framework", desc: "Voluntary framework for managing AI risks across the full lifecycle, mapping to Govern, Map, and Measure functions." },
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
        <div className="absolute inset-0 opacity-5 subtle-grid" />

        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-aic-gold/20 text-aic-gold-light text-xs rounded-full border border-aic-gold/30 uppercase tracking-widest font-mono">
                South African Standard · POPIA Compliant
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight">
              Certifying the{" "}
              <span className="text-aic-gold">Human</span>{" "}
              Behind the Algorithm
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              AI Integrity Certification (Pty) Ltd is the South African benchmark for ensuring no final decision about a human being is made solely by a machine. We certify human empathy and accountability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/alpha-apply"
                className="inline-flex items-center gap-2 bg-aic-gold hover:bg-aic-gold/90 text-white px-8 py-4 rounded-lg transition-all text-sm font-medium shadow-lg shadow-aic-gold/20"
              >
                Become a Founding Partner <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/governance-hub"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg transition-all text-sm font-medium backdrop-blur-sm"
              >
                The 5 Algorithmic Rights <ChevronRight className="w-4 h-4" />
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
            <span className="text-aic-gold text-sm uppercase tracking-[0.3em] font-mono font-bold">Universal Principles</span>
            <h2 className="text-4xl text-aic-navy mt-4 mb-6 italic">
              Declaration of Algorithmic Rights
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-serif">
              Our foundational framework ensures that automated systems preserve human dignity. These five rights are the benchmark for AI Integrity Certification (Pty) Ltd.
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

      {/* Pricing Section - Founding Partner */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-aic-navy rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-5 subtle-grid" />
            <div className="absolute top-0 right-0 p-8">
              <span className="bg-aic-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">Limited Offer</span>
            </div>
            <h2 className="text-3xl text-white mb-6 font-serif italic">Founding Partner Program</h2>
            <p className="text-white/70 mb-8 text-lg">
              Join the first 5 South African organisations to define the future of human-accountable AI.
            </p>
            <div className="text-6xl font-bold text-white mb-2 font-mono">R 2,500<span className="text-xl text-white/50">/month</span></div>
            <p className="text-aic-gold text-sm mb-10 font-medium tracking-wide font-mono uppercase">Locked for life · Free upgrade to SANAS-accredited certification</p>
            <Link
              href="/alpha-apply"
              className="inline-flex items-center gap-2 bg-aic-gold hover:bg-[#b07d08] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest font-mono transition-all shadow-xl shadow-aic-gold/20"
            >
              Apply for Founding Partner Slot <ArrowRight className="w-4 h-4" />
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
            <span className="text-aic-gold text-sm uppercase tracking-[0.3em] font-mono font-bold">Regulatory Frameworks</span>
            <h2 className="text-4xl text-white mt-4 mb-6">
              Built on Global & Local Law
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
              Our methodology maps directly to POPIA Section 71 and emerging international standards like ISO/IEC 42001.
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

      {/* Final CTA */}
      <section className="py-24 bg-aic-paper">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-aic-navy mb-6 font-serif italic">
              Is Your AI System Compliant?
            </h2>
            <p className="text-gray-600 mb-10 text-xl leading-relaxed">
              Don't wait for a POPIA audit. Start your journey toward human-accountable AI today with AI Integrity Certification (Pty) Ltd.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/alpha-apply"
                className="inline-flex items-center gap-2 bg-aic-navy text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest font-mono hover:bg-aic-navy-mid transition-all shadow-xl shadow-black/10"
              >
                Become a Founding Partner <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-aic-navy text-aic-navy px-10 py-4 rounded-xl hover:bg-aic-navy hover:text-white transition-all font-bold uppercase tracking-widest font-mono"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
