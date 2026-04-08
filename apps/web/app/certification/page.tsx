'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  UserCheck,
  Eye,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

const tiers = [
  {
    tier: "Tier 1",
    label: "Critical",
    sublabel: "Human-Approved",
    color: "blue",
    icon: UserCheck,
    description:
      "Every consequential decision is touched, reviewed, and countersigned by a named, accountable human before it takes effect. The accountability chain is fully documented and immutable.",
    requirement:
      "Required for decisions where the outcome cannot reasonably be reversed and materially affects a person's livelihood, freedom, health, or financial standing.",
    sectors: [
      "Credit adjudication",
      "Employment termination",
      "Healthcare diagnosis support",
      "Law enforcement flagging",
    ],
    obligations: [
      "Named human approver documented per decision",
      "Decision rationale on file in plain language",
      "Full audit log signed with RSA-3072",
      "Override mechanism tested quarterly",
      "Annual AIC on-site verification",
    ],
  },
  {
    tier: "Tier 2",
    label: "Elevated",
    sublabel: "Supervised",
    color: "amber",
    icon: Eye,
    description:
      "Automated decisions proceed in standard cases. Flagged or edge-case decisions are escalated to a named supervisor within 24 hours for human review before outcome is communicated.",
    requirement:
      "Required for decisions with medium material impact where reversal is possible but burdensome, and where patterns of bias or error carry reputational or legal risk.",
    sectors: [
      "Insurance underwriting",
      "Academic and scholarship scoring",
      "Benefits and welfare assessment",
      "Rental application processing",
    ],
    obligations: [
      "Escalation logic documented and tested",
      "Named supervisor per decision category",
      "24-hour SLA on flagged decisions",
      "Monthly bias audit across demographics",
      "Bi-annual AIC remote verification",
    ],
  },
  {
    tier: "Tier 3",
    label: "Standard",
    sublabel: "Monitored",
    color: "emerald",
    icon: Shield,
    description:
      "Automated decisions execute at speed. An immutable audit trail captures every decision. Human oversight occurs at the batch or weekly report level — anomalies trigger escalation.",
    requirement:
      "Appropriate where individual decisions are low-stakes, reversible, and consistent. Acceptable risk profile requires ongoing monitoring rather than per-decision review.",
    sectors: [
      "Customer service query routing",
      "Content moderation queuing",
      "Internal resource scheduling",
      "Marketing personalisation",
    ],
    obligations: [
      "Immutable per-decision audit log",
      "Weekly anomaly review by designated officer",
      "Quarterly statistical bias report",
      "Plaintext explanation available on request",
      "Annual AIC self-assessment + documentation review",
    ],
  },
];

const certificationProcess = [
  {
    step: "01",
    title: "Self-Assessment",
    description:
      "Complete AIC's structured self-assessment questionnaire to determine applicable tier and identify gaps.",
  },
  {
    step: "02",
    title: "Gap Analysis",
    description:
      "AIC reviews your systems and processes against the tier standard. A written gap report is produced within 10 business days.",
  },
  {
    step: "03",
    title: "Remediation Period",
    description:
      "Your team addresses identified gaps. AIC provides technical guidance and access to the AI Governance Index reference materials.",
  },
  {
    step: "04",
    title: "Verification Audit",
    description:
      "AIC conducts a structured verification (remote for Tier 3, hybrid for Tier 2, on-site for Tier 1) to confirm compliance.",
  },
  {
    step: "05",
    title: "Certification Issued",
    description:
      "Upon passing verification, AIC issues your Certification Mark and registers you on the public AI Governance Index.",
  },
];

const colorMap: Record<string, { text: string; border: string; bg: string; badge: string }> = {
  blue: {
    text: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  amber: {
    text: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
};

export default function CertificationPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-[#0a1628]/85" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 w-full">
          <span className="inline-block text-xs font-mono tracking-widest text-[#f0b429] uppercase mb-4">
            AIC Certification Framework
          </span>
          <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-4 leading-tight">
            Three-Tier Certification
          </h1>
          <p className="text-white/70 max-w-xl text-lg leading-relaxed">
            AIC certifies the accountability behind automated decisions — not the
            technology itself. Every tier demands a named human responsible for
            every consequential outcome.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-mono tracking-widest text-[#c9920a] uppercase mb-4">
            The Framework
          </p>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-serif text-[#0a1628] mb-4 leading-snug">
                Accountability is calibrated to risk
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AIC does not audit technology. We audit whether a named, accountable
                human is genuinely responsible for the decisions an algorithm makes.
                The three tiers define how deeply that accountability must be embedded —
                from per-decision human approval to batch-level monitoring.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Tier assignment is determined by the material impact of the decision,
                the reversibility of outcomes, and the regulatory exposure of the
                organisation. AIC&apos;s gap analysis confirms the appropriate tier.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {tiers.map((t) => (
                <div
                  key={t.tier}
                  className="text-center p-4 rounded-xl border border-gray-100 bg-[#f8fafc]"
                >
                  <p className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-1">
                    {t.tier}
                  </p>
                  <p className="font-serif text-[#0a1628] text-lg">{t.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-mono tracking-widest text-[#c9920a] uppercase mb-4 text-center">
            Certification Tiers
          </p>
          <h2 className="text-3xl font-serif text-[#0a1628] mb-12 text-center">
            What each tier demands
          </h2>
          <div className="space-y-8">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              const c = colorMap[tier.color];
              return (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border ${c.border} bg-[#0f1f3d] overflow-hidden`}
                >
                  <div className="p-8 md:p-10">
                    <div className="flex items-start gap-5 mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-6 h-6 ${c.text}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className={`text-xs font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${c.badge}`}
                          >
                            {tier.tier}
                          </span>
                        </div>
                        <h3 className="text-2xl font-serif text-white">
                          {tier.label}{" "}
                          <span className="text-white/50 italic">
                            / {tier.sublabel}
                          </span>
                        </h3>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed mb-4">
                      {tier.description}
                    </p>
                    <div
                      className={`rounded-lg p-4 ${c.bg} border ${c.border} mb-6`}
                    >
                      <p className={`text-xs font-mono tracking-widest uppercase mb-2 ${c.text}`}>
                        When it applies
                      </p>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {tier.requirement}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
                          Typical Sectors
                        </p>
                        <ul className="space-y-2">
                          {tier.sectors.map((s) => (
                            <li
                              key={s}
                              className="flex items-center gap-2 text-sm text-white/60"
                            >
                              <CheckCircle
                                className={`w-4 h-4 ${c.text} flex-shrink-0`}
                              />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
                          Key Obligations
                        </p>
                        <ul className="space-y-2">
                          {tier.obligations.map((o) => (
                            <li
                              key={o}
                              className="flex items-start gap-2 text-sm text-white/60"
                            >
                              <ArrowRight
                                className={`w-4 h-4 ${c.text} flex-shrink-0 mt-0.5`}
                              />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-mono tracking-widest text-[#c9920a] uppercase mb-4 text-center">
            How It Works
          </p>
          <h2 className="text-3xl font-serif text-[#0a1628] mb-12 text-center">
            The certification process
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {certificationProcess.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#0a1628] text-white font-mono text-sm flex items-center justify-center mx-auto mb-3">
                  {step.step}
                </div>
                <h3 className="font-semibold text-[#0a1628] text-sm mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a1628]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block bg-[#c9920a]/20 text-[#f0b429] text-xs font-mono px-3 py-1 rounded-full border border-[#c9920a]/30 uppercase tracking-widest mb-6">
            Get Started
          </span>
          <h2 className="text-3xl font-serif italic text-white mb-4">
            Enquire about certification
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto leading-relaxed">
            AIC will assess your organisation&apos;s decision landscape, assign the
            appropriate tier, and guide you through the certification process.
            Founding Partners receive priority scheduling and permanent rate protection.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#c9920a] hover:bg-[#b07d08] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-xl shadow-[#c9920a]/25 text-xs"
          >
            Enquire About Certification
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
