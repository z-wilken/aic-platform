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

export default function Navbar() {
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
    <>
      {/* Top bar */}
      <div className="bg-[#0a1628] text-white/70 text-[10px] py-2 uppercase tracking-widest font-mono border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-aic-gold" />
              South African Benchmark
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-aic-gold" />
              POPIA Section 71 Aligned
            </span>
          </div>
          <div className="flex items-center gap-6 text-[9px] font-bold">
            <span className="flex items-center gap-1.5 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse"></span>
              SANAS Accreditation: In-Progress
            </span>
            <Link href="/disclosures" className="hover:text-aic-gold transition-colors">Transparency Registry</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white border-b border-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#0f1f3d] rounded-lg flex items-center justify-center group-hover:bg-[#1a3160] transition-colors shadow-xl shadow-[#0f1f3d]/10">
                <Shield className="w-5 h-5 text-aic-gold" />
              </div>
              <div className="hidden sm:block">
                <div className="text-[#0f1f3d] font-bold text-lg leading-tight tracking-tight font-serif italic">AIC</div>
                <div className="text-gray-400 text-[9px] leading-tight tracking-[0.2em] uppercase font-mono font-bold">AI Integrity Certification</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all font-mono relative group ${
                    pathname === item.href
                      ? "text-[#0f1f3d] bg-gray-50"
                      : "text-gray-500 hover:text-[#0f1f3d] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-aic-gold rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={platformUrl}
                className="flex items-center gap-2 text-[11px] font-bold text-[#0f1f3d] hover:text-aic-gold transition-colors px-2 font-mono uppercase tracking-widest"
              >
                <LogIn className="w-4 h-4" />
                Login
              </a>
              <Link
                href="/alpha-apply"
                className="text-[11px] font-bold bg-aic-gold text-white px-5 py-2.5 rounded-lg hover:bg-[#b07d08] transition-colors uppercase tracking-widest font-mono shadow-lg shadow-aic-gold/20"
              >
                Join Alpha
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-[#0f1f3d]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl overflow-y-auto" style={{ maxHeight: 'calc(100dvh - 120px)' }}>
            <div className="px-4 py-8 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-6 py-5 rounded-xl transition-all ${
                      pathname === item.href
                        ? "bg-[#0f1f3d] text-white shadow-lg shadow-[#0f1f3d]/20"
                        : "text-[#0f1f3d] hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${pathname === item.href ? "text-aic-gold" : "text-[#0f1f3d]/50"}`} />
                    <div>
                      <div className="text-sm font-bold uppercase tracking-widest font-mono">{item.label}</div>
                      <div className="text-[10px] opacity-70 font-sans">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
              <div className="pt-8 flex flex-col gap-4 px-4">
                <a
                  href={platformUrl}
                  className="flex items-center justify-center gap-2 w-full text-xs font-bold text-white bg-[#0f1f3d] py-5 rounded-xl hover:bg-[#1a3160] transition-all shadow-lg shadow-[#0f1f3d]/20 uppercase tracking-widest font-mono"
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
    </>
  );
}

export { navItems };
