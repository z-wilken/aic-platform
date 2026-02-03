'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 glass'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group relative font-serif text-2xl font-bold tracking-tight text-aic-black"
            >
              <span className="relative">
                AIC
                <span className="absolute -right-2 -top-1 w-1.5 h-1.5 bg-aic-gold rounded-full group-hover:scale-150 transition-transform" />
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-12">
              <Link
                href="#framework"
                className="font-mono text-xs font-medium text-gray-600 hover:text-aic-black transition-colors tracking-wider uppercase link-underline"
              >
                Framework
              </Link>
              <Link
                href="/about"
                className="font-mono text-xs font-medium text-gray-600 hover:text-aic-black transition-colors tracking-wider uppercase link-underline"
              >
                About
              </Link>
              <Link
                href="/docs"
                className="font-mono text-xs font-medium text-gray-600 hover:text-aic-black transition-colors tracking-wider uppercase link-underline"
              >
                Docs
              </Link>
              <a
                href="http://localhost:3001/login"
                className="font-mono text-xs font-medium text-gray-600 hover:text-aic-black transition-colors tracking-wider uppercase link-underline"
              >
                Client Login
              </a>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/alpha"
                className="hidden sm:inline-flex group relative items-center gap-2 bg-aic-black px-6 py-3 font-mono text-xs font-semibold text-white uppercase tracking-wider overflow-hidden transition-colors hover:bg-aic-charcoal"
              >
                <span className="relative z-10">Join Alpha</span>
                <span className="relative z-10 w-4 h-px bg-white group-hover:w-6 transition-all" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden relative w-8 h-8 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block w-full h-0.5 bg-aic-black transform transition-all duration-300 origin-center ${
                      mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                    }`}
                  />
                  <span
                    className={`block w-full h-0.5 bg-aic-black transition-all duration-300 ${
                      mobileMenuOpen ? 'opacity-0 scale-0' : ''
                    }`}
                  />
                  <span
                    className={`block w-full h-0.5 bg-aic-black transform transition-all duration-300 origin-center ${
                      mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-aic-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-aic-paper transform transition-transform duration-500 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-24 px-8">
            <nav className="flex flex-col gap-6">
              <Link
                href="#framework"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl font-bold text-aic-black hover:text-aic-red transition-colors"
              >
                Framework
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl font-bold text-aic-black hover:text-aic-red transition-colors"
              >
                About
              </Link>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl font-bold text-aic-black hover:text-aic-red transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/assessment"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl font-bold text-aic-black hover:text-aic-red transition-colors"
              >
                Assessment
              </Link>
              <a
                href="http://localhost:3001/login"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl font-bold text-gray-400 hover:text-aic-black transition-colors"
              >
                Client Login
              </a>
            </nav>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/alpha"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-3 bg-aic-black px-8 py-4 font-mono text-sm font-semibold text-white uppercase tracking-wider"
              >
                Join Alpha
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Footer info */}
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                Est. 2026 — Johannesburg
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
