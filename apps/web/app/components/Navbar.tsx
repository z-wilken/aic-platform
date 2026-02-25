"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X, Globe } from "lucide-react";
import { navItems } from "@/app/data/nav";

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
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-aic-navy text-white/70 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
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
            <Link href="/disclosures" className="hover:text-white transition-colors">
              Public Disclosures
            </Link>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-aic-navy rounded-lg flex items-center justify-center group-hover:bg-aic-navy-light transition-colors">
                <Shield className="w-5 h-5 text-aic-copper" />
              </div>
              <div>
                <div className="text-aic-navy font-bold text-lg leading-tight tracking-tight">AIC</div>
                <div className="text-gray-500 text-[10px] leading-tight tracking-wider uppercase">
                  AI Certification Institute
                </div>
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
                      ? "text-aic-navy bg-[#f0f4f8]"
                      : "text-gray-600 hover:text-aic-navy hover:bg-[#f0f4f8]"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-aic-copper rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/professional-portal"
                className="text-sm text-aic-navy border border-aic-navy px-4 py-2 rounded-md hover:bg-aic-navy hover:text-white transition-all"
              >
                Get Certified
              </Link>
              <Link
                href="/ai-governance-index"
                className="text-sm bg-aic-copper text-white px-4 py-2 rounded-md hover:bg-aic-copper-light transition-colors"
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
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-aic-navy text-white"
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
              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <Link
                  href="/professional-portal"
                  className="flex-1 text-center text-sm text-aic-navy border border-aic-navy px-4 py-2 rounded-md"
                >
                  Get Certified
                </Link>
                <Link
                  href="/ai-governance-index"
                  className="flex-1 text-center text-sm bg-aic-copper text-white px-4 py-2 rounded-md"
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

