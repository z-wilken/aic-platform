import Link from "next/link";
import { Shield, Mail, MapPin, ChevronRight } from "lucide-react";
import { navItems } from "./Navbar";

export default function Footer() {
  return (
    <footer id="contact" className="bg-aic-navy text-white overflow-hidden relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-aic-copper via-transparent to-transparent" />
      </div>

      {/* Manifesto band */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <div className="text-aic-gold text-[10px] uppercase tracking-[0.3em] font-mono font-bold mb-5">
                Our Mission
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-serif italic leading-relaxed">
                Certifying that a named human remains accountable for every decision that matters.
              </h2>
            </div>
            <Link
              href="/alpha-apply"
              className="shrink-0 inline-flex items-center gap-2 bg-aic-gold hover:bg-[#b07d08] text-white px-7 py-4 rounded-xl transition-all text-xs font-bold uppercase tracking-widest font-mono shadow-xl shadow-aic-gold/20 self-start lg:self-auto"
            >
              Become a Founding Partner
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-aic-navy-mid rounded-lg flex items-center justify-center border border-white/10 shrink-0">
                <Shield className="w-5 h-5 text-aic-gold" />
              </div>
              <div>
                <div className="font-bold text-lg font-serif italic">AIC</div>
                <div className="text-white/40 text-[10px] uppercase tracking-wider font-mono">
                  AI Integrity Certification
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              The world&apos;s premier accreditation body certifying the professionals accountable for AI — not just the machines.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[10px] text-aic-gold font-mono uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>POPIA Section 71 · SANAS Roadmap</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-7 font-mono">
              Platform
            </h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-aic-gold text-xs transition-colors font-mono uppercase tracking-widest flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-aic-gold opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-7 font-mono">
              Regulatory
            </h4>
            <ul className="space-y-4 text-xs text-white/60 font-mono uppercase tracking-widest">
              {[
                "POPIA Section 71",
                "ISO/IEC 42001 (AIMS)",
                "ISO/IEC 17024 (Personnel)",
                "NIST AI RMF",
                "EU AI Act Alignment",
              ].map((std) => (
                <li key={std} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-aic-gold shrink-0" />
                  {std}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-7 font-mono">
              Contact
            </h4>
            <ul className="space-y-5 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-aic-gold" />
                </div>
                <span className="leading-relaxed">Johannesburg, South Africa</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-aic-gold" />
                </div>
                <a
                  href="mailto:integrity@aiccertified.cloud"
                  className="hover:text-white transition-colors break-all"
                >
                  integrity@aiccertified.cloud
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest text-center sm:text-left">
            © 2026 AI Integrity Certification (Pty) Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 sm:gap-8 text-[10px] text-white/20 font-mono uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-aic-gold transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-aic-gold transition-colors">
              Terms
            </Link>
            <Link href="/disclosures" className="hover:text-aic-gold transition-colors">
              Impartiality
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
