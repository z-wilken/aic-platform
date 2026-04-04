"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  BarChart3,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Heart,
  RotateCcw,
  Zap,
  Globe,
  Users,
  ChevronRight,
} from "lucide-react";

const heroBg =
  "https://images.unsplash.com/photo-1694340016914-e684a924f5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000";

const algorithmicRights = [
  {
    icon: Shield,
    title: "Human Agency",
    description:
      "No final decision affecting a person's dignity, freedom, or livelihood shall be made solely by a machine. A named human must remain accountable.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: MessageSquare,
    title: "Explanation",
    description:
      "Every individual has the right to receive a meaningful, human-readable explanation of how an automated outcome was reached.",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: Heart,
    title: "Empathy",
    description:
      "Automated interactions must preserve human dignity. Cold, bureaucratic rejection by algorithms is a design failure that must be remediated.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: RotateCcw,
    title: "Correction",
    description:
      "Every system must provide a clear, accessible, human-staffed mechanism to appeal and correct unjust automated decisions.",
    color: "bg-purple-50 text-purple-700 border-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    icon: Zap,
    title: "Truth",
    description:
      "Every person has the right to know if they are interacting with an AI system. Transparency is the foundation of trust.",
    color: "bg-rose-50 text-rose-700 border-rose-100",
    iconBg: "bg-rose-100",
  },
];

const stats = [
  { value: "R 3,000", label: "Monthly Founding Rate", icon: Award },
  { value: "5", label: "Founding Partner Slots", icon: Users },
  { value: "100%", label: "Human Accountability", icon: Shield },
  { value: "POPIA", label: "Section 71 Aligned", icon: Globe },
];

const standards = [
  {
    code: "POPIA Section 71",
    name: "Automated Decision Making",
    desc: "The legal requirement in South Africa for human intervention in automated decisions that significantly affect data subjects.",
    url: "https://www.justice.gov.za/inforeg/",
  },
  {
    code: "ISO/IEC 42001",
    name: "AI Management Systems",
    desc: "Framework for establishing, implementing, and continually improving an Artificial Intelligence Management System.",
    url: "https://www.iso.org/standard/81230.html",
  },
  {
    code: "NIST AI RMF",
    name: "Risk Management Framework",
    desc: "Voluntary framework for managing AI risks across the full lifecycle, mapping to Govern, Map, and Measure functions.",
    url: "https://airc.nist.gov/RMF",
  },
];

const viewportOpts = { once: true, amount: 0.05, margin: "0px 0px -80px 0px" } as const;

export default function Home() {
  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 opacity-5 subtle-grid" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-5xl"
          >
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <span className="px-3 py-1 bg-aic-gold/20 text-aic-gold-light text-[10px] sm:text-xs rounded-full border border-aic-gold/30 uppercase tracking-widest font-mono">
                Global Standard · POPIA Section 71 Compliant
              </span>
            </div>

            {/* H1 — scaled to match Figma proportions */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-white mb-6 sm:mb-8 leading-[1.05] font-serif">
              Certifying the{" "}
              <span className="text-aic-gold">Human</span>{" "}
              Behind the Algorithm
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl sm:max-w-3xl leading-relaxed">
              AIC is the world&apos;s premier accreditation body focused on certifying the professionals accountable for AI — not just the machines. We establish the global standard for AI governance, ethics, and human responsibility.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/alpha-apply"
                className="inline-flex items-center gap-2 bg-aic-gold hover:bg-[#b07d08] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-lg transition-all text-sm font-semibold shadow-lg shadow-aic-gold/25"
              >
                Become a Founding Partner
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/governance-hub"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 sm:px-8 py-3.5 sm:py-4 rounded-lg transition-all text-sm font-semibold backdrop-blur-sm"
              >
                Explore Algorithmic Rights
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
          <span className="font-mono uppercase tracking-widest text-[10px]">Scroll to explore</span>
          <div className="w-px h-7 bg-gradient-to-b from-white/40 to-transparent mt-1" />
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <section className="bg-aic-navy-mid border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ ...viewportOpts, amount: 0.1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-aic-gold" />
                  </div>
                  <div className="text-white text-3xl lg:text-4xl font-bold font-mono">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-xs uppercase tracking-[0.15em] font-mono mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Declaration of Algorithmic Rights ─────────────────── */}
      <section className="py-20 sm:py-24 bg-aic-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ ...viewportOpts, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-aic-gold text-xs uppercase tracking-[0.3em] font-mono font-bold">
              Universal Principles
            </span>
            <h2 className="text-3xl sm:text-4xl text-aic-navy mt-4 mb-5 font-serif">
              Declaration of Algorithmic Rights
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Our foundational framework ensures that automated systems preserve human dignity. These five rights are the benchmark for AI Integrity Certification (Pty) Ltd.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {algorithmicRights.map((right, i) => {
              const Icon = right.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ ...viewportOpts, amount: 0.05, margin: "0px 0px -60px 0px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                  className={`border rounded-2xl p-6 sm:p-8 transition-all hover:shadow-xl hover:-translate-y-1 bg-white ${right.color} ${
                    i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${right.iconBg} flex items-center justify-center mb-5 shadow-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono opacity-50 mb-2">
                    Article {i + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3">
                    {right.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {right.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/governance-hub"
              className="inline-flex items-center gap-2 text-aic-navy border-2 border-aic-navy px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-aic-navy hover:text-white transition-all text-xs sm:text-sm font-bold uppercase tracking-widest font-mono"
            >
              Read the Full Declaration
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Founding Partner Pricing ───────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-aic-navy rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-5 subtle-grid" />
            <div className="absolute top-0 right-0 p-6 sm:p-8">
              <span className="bg-aic-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                Limited Offer
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl text-white mb-4 sm:mb-6 font-serif italic">
              Founding Partner Program
            </h2>
            <p className="text-white/70 mb-6 sm:mb-8 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              Join the first 5 South African organisations to define the future of human-accountable AI.
            </p>

            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 font-mono">
              R 3,000
              <span className="text-lg sm:text-xl text-white/50">/month</span>
            </div>
            <p className="text-aic-gold text-xs sm:text-sm mb-8 sm:mb-10 font-medium tracking-wide font-mono uppercase">
              Locked for life · Free upgrade to SANAS-accredited certification
            </p>

            <Link
              href="/alpha-apply"
              className="inline-flex items-center gap-2 bg-aic-gold hover:bg-[#b07d08] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold uppercase tracking-widest font-mono transition-all shadow-xl shadow-aic-gold/25 text-xs sm:text-sm"
            >
              Apply for Founding Partner Slot
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Standards ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-aic-navy-mid relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #c9920a 0%, transparent 60%), radial-gradient(circle at 70% 50%, #1d4ed8 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ ...viewportOpts, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-aic-gold text-xs uppercase tracking-[0.3em] font-mono font-bold">
              Regulatory Frameworks
            </span>
            <h2 className="text-3xl sm:text-4xl text-white mt-4 mb-5 font-serif">
              Built on Global &amp; Local Law
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Our methodology maps directly to POPIA Section 71 and emerging international standards like ISO/IEC 42001.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {standards.map((std, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ ...viewportOpts, amount: 0.12, duration: 0.5 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="border border-white/10 rounded-2xl sm:rounded-3xl p-6 md:p-10 bg-white/5 backdrop-blur-md hover:border-aic-gold/40 transition-colors group"
              >
                <div className="text-aic-gold font-bold text-lg sm:text-xl mb-2 font-mono">
                  {std.code}
                </div>
                <div className="text-white text-base sm:text-lg font-medium mb-3 sm:mb-4">
                  {std.name}
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-6 sm:mb-8">
                  {std.desc}
                </p>
                <a
                  href={std.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-aic-gold text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>AIC Aligned · View Standard</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-aic-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ ...viewportOpts, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl text-aic-navy mb-5 sm:mb-6 font-serif italic">
              Is Your AI System Compliant?
            </h2>
            <p className="text-gray-600 mb-8 sm:mb-10 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Don&apos;t wait for a POPIA audit. Start your journey toward human-accountable AI today with AI Integrity Certification (Pty) Ltd.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <Link
                href="/alpha-apply"
                className="inline-flex items-center gap-2 bg-aic-navy text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold uppercase tracking-widest font-mono hover:bg-aic-navy-mid transition-all shadow-xl shadow-black/10 text-xs sm:text-sm"
              >
                Become a Founding Partner
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-aic-navy text-aic-navy px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl hover:bg-aic-navy hover:text-white transition-all font-bold uppercase tracking-widest font-mono text-xs sm:text-sm"
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
