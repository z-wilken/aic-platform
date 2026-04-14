'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Shield, BookOpen, FileText, Newspaper, Menu, X } from "lucide-react";

export const navItems = [
  { href: "/certification",       label: "How It Works",       icon: Shield,    description: "Five-Division Accountability Framework" },
  { href: "/governance-hub",      label: "For Companies",      icon: BookOpen,  description: "Algorithmic Rights & Global Standards" },
  { href: "/corporate-portal",    label: "For Individuals",    icon: Shield,    description: "ISO/IEC 42001 Certification Services" },
  { href: "/articles",            label: "Regulations",            icon: Newspaper, description: "Governance insights and updates" },
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

  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar — solid dark, no transparency */}
      <div className="bg-[#0C1B2E] text-white/70 text-[10px] uppercase tracking-wider py-2">
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
            <Link href="/disclosures" className="hover:text-white transition-colors">Public Disclosures</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main nav — light background, dark text */}
      <nav className={`transition-all duration-300 ${
        scrolled 
          ? "bg-[#FAF6EF] shadow-lg border-b border-[#DDD3C0]" 
          : (isHome ? "bg-transparent" : "bg-[#FAF6EF]")
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
                !scrolled && isHome ? "bg-white/10 backdrop-blur-md" : "bg-[#0C1B2E]"
              }`}>
                <Shield className="w-5 h-5 text-[#C07830]" />
              </div>
              <div>
                <div className={`font-bold text-lg leading-tight tracking-tight ${
                  !scrolled && isHome ? "text-white" : "text-[#0D0D0D]"
                }`}>AIC</div>
                <div className={`text-[10px] leading-tight tracking-widest uppercase ${
                  !scrolled && isHome ? "text-white/60" : "text-[#6B6458]"
                }`}>AI Integrity Certification</div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors relative ${
                    !scrolled && isHome
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-[#6B6458] hover:text-[#0D0D0D] hover:bg-[#F0E8D6]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Copper Button Nav Item */}
              <Link
                href="/contact"
                className="ml-4 bg-[#C07830] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-[#A66628] transition-all shadow-md active:scale-95"
              >
                Get Certified
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 ${
                !scrolled && isHome ? "text-white" : "text-[#0C1B2E]"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden bg-[#FAF6EF] border-t border-[#DDD3C0] overflow-y-auto"
            style={{ maxHeight: "calc(100dvh - 120px)" }}
          >
            <div className="px-4 py-6 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#0C1B2E] text-white"
                        : "text-[#0D0D0D] hover:bg-[#F0E8D6]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="text-base font-semibold">{item.label}</div>
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-[#DDD3C0]">
                <Link
                  href="/contact"
                  className="flex items-center justify-center text-base bg-[#C07830] text-white px-4 py-4 rounded font-bold transition-all"
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
