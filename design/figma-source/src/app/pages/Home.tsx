import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Shield,
  Award,
  BarChart3,
  BookOpen,
  FileText,
  ArrowRight,
  CheckCircle,
  Eye,
  MessageSquare,
  Bell,
  RefreshCw,
  UserCheck,
  Globe,
  TrendingUp,
  Users,
  Building2,
  Star,
  ChevronRight,
} from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1694340016914-e684a924f5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBnb3Zlcm5hbmNlJTIwcHJvZmVzc2lvbmFsJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcxOTYyNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080";

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

const portals = [
  {
    icon: BookOpen,
    label: "Governance Hub",
    href: "/governance-hub",
    description: "Algorithmic Rights standards, global policy maps, and regulatory updates for researchers and policymakers.",
    accent: "#1d4ed8",
    tag: "Policy & Research",
  },
  {
    icon: Shield,
    label: "Corporate Portal",
    href: "/corporate-portal",
    description: "ISO/IEC 42001 certification services, AI risk templates, and gap analysis tools for Chief Risk Officers.",
    accent: "#0f1f3d",
    tag: "Enterprise",
  },
  {
    icon: Award,
    label: "Professional Portal",
    href: "/professional-portal",
    description: "ISO/IEC 17024 personnel certification, exam scheduling, and competency development guides.",
    accent: "#c9920a",
    tag: "Individual Certification",
  },
  {
    icon: BarChart3,
    label: "AI Governance Index",
    href: "/ai-governance-index",
    description: "Interactive dashboard ranking Fortune 500 companies on AI maturity, board oversight, and accountability.",
    accent: "#059669",
    tag: "Rankings & Analytics",
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

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0f1f3d]/90 to-[#1a3160]/80" />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-[#c9920a]/20 text-[#f0b429] text-xs rounded-full border border-[#c9920a]/30 uppercase tracking-wider">
                IAF MLA Accredited · ISO/IEC 17024
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight" style={{ fontFamily: "'Merriweather', serif", fontWeight: 700 }}>
              Certifying the{" "}
              <span className="text-[#c9920a]">Human</span>{" "}
              Behind the Algorithm
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              AIC is the world's premier accreditation body focused on certifying the professionals accountable for AI — not just the machines. We establish the global standard for AI governance, ethics, and human responsibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/professional-portal"
                className="inline-flex items-center gap-2 bg-[#c9920a] hover:bg-[#b07d08] text-white px-8 py-4 rounded-lg transition-all text-sm font-medium shadow-lg shadow-[#c9920a]/20"
              >
                Get Certified Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/governance-hub"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg transition-all text-sm font-medium backdrop-blur-sm"
              >
                Explore Algorithmic Rights <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0f1f3d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
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
                    <Icon className="w-5 h-5 text-[#c9920a]" />
                  </div>
                  <div className="text-white text-3xl font-bold">{stat.value}</div>
                  <div className="text-white/50 text-sm mt-0.5">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Declaration of Algorithmic Rights */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9920a] text-sm uppercase tracking-widest font-medium">Universal Standard</span>
            <h2 className="text-4xl text-[#0f1f3d] mt-3 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Declaration of Algorithmic Rights
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
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
                  className={`border rounded-xl p-6 ${right.color} ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-lg ${right.iconBg} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Article {i + 1}</div>
                  <h3 className="text-base font-semibold mb-2">{right.title}</h3>
                  <p className="text-sm leading-relaxed opacity-80">{right.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/governance-hub"
              className="inline-flex items-center gap-2 text-[#0f1f3d] border border-[#0f1f3d] px-6 py-3 rounded-lg hover:bg-[#0f1f3d] hover:text-white transition-all text-sm font-medium"
            >
              Read the Full Declaration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Portals */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c9920a] text-sm uppercase tracking-widest font-medium">Our Portals</span>
            <h2 className="text-4xl text-[#0f1f3d] mt-3 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Serve Your Stakeholder Role
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              AIC's multi-portal architecture ensures targeted resources for every type of stakeholder in the AI governance ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portals.map((portal, i) => {
              const Icon = portal.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={portal.href}
                    className="group block border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white overflow-hidden relative"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                      style={{ background: portal.accent }}
                    />
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: portal.accent + "15" }}
                      >
                        <Icon className="w-6 h-6" style={{ color: portal.accent }} />
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
                        {portal.tag}
                      </span>
                    </div>
                    <h3 className="text-xl text-[#0f1f3d] mb-2 font-semibold">{portal.label}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{portal.description}</p>
                    <div className="flex items-center gap-1 text-sm font-medium" style={{ color: portal.accent }}>
                      Enter Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-24 bg-[#0f1f3d] relative overflow-hidden">
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
            <span className="text-[#c9920a] text-sm uppercase tracking-widest font-medium">Professional Standards</span>
            <h2 className="text-4xl text-white mt-3 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Built on International Frameworks
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-base">
              All AIC certification programs are rigorously aligned with the most authoritative international standards in AI governance and personnel certification.
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
                className="border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm hover:border-[#c9920a]/40 transition-colors"
              >
                <div className="text-[#c9920a] font-bold text-lg mb-1">{std.code}</div>
                <div className="text-white text-base font-medium mb-3">{std.name}</div>
                <p className="text-white/50 text-sm leading-relaxed">{std.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-[#c9920a] text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>AIC Aligned</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-[#0f1f3d] mb-2">
                Recognized by the International Accreditation Forum
              </h3>
              <p className="text-gray-500 text-sm">
                AIC operates under the IAF Multilateral Recognition Arrangement (MLA), providing internationally recognized certifications accepted in 100+ jurisdictions.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center shrink-0">
              {["IAF MLA", "ISO/IEC 17011", "ILAC MRA", "APAC MLA", "EA MLA"].map((badge) => (
                <div key={badge} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium bg-gray-50">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#c9920a] to-[#b07d08]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-white mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Ready to Lead Responsible AI?
            </h2>
            <p className="text-white/80 mb-10 text-lg">
              Join thousands of AI Ethics Leads, Chief AI Officers, and governance professionals who carry the AIC credential — the gold standard in human AI accountability.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/professional-portal"
                className="inline-flex items-center gap-2 bg-white text-[#c9920a] px-8 py-4 rounded-lg font-medium hover:bg-white/90 transition-all"
              >
                Start Certification Process <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/corporate-portal"
                className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-medium"
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
