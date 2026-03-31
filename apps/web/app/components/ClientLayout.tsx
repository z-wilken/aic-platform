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
  LogIn,
  ArrowRight,
} from "lucide-react";

const navItems = [
  {
    label: "Governance Hub",
    href: "/governance-hub",
    icon: BookOpen,
    description: "The 5 Algorithmic Rights Framework",
  },
  {
    label: "Corporate Portal",
    href: "/corporate-portal",
    icon: Shield,
    description: "POPIA Section 71 Certification",
  },
  {
    label: "Professional Portal",
    href: "/professional-portal",
    icon: Award,
    description: "Human Accountability Practitioner",
  },
  {
    label: "AI Governance Index",
    href: "/ai-governance-index",
    icon: BarChart3,
    description: "JSE Top 40 AI Maturity Rankings",
  },
  {
    label: "Disclosures",
    href: "/disclosures",
    icon: FileText,
    description: "Transparency & Accreditation Roadmap",
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
  }, [pathname]);

  const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.aiccertified.cloud";

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      {/* Top bar */}
      <div className="bg-aic-navy text-white/50 text-[10px] py-2 uppercase tracking-widest font-mono">
        <div className="max-w-[1600px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-aic-copper" />
              South African Benchmark
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-aic-copper" />
              POPIA Section 71 Aligned
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/disclosures" className="hover:text-aic-copper transition-colors">Transparency Registry</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-aic-paper"
            : "bg-white border-b border-aic-paper"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-aic-navy rounded-lg flex items-center justify-center group-hover:bg-aic-navy-mid transition-colors shadow-lg shadow-aic-navy/10">
                <Shield className="w-5 h-5 text-aic-copper" />
              </div>
              <div className="hidden sm:block">
                <div className="text-aic-navy font-bold text-lg leading-tight tracking-tight font-serif italic">AIC</div>
                <div className="text-gray-400 text-[10px] leading-tight tracking-wider uppercase font-mono">AI Integrity Certification</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all font-mono relative group ${
                    pathname === item.href
                      ? "text-aic-navy bg-aic-paper"
                      : "text-gray-500 hover:text-aic-navy hover:bg-aic-paper"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.span 
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-aic-copper rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={platformUrl}
                className="flex items-center gap-2 text-xs font-bold text-aic-navy hover:text-aic-copper transition-colors px-2 font-mono uppercase tracking-widest"
              >
                <LogIn className="w-4 h-4" />
                Login
              </a>
              <Link
                href="/alpha-apply"
                className="text-xs font-bold bg-aic-navy text-white px-6 py-3 rounded-lg hover:bg-aic-navy-mid transition-all shadow-lg shadow-aic-navy/10 uppercase tracking-widest font-mono flex items-center gap-2"
              >
                Join Alpha <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-aic-navy"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-aic-paper shadow-2xl h-screen overflow-y-auto">
            <div className="px-4 py-8 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-6 py-5 rounded-xl transition-all ${
                      pathname === item.href
                        ? "bg-aic-navy text-white shadow-lg shadow-aic-navy/20"
                        : "text-aic-navy hover:bg-aic-paper"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${pathname === item.href ? "text-aic-copper" : "text-aic-navy/50"}`} />
                    <div>
                      <div className="text-sm font-bold uppercase tracking-widest font-mono">{item.label}</div>
                      <div className="text-[10px] opacity-70 font-sans">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
              <div className="pt-8 flex flex-col gap-4">
                <a
                  href={platformUrl}
                  className="flex items-center justify-center gap-2 w-full text-xs font-bold text-white bg-aic-navy py-5 rounded-xl hover:bg-aic-navy-mid transition-all shadow-lg shadow-aic-navy/20 uppercase tracking-widest font-mono"
                >
                  <LogIn className="w-4 h-4" />
                  Client Login
                </a>
                <Link
                    href="/alpha-apply"
                    className="flex-1 text-center text-xs font-bold text-aic-navy border-2 border-aic-navy px-4 py-5 rounded-xl uppercase tracking-widest font-mono"
                >
                    Apply for Alpha
                </Link>
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
                      <ChevronRight className="w-3 h-3" />
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
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-aic-copper"></span>
                  POPIA Section 71
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-aic-copper"></span>
                  ISO/IEC 42001
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-aic-copper"></span>
                  ISO/IEC 17024
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-aic-copper"></span>
                  NIST AI RMF
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-8 font-mono">Contact</h4>
              <ul className="space-y-6 text-sm text-white/60 font-sans">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-aic-copper" />
                  </div>
                  <span>Johannesburg, South Africa</span>
                </li>
                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <LogIn className="w-4 h-4 text-aic-copper" />
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
    </div>
  );
}
