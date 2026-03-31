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

  return (
    <>
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
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-aic-copper rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/professional-portal"
                className="text-xs font-bold text-aic-navy border-2 border-aic-navy px-4 py-2 rounded-lg hover:bg-aic-navy hover:text-white transition-all uppercase tracking-widest font-mono"
              >
                Get Certified
              </Link>
              <Link
                href="/alpha-apply"
                className="text-xs font-bold bg-aic-copper text-white px-4 py-2 rounded-lg hover:bg-aic-copper/90 transition-colors uppercase tracking-widest font-mono"
              >
                Join Alpha
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
          <div className="lg:hidden bg-white border-t border-aic-paper shadow-2xl overflow-y-auto">
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
                <Link
                  href="/professional-portal"
                  className="flex-1 text-center text-xs font-bold text-aic-navy border-2 border-aic-navy px-4 py-5 rounded-xl uppercase tracking-widest font-mono"
                >
                  Get Certified
                </Link>
                <Link
                  href="/ai-governance-index"
                  className="flex-1 text-center text-xs font-bold bg-aic-copper text-white px-4 py-5 rounded-xl uppercase tracking-widest font-mono shadow-lg shadow-aic-copper/20"
                >
                  View AI Index
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
