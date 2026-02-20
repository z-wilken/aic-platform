'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AssessmentQuiz from '../components/AssessmentQuiz';
import Link from 'next/link';

export default function ClientAssessment() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[20vw] font-bold text-aic-black/[0.02] leading-none">
            ?
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <span
            className={`inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-aic-gold uppercase mb-6 animate-fade-up ${mounted ? '' : 'opacity-0'}`}
          >
            <span className="w-8 h-px bg-aic-gold" />
            Free Assessment
            <span className="w-8 h-px bg-aic-gold" />
          </span>

          <h1
            className={`font-serif text-4xl lg:text-6xl font-bold text-aic-black leading-tight mb-6 animate-slide-left ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            What&apos;s Your{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-aic-red italic">Risk Tier</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-aic-red/10 -z-0" />
            </span>
            ?
          </h1>

          <p
            className={`text-lg lg:text-xl font-serif text-gray-600 leading-relaxed max-w-2xl mx-auto animate-blur-reveal ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '300ms' }}
          >
            Answer 20 questions to discover where your AI systems fit within
            the South African accountability framework. Takes about 5 minutes.
          </p>

          {/* Trust badges */}
          <div
            className={`mt-8 flex flex-wrap justify-center gap-6 animate-fade-up ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '500ms' }}
          >
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-mono text-xs uppercase tracking-wider">No data stored</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-mono text-xs uppercase tracking-wider">5 min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-mono text-xs uppercase tracking-wider">Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AssessmentQuiz />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <Link href="/" className="font-serif text-xl font-bold text-aic-black">
              AIC<span className="text-aic-gold">.</span>
            </Link>
            <p className="font-mono text-xs text-gray-400">
              © 2026 AI Integrity Certification. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
