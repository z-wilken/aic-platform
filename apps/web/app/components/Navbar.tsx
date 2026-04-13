'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Shield, BookOpen, FileText, Newspaper, Menu, X } from "lucide-react";

export const navItems = [
  { href: "/certification",       label: "Certification",       icon: Shield,    description: "Five-Division Accountability Framework" },
  { href: "/governance-hub",      label: "Governance Hub",      icon: BookOpen,  description: "Algorithmic Rights & Global Standards" },
  { href: "/corporate-portal",    label: "Corporate Portal",    icon: Shield,    description: "ISO/IEC 42001 Certification Services" },
  // { href: "/professional-portal", label: "Professional Portal", icon: Award,     description: "ISO/IEC 17024 Personnel Certification" },
  // { href: "/ai-governance-index", label: "AI Governance Index", icon: BarChart3, description: "JSE AI Maturity Rankings" },
  { href: "/articles",            label: "Articles",            icon: Newspaper, description: "Governance insights and updates" },
  { href: "/disclosures",         label: "Disclosures",         icon: FileText,  description: "Impartiality & Accreditation Directory" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar — solid dark, no transparency */}
      <div className="bg-[#0A111F] text-aic-paper/70 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              IAF MLA Accredited Body
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Certification Status: Active
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/disclosures" className="hover:text-aic-paper transition-colors">Public Disclosures</Link>
            <Link href="/contact" className="hover:text-aic-paper transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main nav — aic-paper background, dark text */}
      <nav className={`transition-all duration-300 ${
        scrolled ? "bg-aic-paper/95 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-aic-paper shadow-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#0A111F] rounded-lg flex items-center justify-center group-hover:bg-[#1a3160] transition-colors">
                <Shield className="w-5 h-5 text-[#C17C4E]" />
              </div>
              <div>
                <div className="text-[#0A111F] font-bold text-lg leading-tight tracking-tight">AIC</div>
                <div className="text-gray-500 text-[10px] leading-tight tracking-wider uppercase">AI Integrity Certification</div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm transition-colors relative ${
                    pathname === item.href
                      ? "text-[#0A111F] bg-[#f0f4f8] font-medium"
                      : "text-gray-600 hover:text-[#0A111F] hover:bg-[#f0f4f8]"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C17C4E] rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="text-sm text-[#0A111F] border border-[#0A111F] px-4 py-2 rounded-md hover:bg-[#0A111F] hover:text-aic-paper transition-all"
              >
                Get Certified
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-[#0A111F] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden bg-aic-paper border-t border-gray-100 overflow-y-auto"
            style={{ maxHeight: "calc(100dvh - 120px)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#0A111F] text-aic-paper"
                        : "text-gray-700 hover:bg-[#f0f4f8]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#C17C4E]" : "text-gray-400"}`} />
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className={`text-xs ${isActive ? "text-aic-paper/70" : "text-gray-500"}`}>{item.description}</div>
                    </div>
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-gray-100">
                <Link
                  href="/contact"
                  className="flex items-center justify-center text-sm text-[#0A111F] border border-[#0A111F] px-4 py-3 rounded-md hover:bg-[#0A111F] hover:text-aic-paper transition-all font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Certified
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
