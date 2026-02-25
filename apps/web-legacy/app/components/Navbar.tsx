'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import * as analytics from '@/lib/analytics';

const institutionalNav = [
  { href: '/governance-hub',       label: 'Governance Hub',       desc: 'Algorithmic Rights & Global Standards'     },
  { href: '/corporate-portal',     label: 'Corporate Portal',     desc: 'ISO/IEC 42001 Certification Services'      },
  { href: '/professional-portal',  label: 'Professional Portal',  desc: 'ISO/IEC 17024 Personnel Certification'     },
  { href: '/ai-governance-index',  label: 'AI Governance Index',  desc: 'Maturity Rankings'                         },
  { href: '/disclosures',          label: 'Disclosures',          desc: 'Impartiality & Accreditation'              },
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
      <span className={`absolute -bottom-1 left-0 h-px bg-current transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </Link>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [institutionalOpen, setInstitutionalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCitizenPath       = pathname.startsWith('/citizens');
  const isOrgPath           = pathname.startsWith('/business');
  const isInstitutionalPath = institutionalNav.some((n) => pathname.startsWith(n.href));

  const onDarkHero = pathname === '/';

  return (
    <nav className={`sticky top-0 z-50 w-full transition-colors duration-300 ${onDarkHero ? '' : ''}`}>

      {/* ── Top micro-bar ──────────────────────────────────────────── */}
      <div className="bg-aic-navy text-[9px] font-mono font-bold tracking-[0.3em] uppercase border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">

            <div className="flex items-center gap-8">
              <Link
                href="/citizens"
                className={`hover:text-white transition-colors ${isCitizenPath ? 'text-aic-copper' : 'text-white/30'}`}
              >
                For the Public
              </Link>
              <Link
                href="/business"
                className={`hover:text-white transition-colors ${isOrgPath || (!isCitizenPath && !isOrgPath && !isInstitutionalPath) ? 'text-aic-copper' : 'text-white/30'}`}
              >
                For Organisations
              </Link>

              {/* Institutional dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setInstitutionalOpen(true)}
                onMouseLeave={() => setInstitutionalOpen(false)}
              >
                <button
                  onClick={() => setInstitutionalOpen((v) => !v)}
                  className={`flex items-center gap-1 hover:text-white transition-colors ${isInstitutionalPath ? 'text-aic-copper' : 'text-white/30'}`}
                >
                  Institutional
                  <motion.span
                    animate={{ rotate: institutionalOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[7px] ml-0.5"
                  >
                    ▾
                  </motion.span>
                </button>

                <AnimatePresence>
                  {institutionalOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-aic-navy-mid border border-white/8 shadow-2xl z-50 py-1"
                    >
                      {institutionalNav.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex flex-col px-5 py-3 hover:bg-white/5 transition-colors group"
                        >
                          <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest group-hover:text-aic-copper transition-colors">
                            {item.label}
                          </span>
                          <span className="font-mono text-[9px] text-white/35 mt-0.5 normal-case tracking-normal">
                            {item.desc}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6 text-white/30">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Certification: Active
              </span>
              <Link href="/disclosures" className="hover:text-white transition-colors">
                Public Disclosures
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main navbar ─────────────────────────────────────────────── */}
      <div className="bg-aic-navy/95 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto max-w-7xl flex h-20 items-center justify-between px-6 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-medium tracking-tight text-white"
            onClick={() => analytics.trackCTAClick('logo')}
          >
            AIC<span className="text-aic-copper">.</span>
          </Link>

          {/* Context-aware desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {isInstitutionalPath ? (
              <>
                <NavLink href="/governance-hub"      className="text-white/40 hover:text-white" activeClass="text-white">GOVERNANCE HUB</NavLink>
                <NavLink href="/corporate-portal"    className="text-white/40 hover:text-white" activeClass="text-white">CORPORATE</NavLink>
                <NavLink href="/professional-portal" className="text-white/40 hover:text-white" activeClass="text-white">PROFESSIONAL</NavLink>
                <NavLink href="/ai-governance-index" className="text-white/40 hover:text-white" activeClass="text-white">AI INDEX</NavLink>
                <NavLink href="/disclosures"         className="text-white/40 hover:text-white" activeClass="text-white">DISCLOSURES</NavLink>
              </>
            ) : isCitizenPath ? (
              <>
                <NavLink href="/citizens/rights"    className="text-white/40 hover:text-white" activeClass="text-white">KNOW YOUR RIGHTS</NavLink>
                <NavLink href="/citizens/appeal"    className="text-white/40 hover:text-white" activeClass="text-white">APPEAL A DECISION</NavLink>
                <NavLink href="/registry"           className="text-white/40 hover:text-white" activeClass="text-white">CERTIFIED REGISTRY</NavLink>
                <NavLink href="/ai-governance-index" className="text-white/40 hover:text-white" activeClass="text-white">AI INDEX</NavLink>
                <NavLink href="/contact?type=report" className="text-aic-copper hover:text-aic-copper-light" activeClass="text-aic-copper">REPORT A CONCERN</NavLink>
              </>
            ) : (
              <>
                <NavLink href="/governance-hub"  className="text-white/40 hover:text-white" activeClass="text-white">GOVERNANCE HUB</NavLink>
                <NavLink href="/tiers"           className="text-white/40 hover:text-white" activeClass="text-white">THE FRAMEWORK</NavLink>
                <NavLink href="/process"         className="text-white/40 hover:text-white" activeClass="text-white">PROCESS</NavLink>
                <NavLink href="/corporate-portal" className="text-white/40 hover:text-white" activeClass="text-white">GET CERTIFIED</NavLink>
                <NavLink href="/ai-governance-index" className="text-white/40 hover:text-white" activeClass="text-white">AI INDEX</NavLink>
                <NavLink href="/about"           className="text-white/40 hover:text-white" activeClass="text-white">ABOUT</NavLink>
              </>
            )}
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-5">
            <a
              href={
                process.env.NEXT_PUBLIC_PLATFORM_URL
                  ? `${process.env.NEXT_PUBLIC_PLATFORM_URL}/login`
                  : '/login'
              }
              className="hidden sm:block font-mono text-[10px] font-bold text-white/30 hover:text-white transition-colors tracking-widest"
              onClick={() => analytics.trackCTAClick('nav_login')}
            >
              LOGIN
            </a>

            <button
              className="lg:hidden font-mono text-[10px] font-bold text-white/40 hover:text-white transition-colors tracking-widest"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? 'CLOSE' : 'MENU'}
            </button>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden sm:block">
              <Link
                href={isCitizenPath ? '/assessment' : isInstitutionalPath ? '/corporate-portal' : '/alpha'}
                onClick={() => analytics.trackCTAClick('nav_cta')}
                className="bg-aic-copper px-6 py-2.5 text-[10px] font-bold text-white font-mono uppercase tracking-widest hover:bg-aic-copper-light transition-colors"
              >
                {isCitizenPath ? 'CHECK A SYSTEM' : isInstitutionalPath ? 'GET CERTIFIED' : 'JOIN ALPHA'}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-aic-navy-mid border-b border-white/5 overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-6 space-y-1">
              {[
                { href: '/',                     label: 'Home'                 },
                { href: '/governance-hub',       label: 'Governance Hub'       },
                { href: '/tiers',                label: 'The Framework'        },
                { href: '/corporate-portal',     label: 'Corporate Portal'     },
                { href: '/professional-portal',  label: 'Professional Portal'  },
                { href: '/ai-governance-index',  label: 'AI Governance Index'  },
                { href: '/process',              label: 'Process'              },
                { href: '/registry',             label: 'Certified Registry'   },
                { href: '/assessment',           label: 'Self-Assessment'      },
                { href: '/citizens',             label: 'For the Public'       },
                { href: '/disclosures',          label: 'Disclosures'          },
                { href: '/about',                label: 'About'                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-3 transition-colors ${
                    pathname === item.href
                      ? 'text-aic-copper bg-white/5'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 flex gap-3">
                <Link
                  href="/alpha"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center font-mono text-[10px] font-bold bg-aic-copper text-white px-4 py-3 uppercase tracking-widest hover:bg-aic-copper-light transition-colors"
                >
                  Join Alpha
                </Link>
                <Link
                  href="/assessment"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center font-mono text-[10px] font-bold border border-white/20 text-white px-4 py-3 uppercase tracking-widest hover:border-aic-copper hover:text-aic-copper transition-colors"
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
