"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  Globe,
  Award,
  BarChart3,
  BookOpen,
  FileText,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  LogIn,
} from "lucide-react";

const navItems = [
  {
    label: "Governance Hub",
    href: "/governance-hub",
    icon: BookOpen,
    description: "Algorithmic Rights & Global Standards",
  },
  {
    label: "Corporate Portal",
    href: "/corporate-portal",
    icon: Shield,
    description: "ISO/IEC 42001 Certification Services",
  },
  {
    label: "Professional Portal",
    href: "/professional-portal",
    icon: Award,
    description: "ISO/IEC 17024 Personnel Certification",
  },
  {
    label: "AI Governance Index",
    href: "/ai-governance-index",
    icon: BarChart3,
    description: "Fortune 500 AI Maturity Rankings",
  },
  {
    label: "Disclosures",
    href: "/disclosures",
    icon: FileText,
    description: "Impartiality & Accreditation Directory",
  },
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    // window.scrollTo(0, 0); // Next.js handles scroll on navigation
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top bar */}
      <div className="bg-[#0a1628] text-white/70 text-xs py-2">
        <div className="max-w-[1600px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              IAF MLA Accredited Body
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
              Certification Status: Active
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/disclosures" className="hover:text-white transition-colors">Public Disclosures</Link>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#0f1f3d] rounded-lg flex items-center justify-center group-hover:bg-[#1a3160] transition-colors">
                <Shield className="w-5 h-5 text-[#c9920a]" />
              </div>
              <div>
                <div className="text-[#0f1f3d] font-bold text-lg leading-tight tracking-tight">AIC</div>
                <div className="text-gray-500 text-[10px] leading-tight tracking-wider uppercase">AI Certification Institute</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm transition-colors relative group ${
                    pathname === item.href
                      ? "text-[#0f1f3d] bg-[#f0f4f8]"
                      : "text-gray-600 hover:text-[#0f1f3d] hover:bg-[#f0f4f8]"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c9920a] rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="http://localhost:3001"
                className="flex items-center gap-2 text-sm font-semibold text-[#0f1f3d] hover:text-[#c9920a] transition-colors px-2 mr-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </a>
              <Link
                href="/professional-portal"
                className="text-sm text-[#0f1f3d] border border-[#0f1f3d] px-4 py-2 rounded-md hover:bg-[#0f1f3d] hover:text-white transition-all"
              >
                Get Certified
              </Link>
              <Link
                href="/ai-governance-index"
                className="text-sm bg-[#c9920a] text-white px-4 py-2 rounded-md hover:bg-[#b07d08] transition-colors"
              >
                View AI Index
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="max-w-[1600px] mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-[#0f1f3d] text-white"
                        : "text-gray-700 hover:bg-[#f0f4f8]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href="http://localhost:3001"
                  className="flex items-center justify-center gap-2 w-full text-center text-sm font-bold text-white bg-[#0f1f3d] py-3 rounded-md hover:bg-[#1a3160] transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Client Login
                </a>
                <div className="flex gap-2">
                  <Link
                    href="/professional-portal"
                    className="flex-1 text-center text-sm text-[#0f1f3d] border border-[#0f1f3d] px-4 py-2 rounded-md"
                  >
                    Get Certified
                  </Link>
                  <Link
                    href="/ai-governance-index"
                    className="flex-1 text-center text-sm bg-[#c9920a] text-white px-4 py-2 rounded-md"
                  >
                    View AI Index
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#0a1628] text-white">
        <div className="max-w-[1600px] mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a3160] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#c9920a]" />
                </div>
                <div>
                  <div className="font-bold text-lg">AIC</div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wider">AI Certification Institute</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The global standard for certifying the humans accountable for AI systems — ensuring transparency, accountability, and trust in the age of artificial intelligence.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-[#c9920a]">
                <Globe className="w-3 h-3" />
                <span>IAF MLA Accredited · ISO/IEC 17024</span>
              </div>
            </div>

            {/* Portals */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Portals</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#c9920a] inline-block"></span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Standards */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Standards</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-[#c9920a]" />
                  ISO/IEC 42001 (AIMS)
                </li>
                <li className="flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-[#c9920a]" />
                  ISO/IEC 17024 (Personnel)
                </li>
                <li className="flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-[#c9920a]" />
                  NIST AI RMF
                </li>
                <li className="flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-[#c9920a]" />
                  EU AI Act Alignment
                </li>
                <li className="flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-[#c9920a]" />
                  IEEE 7000 Series
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#c9920a] shrink-0" />
                  <span>1225 Eye Street NW, Suite 550<br />Washington, DC 20005</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#c9920a] shrink-0" />
                  <a href="mailto:info@aic-cert.org" className="hover:text-white transition-colors">info@aic-cert.org</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c9920a] shrink-0" />
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
              <Link href="/disclosures" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link href="/disclosures" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
              <Link href="/disclosures" className="hover:text-gray-300 transition-colors">Impartiality Statement</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
