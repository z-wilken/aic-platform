// components/HeroSection.tsx
'use client';

import Marquee from './Marquee';
import * as analytics from '@/lib/analytics';

const HeroSection = () => {
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex items-center">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-[40vw] font-bold text-aic-paper opacity-10 leading-none select-none">
            AIC
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <p className="font-mono text-aic-gold uppercase tracking-widest">
              POPIA Section 71 Compliance Framework
            </p>
            <h1 className="mt-4 text-6xl font-bold tracking-tighter text-aic-black sm:text-8xl font-serif">
              Accountability <br />
              <span className="text-aic-red italic">by Design.</span>
            </h1>
          </div>
          <div className="space-y-8">
            <div className="glass-card p-4 border-l-4 border-aic-red bg-white/50 inline-block">
                <p className="text-sm font-mono font-bold text-aic-red uppercase mb-1">MARKET ALERT</p>
                <p className="text-lg font-serif italic text-gray-800">"85.1% of AI resume screening tools favored white-associated names in 2024 University of Washington study."</p>
            </div>
            <p className="text-xl leading-8 text-gray-700 font-serif">
              AIC is the definitive trust infrastructure for South African AI. We certify the humans accountable for algorithmic outcomes, ensuring compliance with Section 71 of POPIA.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/assessment"
                onClick={() => analytics.trackCTAClick('hero_assessment')}
                className="rounded-none bg-aic-black px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-aic-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-black font-mono uppercase tracking-widest transition-colors"
              >
                Take Self-Assessment
              </a>
              <a
                href="/alpha"
                onClick={() => analytics.trackCTAClick('hero_alpha')}
                className="rounded-none bg-white border-2 border-aic-black px-8 py-4 text-sm font-semibold text-aic-black shadow-sm hover:bg-gray-50 font-mono uppercase tracking-widest transition-colors"
              >
                Join Alpha Program
              </a>
            </div>
          </div>
        </div>
      </div>
      <Marquee
        text="ACCOUNTABILITY · TRANSPARENCY · JUSTICE · HUMANITY · OVERSIGHT · FAIRNESS ·"
        className="absolute bottom-0 left-0 w-full py-4 bg-aic-black text-aic-paper font-mono text-lg"
      />
    </div>
  );
};

export default HeroSection;