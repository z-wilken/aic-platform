import Link from "next/link";
import {
  Shield,
  Globe,
  ExternalLink,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { navItems } from "./Navbar";

export default function Footer() {
  return (
    <footer id="contact" className="bg-aic-navy text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-aic-copper via-transparent to-transparent"></div>
      </div>
      <div className="max-w-[1600px] mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-aic-navy-mid rounded-lg flex items-center justify-center border border-white/10">
                <Shield className="w-5 h-5 text-aic-copper" />
              </div>
              <div>
                <div className="font-bold text-lg font-serif italic">AIC</div>
                <div className="text-white/40 text-[10px] uppercase tracking-wider font-mono">AI Integrity Certification</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-sans">
              The South African benchmark for human accountability in automated systems — certifying that human empathy remains in the loop.
            </p>
            <div className="pt-4 flex items-center gap-2 text-[10px] text-aic-copper font-mono uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              <span>POPIA Section 71 · SANAS Roadmap</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-8 font-mono">Platform</h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 hover:text-aic-copper text-xs transition-colors font-mono uppercase tracking-widest flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-aic-copper" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-8 font-mono">Regulatory</h4>
            <ul className="space-y-4 text-xs text-white/60 font-mono uppercase tracking-widest">
              {[
                "POPIA Section 71",
                "ISO/IEC 42001 (AIMS)",
                "ISO/IEC 17024 (Personnel)",
                "NIST AI RMF",
                "EU AI Act Alignment",
              ].map((std) => (
                <li key={std} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-aic-copper"></span>
                  {std}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-8 font-mono">Contact</h4>
            <ul className="space-y-6 text-sm text-white/60 font-sans">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-aic-copper" />
                </div>
                <span>Johannesburg, South Africa</span>
              </li>
              <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-aic-copper" />
                  </div>
                <a href="mailto:integrity@aiccertified.cloud" className="hover:text-white transition-colors">integrity@aiccertified.cloud</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest">
            © 2026 AI Integrity Certification (Pty) Ltd. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] text-white/20 font-mono uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-aic-copper transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-aic-copper transition-colors">Terms</Link>
            <Link href="/disclosures" className="hover:text-aic-copper transition-colors">Impartiality</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
