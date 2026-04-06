"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const navItems = [
  { href: "/divisions", label: "Divisions" },
  { href: "/classify", label: "Classify" },
  { href: "/articles", label: "Articles" },
  { href: "/waitlist", label: "Waitlist" },
  { href: "/impartiality", label: "Impartiality" },
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
      <nav
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "bg-aic-navy/98 border-white/10 shadow-lg backdrop-blur-sm"
            : "bg-aic-navy/90 border-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col group">
              <span className="text-white font-heading text-2xl font-bold leading-none tracking-tight">
                AIC
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-aic-copper leading-none mt-1">
                AI Integrity Certification
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 text-sm font-medium hover:text-white transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href="/waitlist"
                className="bg-aic-copper text-aic-navy px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-aic-copper/90 transition-all duration-200"
              >
                Get Certified
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-aic-navy border-t border-white/10 h-screen">
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 text-xl font-heading font-medium hover:text-aic-copper transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/waitlist"
                className="mt-4 bg-aic-copper text-aic-navy text-center py-4 text-lg font-bold uppercase tracking-wider"
                onClick={() => setMenuOpen(false)}
              >
                Get Certified
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
