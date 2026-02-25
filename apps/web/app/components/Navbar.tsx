'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import * as analytics from '@/lib/analytics';

// Figma-designed institutional nav items
const institutionalNav = [
  { href: '/governance-hub', label: 'Governance Hub', desc: 'Algorithmic Rights & Global Standards' },
  { href: '/corporate-portal', label: 'Corporate Portal', desc: 'ISO/IEC 42001 Certification Services' },
  { href: '/professional-portal', label: 'Professional Portal', desc: 'ISO/IEC 17024 Personnel Certification' },
  { href: '/ai-governance-index', label: 'AI Governance Index', desc: 'Maturity Rankings' },
  { href: '/disclosures', label: 'Disclosures', desc: 'Impartiality & Accreditation' },
];

const NavLink = ({
  href,
  children,
  className = '',
  activeClass = '',
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClass?: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative font-mono text-[10px] font-bold tracking-widest group transition-colors ${className} ${isActive ? activeClass : ''}`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-current transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
      />
    </Link>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [institutionalOpen, setInstitutionalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCitizenPath = pathname.startsWith('/citizens');
  const isOrgPath = pathname.startsWith('/business');
  const isInstitutionalPath = institutionalNav.some((n) => pathname.startsWith(n.href));

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Top bar: Audience switcher + Institutional links */}
      <div className="bg-aic-black text-[9px] font-mono font-bold tracking-[0.3em] uppercase">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Audience toggle */}
            <div className="flex items-center gap-8">
              <Link
                href="/citizens"
                className={`hover:text-white transition-colors ${isCitizenPath ? 'text-aic-gold underline underline-offset-4' : 'text-gray-500'}`}
              >
                For the Public
              </Link>
              <Link
                href="/business"
                className={`hover:text-white transition-colors ${isOrgPath || (!isCitizenPath && !isOrgPath && !isInstitutionalPath) ? 'text-aic-gold underline underline-offset-4' : 'text-gray-500'}`}
              >
                For Organisations
              </Link>
              {/* Institutional dropdown trigger */}
              <button
                onMouseEnter={() => setInstitutionalOpen(true)}
                onMouseLeave={() => setInstitutionalOpen(false)}
                onClick={() => setInstitutionalOpen((v) => !v)}
                className={`relative flex items-center gap-1 hover:text-white transition-colors ${isInstitutionalPath ? 'text-aic-gold underline underline-offset-4' : 'text-gray-500'}`}
              >
                Institutional
                <span className="text-[8px] ml-0.5">▾</span>
                {/* Dropdown */}
                <AnimatePresence>
                  {institutionalOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white border border-aic-black/10 shadow-xl z-50 py-2"
                    >
                      {institutionalNav.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex flex-col px-5 py-3 hover:bg-aic-paper transition-colors group"
                        >
                          <span className="font-mono text-[10px] font-bold text-aic-black uppercase tracking-widest group-hover:text-aic-gold transition-colors">
                            {item.label}
                          </span>
                          <span className="font-mono text-[9px] text-gray-400 mt-0.5 normal-case tracking-normal">
                            {item.desc}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Right: status + disclosures */}
            <div className="hidden lg:flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Certification: Active
              </span>
              <Link href="/disclosures" className="hover:text-white transition-colors">
                Public Disclosures
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-aic-paper/95 backdrop-blur-md border-b border-aic-black/5">
        <div className="mx-auto max-w-7xl flex h-20 items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="font-serif text-2xl font-medium tracking-tight text-aic-black"
              onClick={() => analytics.trackCTAClick('logo')}
            >
              AIC<span className="text-aic-gold">.</span>
            </Link>
          </div>

          {/* Desktop nav links — context-aware */}
          <div className="hidden lg:flex items-center gap-10">
            {isInstitutionalPath ? (
              // Institutional context nav
              <>
                <NavLink href="/governance-hub" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  GOVERNANCE HUB
                </NavLink>
                <NavLink href="/corporate-portal" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  CORPORATE
                </NavLink>
                <NavLink href="/professional-portal" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  PROFESSIONAL
                </NavLink>
                <NavLink href="/ai-governance-index" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  AI INDEX
                </NavLink>
                <NavLink href="/disclosures" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  DISCLOSURES
                </NavLink>
              </>
            ) : isCitizenPath ? (
              // Citizen context nav
              <>
                <NavLink href="/citizens/rights" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  KNOW YOUR RIGHTS
                </NavLink>
                <NavLink href="/citizens/appeal" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  APPEAL A DECISION
                </NavLink>
                <NavLink href="/citizens/blog" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  INSIGHTS
                </NavLink>
                <NavLink href="/registry" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  CERTIFIED REGISTRY
                </NavLink>
                <NavLink href="/ai-governance-index" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  AI INDEX
                </NavLink>
                <NavLink href="/contact?type=report" className="text-aic-red hover:text-aic-red/80" activeClass="text-aic-red">
                  REPORT A CONCERN
                </NavLink>
              </>
            ) : (
              // Organisation context nav (default)
              <>
                <NavLink href="/governance-hub" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  GOVERNANCE HUB
                </NavLink>
                <NavLink href="/tiers" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  THE FRAMEWORK
                </NavLink>
                <NavLink href="/process" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  PROCESS
                </NavLink>
                <NavLink href="/corporate-portal" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  GET CERTIFIED
                </NavLink>
                <NavLink href="/ai-governance-index" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  AI INDEX
                </NavLink>
                <NavLink href="/about" className="text-gray-500 hover:text-aic-black" activeClass="text-aic-black">
                  ABOUT
                </NavLink>
              </>
            )}
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-6">
            <a
              href={
                process.env.NEXT_PUBLIC_PLATFORM_URL
                  ? `${process.env.NEXT_PUBLIC_PLATFORM_URL}/login`
                  : '/login'
              }
              className="hidden sm:block font-mono text-[10px] font-bold text-gray-400 hover:text-aic-black transition-colors tracking-widest"
              onClick={() => analytics.trackCTAClick('nav_login')}
            >
              LOGIN
            </a>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? 'CLOSE' : 'MENU'}
            </button>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden sm:block">
              <Link
                href={isCitizenPath ? '/assessment' : isInstitutionalPath ? '/corporate-portal' : '/alpha'}
                onClick={() => analytics.trackCTAClick('nav_cta')}
                className="bg-aic-black px-6 py-2.5 text-[10px] font-bold text-white font-mono uppercase tracking-widest hover:bg-aic-red transition-colors"
              >
                {isCitizenPath ? 'CHECK A SYSTEM' : isInstitutionalPath ? 'GET CERTIFIED' : 'JOIN ALPHA'}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-aic-black/5 overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-6 space-y-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/governance-hub', label: 'Governance Hub' },
                { href: '/tiers', label: 'The Framework' },
                { href: '/corporate-portal', label: 'Corporate Portal' },
                { href: '/professional-portal', label: 'Professional Portal' },
                { href: '/ai-governance-index', label: 'AI Governance Index' },
                { href: '/process', label: 'Process' },
                { href: '/registry', label: 'Certified Registry' },
                { href: '/assessment', label: 'Self-Assessment' },
                { href: '/citizens', label: 'For the Public' },
                { href: '/disclosures', label: 'Disclosures' },
                { href: '/about', label: 'About' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-3 transition-colors ${
                    pathname === item.href
                      ? 'text-aic-black bg-aic-paper'
                      : 'text-gray-500 hover:text-aic-black hover:bg-aic-paper'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-aic-black/5 flex gap-3">
                <Link
                  href="/alpha"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center font-mono text-[10px] font-bold bg-aic-black text-white px-4 py-3 uppercase tracking-widest hover:bg-aic-red transition-colors"
                >
                  Join Alpha
                </Link>
                <Link
                  href="/assessment"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center font-mono text-[10px] font-bold border border-aic-black text-aic-black px-4 py-3 uppercase tracking-widest hover:bg-aic-black hover:text-white transition-colors"
                >
                  Self-Assessment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
