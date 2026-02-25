import Link from "next/link";
import {
  Shield,
  Globe,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { navItems } from "./Navbar";

export default function Footer() {
  return (
    <footer id="contact" className="bg-aic-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-aic-navy-light rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-aic-copper" />
              </div>
              <div>
                <div className="font-bold text-lg">AIC</div>
                <div className="text-gray-400 text-[10px] uppercase tracking-wider">
                  AI Certification Institute
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The global standard for certifying the humans accountable for AI systems — ensuring
              transparency, accountability, and trust in the age of artificial intelligence.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-aic-copper">
              <Globe className="w-3 h-3" />
              <span>IAF MLA Accredited · ISO/IEC 17024</span>
            </div>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Portals
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-aic-copper inline-block"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Standards
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                "ISO/IEC 42001 (AIMS)",
                "ISO/IEC 17024 (Personnel)",
                "NIST AI RMF",
                "EU AI Act Alignment",
                "IEEE 7000 Series",
              ].map((std) => (
                <li key={std} className="flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-aic-copper" />
                  {std}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-aic-copper shrink-0" />
                <span>
                  1225 Eye Street NW, Suite 550
                  <br />
                  Washington, DC 20005
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-aic-copper shrink-0" />
                <a href="mailto:info@aic-cert.org" className="hover:text-white transition-colors">
                  info@aic-cert.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-aic-copper shrink-0" />
                <span>+1 (202) 555-0190</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 AI Certification Institute. All rights reserved. Accredited under IAF MLA.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/disclosures" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/disclosures" className="hover:text-gray-300 transition-colors">
              Terms of Use
            </Link>
            <Link href="/disclosures" className="hover:text-gray-300 transition-colors">
              Impartiality Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
