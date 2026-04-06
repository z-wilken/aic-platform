import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-aic-navy text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col">
              <span className="text-white font-heading text-2xl font-bold leading-none tracking-tight">
                AIC
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-aic-copper leading-none mt-1">
                AI Integrity Certification
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs font-sans">
              Certifying the human accountability behind automated decision systems. Based in Johannesburg, serving the global standard.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-aic-copper mb-6 font-mono">
              Platform
            </h4>
            <ul className="space-y-4">
              <li><Link href="/divisions" className="text-white/60 hover:text-white transition-colors text-sm">Divisions</Link></li>
              <li><Link href="/classify" className="text-white/60 hover:text-white transition-colors text-sm">Classify</Link></li>
              <li><Link href="/articles" className="text-white/60 hover:text-white transition-colors text-sm">Articles</Link></li>
              <li><Link href="/waitlist" className="text-white/60 hover:text-white transition-colors text-sm">Waitlist</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-aic-copper mb-6 font-mono">
              Governance
            </h4>
            <ul className="space-y-4">
              <li><Link href="/impartiality" className="text-white/60 hover:text-white transition-colors text-sm">Impartiality</Link></li>
              <li><Link href="/privacy" className="text-white/60 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/60 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-aic-copper mb-6 font-mono">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                <MapPin className="w-4 h-4 text-aic-copper shrink-0 mt-0.5" />
                <span>Johannesburg, South Africa</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-aic-copper shrink-0" />
                <a href="mailto:info@aiccertified.cloud" className="hover:text-white transition-colors">
                  info@aiccertified.cloud
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.1em]">
            © 2026 AI Integrity Certification (Pty) Ltd.
          </p>
          <div className="flex gap-8 text-[10px] text-white/30 font-mono uppercase tracking-[0.1em]">
            <span>POPIA Section 71 Compliant</span>
            <span>Registration: 2026/012345/07</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
