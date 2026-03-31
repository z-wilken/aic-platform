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
  ChevronRight,
} from "lucide-react";

// D-11: Fix images - download from Unsplash, serve via next/image (no hotlinking)
// For now, keeping the URL but knowing it needs local replacement
const heroBg = "https://images.unsplash.com/photo-1694340016914-e684a924f5b3?q=80&w=2000&auto=format&fit=crop";

// D-4: Fix Algorithmic Rights names to: Human Agency, Explanation, Empathy, Correction, Truth
const algorithmicRights = [
  {
    icon: Shield,
    title: "Human Agency",
    description: "No final decision affecting a person's dignity, freedom, or livelihood shall be made solely by a machine. A named human must remain accountable.",
    color: "bg-aic-navy/5 text-aic-navy border-aic-navy/10",
    iconBg: "bg-aic-navy/10",
  },
  {
    icon: MessageSquare,
    title: "Explanation",
    description: "Every individual has the right to receive a meaningful, human-readable explanation of how an automated outcome was reached.",
    color: "bg-aic-copper/5 text-aic-copper border-aic-copper/10",
    iconBg: "bg-aic-copper/10",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "Automated interactions must preserve human dignity. Cold, bureaucratic rejection by algorithms is a design failure that must be remediated.",
    color: "bg-aic-navy/5 text-aic-navy border-aic-navy/10",
    iconBg: "bg-aic-navy/10",
  },
  {
    icon: RotateCcw,
    title: "Correction",
    description: "Every system must provide a clear, accessible, human-staffed mechanism to appeal and correct unjust automated decisions.",
    color: "bg-aic-copper/5 text-aic-copper border-aic-copper/10",
    iconBg: "bg-aic-copper/10",
  },
  {
    icon: Zap,
    title: "Truth",
    description: "Every person has the right to know if they are interacting with an AI system. Transparency is the foundation of trust.",
    color: "bg-aic-navy/5 text-aic-navy border-aic-navy/10",
    iconBg: "bg-aic-navy/10",
  },
];

const stats = [
  { value: "R 2,500", label: "Monthly Founding Rate", icon: Award },
  { value: "5", label: "Founding Partner Slots", icon: Users },
  { value: "100%", label: "Human Accountability", icon: Shield },
  { value: "POPIA", label: "Section 71 Compliant", icon: Globe },
];

const standards = [
  { code: "POPIA Section 71", name: "Automated Decision Making", desc: "The legal requirement in South Africa for human intervention in automated decisions that significantly affect data subjects." },
  { code: "ISO/IEC 42001", name: "AI Management Systems", desc: "The international standard for establishing and improving an Artificial Intelligence Management System (AIMS)." },
  { code: "NIST AI RMF", name: "Risk Management Framework", desc: "Voluntary framework for managing AI risks across the full lifecycle, mapping to Govern, Map, and Measure functions." },
];

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-aic-navy">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-aic-navy via-aic-navy/80 to-transparent" />

        <div className="relative max-w-[1600px] mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-aic-copper/20 text-aic-copper text-xs rounded-full border border-aic-copper/30 uppercase tracking-widest font-mono">
                South African Standard · POPIA Compliant
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight font-serif italic">
              Certifying the{" "}
              <span className="text-aic-copper">Human</span>{" "}
              Behind the Algorithm
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              AI Integrity Certification (Pty) Ltd is the South African benchmark for ensuring no final decision about a human being is made solely by a machine. We certify human empathy and accountability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/alpha-apply"
                className="inline-flex items-center gap-2 bg-aic-copper hover:bg-aic-copper/90 text-white px-8 py-4 rounded-lg transition-all text-sm font-medium shadow-lg shadow-aic-copper/20"
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
      </section>

      {/* Stats bar */}
      <section className="bg-aic-navy-mid border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="flex justify-center mb-2">
                    <Icon className="w-5 h-5 text-aic-copper" />
                  </div>
                  <div className="text-white text-3xl font-bold font-mono">{stat.value}</div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Declaration of Algorithmic Rights */}
      <section className="py-24 bg-aic-paper">
        <div className="max-w-[1600px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-aic-copper text-sm uppercase tracking-widest font-mono">Universal Principles</span>
            <h2 className="text-4xl text-aic-navy mt-3 mb-4 font-serif italic">
              Declaration of Algorithmic Rights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Our foundational framework ensures that automated systems preserve human dignity. These five rights are the benchmark for AI Integrity Certification (Pty) Ltd.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {algorithmicRights.map((right, i) => {
              const Icon = right.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-shadow ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""} ${right.color}`}
                >
                  <div className={`w-12 h-12 rounded-lg ${right.iconBg} flex items-center justify-center mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60 mb-2 font-mono">Article {i + 1}</div>
                  <h3 className="text-xl font-bold mb-3 font-serif">{right.title}</h3>
                  <p className="text-base leading-relaxed opacity-90">{right.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section (D-5) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-aic-navy rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className="bg-aic-copper text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Limited Offer</span>
            </div>
            <h2 className="text-3xl text-white mb-6 font-serif">Founding Partner Program</h2>
            <p className="text-white/70 mb-8 text-lg">
              Join the first 5 South African organisations to define the future of human-accountable AI.
            </p>
            <div className="text-5xl font-bold text-white mb-2 font-mono">R 2,500<span className="text-xl text-white/50">/month</span></div>
            <p className="text-aic-copper text-sm mb-10 font-medium tracking-wide">Locked for life · Free upgrade to SANAS-accredited certification</p>
            <Link
              href="/alpha-apply"
              className="inline-flex items-center gap-2 bg-aic-copper hover:bg-aic-copper/90 text-white px-10 py-4 rounded-lg font-medium transition-all"
            >
              Apply for Founding Partner Slot <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-24 bg-aic-navy relative overflow-hidden">
        <div className="relative max-w-[1600px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-aic-copper text-sm uppercase tracking-widest font-mono">Regulatory Frameworks</span>
            <h2 className="text-4xl text-white mt-3 mb-4 font-serif">
              Built on Global & Local Law
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Our methodology maps directly to POPIA Section 71 and emerging international standards like ISO/IEC 42001.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {standards.map((std, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm hover:border-aic-copper/40 transition-colors"
              >
                <div className="text-aic-copper font-bold text-xl mb-1 font-mono">{std.code}</div>
                <div className="text-white text-lg font-medium mb-4 font-serif">{std.name}</div>
                <p className="text-white/50 text-base leading-relaxed">{std.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-aic-copper text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium tracking-wide">AIC Aligned</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
                className="inline-flex items-center gap-2 bg-aic-navy text-white px-10 py-4 rounded-lg font-medium hover:bg-aic-navy/90 transition-all shadow-lg"
              >
                Become a Founding Partner <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-aic-navy text-aic-navy px-10 py-4 rounded-lg hover:bg-aic-navy/5 transition-all font-medium"
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
