"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const navItems = [
  { href: "/ai-governance-index", label: "AI Index" },
  { href: "/governance-hub", label: "Governance hub" },
  { href: "/corporate-portal", label: "Corporate" },
  { href: "/disclosures", label: "Disclosures" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar — IAF MLA accreditation status */}
      <div className="bg-aic-navy/95 border-b border-white/10 px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono tracking-wider">
          <div className="flex items-center gap-4 text-white/60">
            <span>IAF MLA Accredited Body</span>
            <span className="text-white/30">·</span>
            <span className="text-green-400 font-medium">Certification Status: Active</span>
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <Link href="/disclosures" className="hover:text-aic-gold transition-colors">
              Public Disclosures
            </Link>
            <Link href="/contact" className="hover:text-aic-gold transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-aic-navy/98 shadow-lg backdrop-blur-sm"
            : "bg-aic-navy/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span className="text-white font-serif text-lg leading-none tracking-tight">
                AIC
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase font-mono text-aic-gold/80 leading-none mt-0.5">
                AI Certification Institute
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/75 text-[13px] font-medium hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="text-[13px] font-medium px-4 py-2 border-2 border-white/30 text-white rounded-md hover:border-white/60 transition-colors"
              >
                Get Certified
              </Link>
              <Link
                href="/ai-governance-index"
                className="text-[13px] font-semibold px-4 py-2 bg-aic-gold text-aic-navy rounded-md hover:bg-aic-gold/90 transition-colors"
              >
                View AI Index
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden bg-aic-navy border-t border-white/10 overflow-y-auto"
            style={{ maxHeight: "calc(100dvh - 110px)" }}
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 text-base font-medium py-2 border-b border-white/10 hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/contact"
                  className="text-center font-medium px-4 py-3 border-2 border-white/30 text-white rounded-md hover:border-white/60 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Certified
                </Link>
                <Link
                  href="/ai-governance-index"
                  className="text-center font-semibold px-4 py-3 bg-aic-gold text-aic-navy rounded-md hover:bg-aic-gold/90 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  View AI Index
                </Link>
              </div>
              <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-white/40 tracking-wider">
                <div>IAF MLA Accredited Body</div>
                <div className="text-green-400/70 mt-1">Certification Status: Active</div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
