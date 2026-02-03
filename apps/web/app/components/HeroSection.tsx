'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large "01" in background */}
        <div
          className={`absolute -right-[10vw] top-1/2 -translate-y-1/2 font-mono text-[35vw] font-bold text-aic-black/[0.03] leading-none select-none transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        >
          01
        </div>
        {/* Vertical line accent */}
        <div
          className={`absolute left-[8%] top-0 w-px h-full bg-gradient-to-b from-transparent via-aic-gold/30 to-transparent transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Horizontal accent line */}
        <div
          className={`absolute left-0 top-[40%] w-[30%] h-px bg-gradient-to-r from-aic-red/50 to-transparent transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 lg:px-0">
        {/* Top Section - Tagline */}
        <div className="pt-32 lg:pt-40 lg:pl-[12%]">
          <div
            className={`animate-fade-up ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '200ms' }}
          >
            <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-aic-gold uppercase">
              <span className="w-8 h-px bg-aic-gold" />
              Est. 2026 — South Africa
            </span>
          </div>
        </div>

        {/* Center Section - Main Headline */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
            {/* The dramatic headline */}
            <div className="lg:pl-[12%] lg:pr-[20%]">
              <h1 className="relative">
                {/* "NO" - oversized */}
                <span
                  className={`block text-display font-serif font-bold text-aic-black animate-slide-left ${mounted ? '' : 'opacity-0'}`}
                  style={{ animationDelay: '100ms' }}
                >
                  No
                </span>

                {/* "ROBOT" - even bigger, offset */}
                <span
                  className={`block text-display font-serif font-bold text-aic-black lg:-ml-[5%] animate-slide-left ${mounted ? '' : 'opacity-0'}`}
                  style={{ animationDelay: '250ms' }}
                >
                  Robot
                </span>

                {/* "JUDGES." - with red accent */}
                <span
                  className={`block text-display font-serif italic text-aic-red animate-slide-left ${mounted ? '' : 'opacity-0'}`}
                  style={{ animationDelay: '400ms' }}
                >
                  Judges<span className="text-aic-gold">.</span>
                </span>
              </h1>
            </div>

            {/* Subtext - positioned asymmetrically */}
            <div className="mt-12 lg:mt-16 lg:ml-auto lg:mr-[12%] lg:max-w-md lg:text-right">
              <p
                className={`text-xl lg:text-2xl font-serif text-gray-700 leading-relaxed animate-blur-reveal ${mounted ? '' : 'opacity-0'}`}
                style={{ animationDelay: '600ms' }}
              >
                If your AI decides a human fate, it must have{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 font-semibold text-aic-black">human empathy</span>
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-aic-gold/30 -z-0" />
                </span>{' '}
                in the loop.
              </p>
            </div>

            {/* CTA Buttons - positioned on the right */}
            <div
              className={`mt-10 lg:mt-12 lg:ml-auto lg:mr-[12%] flex flex-col sm:flex-row gap-4 lg:justify-end animate-fade-up ${mounted ? '' : 'opacity-0'}`}
              style={{ animationDelay: '800ms' }}
            >
              <Link
                href="/assessment"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-aic-black text-white font-mono text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:bg-aic-red"
              >
                <span className="relative z-10">Begin Audit</span>
                <span className="absolute inset-0 bg-aic-red transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <Link
                href="/report"
                className="group inline-flex items-center justify-center px-8 py-4 font-mono text-sm uppercase tracking-wider text-aic-black link-underline"
              >
                Report Abuse
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section - Stats/Proof Bar */}
        <div className="pb-8 lg:pb-12">
          {/* Scrolling Marquee */}
          <div
            className={`marquee-container full-bleed bg-aic-black py-4 mb-8 animate-fade-up ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '1000ms' }}
          >
            <div className="flex overflow-hidden">
              <div className="animate-marquee flex items-center gap-8 text-aic-paper font-mono text-sm tracking-widest">
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="flex items-center gap-8">
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-red rounded-full" /> ACCOUNTABILITY</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-gold rounded-full" /> TRANSPARENCY</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-paper rounded-full" /> JUSTICE</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-red rounded-full" /> HUMANITY</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-gold rounded-full" /> OVERSIGHT</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-paper rounded-full" /> FAIRNESS</span>
                    <span className="px-4" />
                  </span>
                ))}
              </div>
              <div className="animate-marquee2 flex items-center gap-8 text-aic-paper font-mono text-sm tracking-widest absolute">
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="flex items-center gap-8">
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-red rounded-full" /> ACCOUNTABILITY</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-gold rounded-full" /> TRANSPARENCY</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-paper rounded-full" /> JUSTICE</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-red rounded-full" /> HUMANITY</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-gold rounded-full" /> OVERSIGHT</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-aic-paper rounded-full" /> FAIRNESS</span>
                    <span className="px-4" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div
            className={`max-w-7xl mx-auto px-6 lg:px-8 animate-fade-up ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '1200ms' }}
          >
            <div className="flex flex-wrap justify-between items-center gap-8 lg:gap-16">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-4xl lg:text-5xl font-bold text-aic-black">POPIA</span>
                <span className="font-mono text-xs text-aic-gray uppercase tracking-wider">Section 71 Compliant</span>
              </div>
              <div className="hidden lg:block w-px h-8 bg-aic-gray/30" />
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-4xl lg:text-5xl font-bold text-aic-black">3</span>
                <span className="font-mono text-xs text-aic-gray uppercase tracking-wider">Tier Risk Framework</span>
              </div>
              <div className="hidden lg:block w-px h-8 bg-aic-gray/30" />
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-4xl lg:text-5xl font-bold text-aic-black">24h</span>
                <span className="font-mono text-xs text-aic-gray uppercase tracking-wider">Appeal Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up ${mounted ? '' : 'opacity-0'}`}
        style={{ animationDelay: '1400ms' }}
      >
        <span className="font-mono text-[10px] tracking-widest text-aic-gray uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-aic-gray to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
