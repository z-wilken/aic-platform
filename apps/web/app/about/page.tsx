'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[25vw] font-bold text-aic-black/[0.02] leading-none">
            WHY
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span
              className={`inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-aic-gold uppercase mb-6 animate-fade-up ${mounted ? '' : 'opacity-0'}`}
            >
              <span className="w-8 h-px bg-aic-gold" />
              Our Mission
            </span>

            <h1
              className={`font-serif text-5xl lg:text-7xl font-bold text-aic-black leading-[0.9] animate-slide-left ${mounted ? '' : 'opacity-0'}`}
              style={{ animationDelay: '100ms' }}
            >
              The Trust{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-aic-red italic">Gap</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-aic-red/10 -z-0" />
              </span>
            </h1>

            <p
              className={`mt-8 text-xl lg:text-2xl font-serif text-gray-600 leading-relaxed animate-blur-reveal ${mounted ? '' : 'opacity-0'}`}
              style={{ animationDelay: '300ms' }}
            >
              AI adoption is stalling not because of technology, but because of{' '}
              <span className="font-semibold text-aic-black">liability</span>. AIC bridges the gap
              between innovation and regulation.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 lg:py-32 bg-aic-black">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <blockquote className="relative">
            <span className="absolute -top-6 -left-4 text-7xl text-aic-gold/30 font-serif">"</span>
            <p className="font-serif text-2xl lg:text-3xl text-white leading-relaxed">
              Section 71 of POPIA creates a unique challenge: automated decisions have legal
              consequences. The question isn't{' '}
              <span className="text-aic-gold italic">'does the AI work?'</span>, but{' '}
              <span className="text-aic-red italic">'who is responsible when it fails?'</span>
            </p>
            <span className="absolute -bottom-6 -right-4 text-7xl text-aic-gold/30 font-serif rotate-180">"</span>
          </blockquote>
        </div>
      </section>

      {/* Why AIC Exists */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-aic-gold uppercase mb-6">
                <span className="w-8 h-px bg-aic-gold" />
                The Problem
              </span>

              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-aic-black leading-tight">
                Why AIC Exists
              </h2>
            </div>

            <div className="space-y-6">
              <p className="font-serif text-lg text-gray-600 leading-relaxed">
                Most global standards (like ISO 42001) focus on organizational governance. While
                valuable, they don't solve the specific legal exposure created by South African law.
              </p>

              <p className="font-serif text-lg text-gray-600 leading-relaxed">
                AIC was built to be the{' '}
                <span className="font-semibold text-aic-black">"Accountability Layer."</span> We
                don't just audit your code; we validate your Human-in-the-Loop processes.
              </p>

              <div className="pt-6 border-t border-gray-200">
                <p className="font-mono text-sm text-aic-red uppercase tracking-wider font-semibold">
                  We certify that when a machine makes a decision, a human has verified the criteria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Tier Philosophy */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-aic-gold uppercase mb-6">
              <span className="w-8 h-px bg-aic-gold" />
              Our Approach
            </span>

            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-aic-black leading-tight mb-6">
              The 3-Tier Philosophy
            </h2>

            <p className="font-serif text-xl text-gray-600 leading-relaxed">
              We believe in proportional regulation. A chatbot recommending a playlist should not
              face the same scrutiny as an algorithm denying a home loan.
            </p>
          </div>

          <div className="space-y-8">
            {/* Tier 1 */}
            <div className="group relative p-8 lg:p-12 bg-aic-paper border-l-4 border-aic-red hover:bg-white transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                <div className="flex-shrink-0">
                  <span className="font-mono text-6xl lg:text-8xl font-bold text-aic-red/20">01</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-aic-black mb-2">
                    Critical Impact
                  </h3>
                  <p className="font-mono text-xs text-aic-red uppercase tracking-wider mb-4">
                    Human-Approved Required
                  </p>
                  <p className="font-serif text-lg text-gray-600 leading-relaxed">
                    For life-altering decisions, we require proof of explainability and active human
                    review. Every decision that affects liberty, livelihood, or legal status must
                    have a human accountable.
                  </p>
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="group relative p-8 lg:p-12 bg-aic-paper border-l-4 border-aic-gold hover:bg-white transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                <div className="flex-shrink-0">
                  <span className="font-mono text-6xl lg:text-8xl font-bold text-aic-gold/20">02</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-aic-black mb-2">
                    Elevated Risk
                  </h3>
                  <p className="font-mono text-xs text-aic-gold uppercase tracking-wider mb-4">
                    Human-Supervised
                  </p>
                  <p className="font-serif text-lg text-gray-600 leading-relaxed">
                    For high-volume automated decisions, we mandate statistical bias auditing.
                    Humans monitor edge cases and maintain override capability at all times.
                  </p>
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="group relative p-8 lg:p-12 bg-aic-paper border-l-4 border-aic-gray hover:bg-white transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                <div className="flex-shrink-0">
                  <span className="font-mono text-6xl lg:text-8xl font-bold text-aic-gray/20">03</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-aic-black mb-2">
                    Standard Automation
                  </h3>
                  <p className="font-mono text-xs text-aic-gray uppercase tracking-wider mb-4">
                    Automated with Transparency
                  </p>
                  <p className="font-serif text-lg text-gray-600 leading-relaxed">
                    For low-risk routine tasks, transparency is the baseline requirement.
                    Users must know they're interacting with AI, and basic privacy protections apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-aic-black mb-6">
            Ready to certify your AI systems?
          </h2>
          <p className="font-serif text-xl text-gray-600 mb-10">
            Take our assessment to determine your tier and begin the certification process.
          </p>
          <Link
            href="/assessment"
            className="group inline-flex items-center gap-3 bg-aic-black px-10 py-5 font-mono text-sm font-semibold text-white uppercase tracking-wider transition-all duration-300 hover:bg-aic-red"
          >
            Start Assessment
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-aic-black py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <a href="/" className="font-serif text-2xl font-bold text-white">
              AIC<span className="text-aic-gold">.</span>
            </a>
            <p className="font-mono text-xs text-gray-500">
              © 2026 AI Integrity Certification. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
