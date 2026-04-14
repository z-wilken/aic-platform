'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  ArrowRight,
  CheckCircle,
  Eye,
  MessageSquare,
  Bell,
  RefreshCw,
  UserCheck,
} from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1774360502057-a934d7d0ce60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYWJzdHJhY3QlMjB0ZWNobm9sb2d5JTIwYmx1ZXxlbnwxfHx8fDE3NzU1MDg4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const algorithmicRights = [
  {
    icon: Eye,
    title: "Algorithmic Transparency",
    description: "Every individual has the right to know when an AI system is making decisions that affect them and to understand the logic behind those decisions.",
  },
  {
    icon: MessageSquare,
    title: "Algorithmic Explainability",
    description: "Individuals have the right to receive meaningful, human-readable explanations of automated outcomes that affect their rights, welfare, or opportunities.",
  },
  {
    icon: Bell,
    title: "Right to be Informed",
    description: "All persons must be notified whenever they are interacting with or being evaluated by an automated system, prior to the interaction taking place.",
  },
  {
    icon: RefreshCw,
    title: "Decision Recourse",
    description: "No individual shall be subject to a decision based solely on automated processing that significantly affects their legal rights or personal circumstances.",
  },
  {
    icon: UserCheck,
    title: "Human Interaction Choice",
    description: "Every person retains the fundamental right to opt out of AI-mediated services and request human service in any context affecting their material interests.",
  },
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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0C1B2E]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Overlay with 0.55 opacity */}
        <div className="absolute inset-0 bg-[#0C1B2E]/55" />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-8">
              <span className="px-3 py-1 bg-[#7A2535]/20 text-[#7A2535] text-[0.7rem] font-medium rounded border border-[#7A2535]/30 uppercase tracking-[0.15em]">
                IAF MLA Accredited · ISO/IEC 17024
              </span>
            </div>
            <h1 
              className="text-5xl md:text-7xl text-white mb-6 leading-[1.05] tracking-[-0.03em] font-bold"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Certifying the{" "}
              <span className="text-[#7A2535]">Human</span>{" "}
              Behind the Algorithm
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl leading-[1.65]">
              If your company uses AI to make decisions about people, you have a regulatory exposure that needs mapping.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/certification"
                className="inline-flex items-center gap-2 bg-[#7A2535] hover:bg-[#5E1A2B] text-white px-8 py-4 rounded transition-all text-sm font-semibold shadow-lg shadow-[#7A2535]/20"
              >
                See how certification works <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
          <span className="uppercase tracking-widest text-[0.6rem]">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#FAF6EF] py-6 border-b border-[#DDD3C0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            <div className="flex items-center gap-2 px-8">
              <Shield className="w-4 h-4 text-[#7A2535]" />
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#0C1B2E]">POPIA §71 Aligned</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-[#DDD3C0]" />
            <div className="flex items-center gap-2 px-8">
              <Shield className="w-4 h-4 text-[#7A2535]" />
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#0C1B2E]">EU AI Act Ready</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-[#DDD3C0]" />
            <div className="flex items-center gap-2 px-8">
              <Shield className="w-4 h-4 text-[#7A2535]" />
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#0C1B2E]">FSCA Compliant</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-[#DDD3C0]" />
            <div className="flex items-center gap-2 px-8">
              <Shield className="w-4 h-4 text-[#7A2535]" />
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#0C1B2E]">SANAS Accreditation Pathway</span>
            </div>
          </div>
        </div>
      </section>

      {/* Declaration of Algorithmic Rights */}
      <section className="py-24 bg-[#F0E8D6]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#7A2535] text-[0.7rem] uppercase tracking-[0.15em] font-semibold">Why It Matters</span>
            <h2 
              className="text-4xl md:text-5xl text-[#0C1B2E] mt-3 mb-6 leading-[1.1] tracking-[-0.03em] font-bold"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Your AI makes decisions about people. Here&apos;s what they&apos;re entitled to.
            </h2>
            <p className="text-[#6B6458] max-w-2xl mx-auto text-lg leading-[1.65]">
              Regulators in South Africa, the UK, and the EU are codifying five rights that apply when algorithms affect human outcomes. AIC certification maps your systems against every one of them.
            </p>
          </motion.div>

          {/* First row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {algorithmicRights.slice(0, 3).map((right, i) => {
              const Icon = right.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#FAF6EF] border border-[#DDD3C0] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded bg-[#7A2535]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#7A2535]" />
                  </div>
                  <div className="text-[0.7rem] uppercase tracking-[0.15em] text-[#7A2535] font-bold mb-2">Article {i + 1}</div>
                  <h3 className="text-xl font-bold mb-3 text-[#0C1B2E]">{right.title}</h3>
                  <p className="text-[#6B6458] text-sm leading-[1.65]">{right.description}</p>
                </motion.div>
              );
            })}
          </div>
          {/* Second row: 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[66.7%] mx-auto">
            {algorithmicRights.slice(3).map((right, i) => {
              const Icon = right.icon;
              return (
                <motion.div
                  key={i + 3}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 3) * 0.1 }}
                  className="bg-[#FAF6EF] border border-[#DDD3C0] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded bg-[#7A2535]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#7A2535]" />
                  </div>
                  <div className="text-[0.7rem] uppercase tracking-[0.15em] text-[#7A2535] font-bold mb-2">Article {i + 4}</div>
                  <h3 className="text-xl font-bold mb-3 text-[#0C1B2E]">{right.title}</h3>
                  <p className="text-[#6B6458] text-sm leading-[1.65]">{right.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/governance-hub"
              className="inline-flex items-center gap-2 text-[#0C1B2E] border border-[#0C1B2E] px-8 py-4 rounded hover:bg-[#0C1B2E] hover:text-white transition-all text-sm font-bold uppercase tracking-widest"
            >
              Read the Full Declaration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-24 bg-[#F0E8D6] relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#7A2535] text-[0.7rem] uppercase tracking-[0.15em] font-semibold">Professional Standards</span>
            <h2 
              className="text-4xl md:text-5xl text-[#0C1B2E] mt-3 mb-6 leading-[1.05] tracking-[-0.03em] font-bold"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Built on International Frameworks
            </h2>
            <p className="text-[#6B6458] max-w-2xl mx-auto text-lg leading-[1.65]">
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
                className="border border-[#DDD3C0] rounded-xl p-8 bg-[#FAF6EF] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-[#7A2535] font-bold text-lg mb-2">{std.code}</div>
                <div className="text-[#0C1B2E] text-base font-bold mb-3">{std.name}</div>
                <p className="text-[#6B6458] text-sm leading-[1.65]">{std.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[#7A2535] text-[0.7rem] font-bold uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  <span>AIC Aligned</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#7A2535]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-4xl md:text-5xl text-white mb-6 leading-[1.05] tracking-[-0.03em] font-bold"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Ready to Lead Responsible AI?
            </h2>
            <p className="text-white/90 mb-10 text-lg md:text-xl leading-[1.65] max-w-[65ch] mx-auto">
              Join thousands of AI Ethics Leads, Chief AI Officers, and governance professionals who carry the AIC credential — the gold standard in human AI accountability.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#7A2535] px-8 py-4 rounded font-bold hover:bg-[#FAF6EF] transition-all"
              >
                Start Certification Process <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded hover:bg-white/10 transition-all font-bold"
              >
                Corporate Inquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
