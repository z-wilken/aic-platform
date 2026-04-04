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

  const platformUrl =
    process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.aiccertified.cloud";

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0a1628] text-white/70 text-[10px] py-2 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <span className="flex items-center gap-1.5 shrink-0">
              <Globe className="w-3 h-3 text-aic-gold shrink-0" />
              <span className="hidden xs:inline">IAF MLA Accredited Body</span>
              <span className="xs:hidden">IAF MLA</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse shrink-0" />
              <span className="text-green-400 font-medium">Certification Status: Active</span>
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-[9px] sm:text-[10px]">
            <Link
              href="/disclosures"
              className="hover:text-aic-gold transition-colors whitespace-nowrap"
            >
              Public Disclosures
            </Link>
            <Link
              href="/contact"
              className="hover:text-aic-gold transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/97 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white border-b border-gray-100/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 bg-[#0f1f3d] rounded-lg flex items-center justify-center group-hover:bg-[#1a3160] transition-colors shadow-lg shadow-[#0f1f3d]/15">
                <Shield className="w-5 h-5 text-aic-gold" />
              </div>
              <div className="hidden sm:block">
                <div className="text-[#0f1f3d] font-bold text-lg leading-tight tracking-tight font-serif italic">
                  AIC
                </div>
                <div className="text-gray-400 text-[9px] leading-tight tracking-[0.15em] uppercase font-mono">
                  AI Certification Institute
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all relative ${
                    pathname === item.href
                      ? "text-[#0f1f3d] bg-gray-50"
                      : "text-gray-500 hover:text-[#0f1f3d] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-aic-gold rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs — matching Figma V20 */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={platformUrl}
                className="flex items-center gap-2 text-[13px] font-semibold text-[#0f1f3d] hover:text-aic-gold transition-colors px-2 font-mono uppercase tracking-widest"
              >
                <LogIn className="w-4 h-4" />
                Login
              </a>
              <Link
                href="/alpha-apply"
                className="text-[13px] font-semibold text-[#0f1f3d] border-2 border-[#0f1f3d] px-5 py-2 rounded-lg hover:bg-[#0f1f3d] hover:text-white transition-all"
              >
                Get Certified
              </Link>
              <Link
                href="/ai-governance-index"
                className="text-[13px] font-semibold bg-aic-gold text-white px-5 py-2 rounded-lg hover:bg-[#b07d08] transition-colors shadow-md shadow-aic-gold/20"
              >
                View AI Index
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-[#0f1f3d] min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden bg-white border-t border-gray-100 shadow-2xl overflow-y-auto"
            style={{ maxHeight: "calc(100dvh - 110px)" }}
          >
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                      pathname === item.href
                        ? "bg-[#0f1f3d] text-white shadow-lg shadow-[#0f1f3d]/20"
                        : "text-[#0f1f3d] hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        pathname === item.href
                          ? "text-aic-gold"
                          : "text-[#0f1f3d]/50"
                      }`}
                    />
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-[11px] opacity-60 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}

              <div className="pt-6 flex flex-col gap-3 px-1">
                <a
                  href={platformUrl}
                  className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white bg-[#0f1f3d] py-4 rounded-xl hover:bg-[#1a3160] transition-all shadow-lg shadow-[#0f1f3d]/20 min-h-[52px]"
                >
                  <LogIn className="w-4 h-4" />
                  Client Login
                </a>
                <Link
                  href="/alpha-apply"
                  className="flex items-center justify-center w-full text-sm font-bold text-aic-navy border-2 border-aic-navy py-4 rounded-xl hover:bg-aic-navy hover:text-white transition-all min-h-[52px]"
                >
                  Get Certified
                </Link>
                <Link
                  href="/ai-governance-index"
                  className="flex items-center justify-center w-full text-sm font-bold text-white bg-aic-gold py-4 rounded-xl hover:bg-[#b07d08] transition-all min-h-[52px]"
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
