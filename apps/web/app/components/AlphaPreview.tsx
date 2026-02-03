// components/AlphaPreview.tsx
'use client';

import Link from 'next/link';
import * as analytics from '@/lib/analytics';

const AlphaPreview = () => {
  return (
    <div className="bg-aic-bg py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-aic-black px-6 pt-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#D4AF37" />
                <stop offset={1} stopColor="#1A1A1A" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">
              Join the Alpha Program.
              <br />
              Secure the Future of Your AI.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300 font-serif">
              We are selecting 10 pioneer organizations to establish the South African standard for human accountability in AI.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                href="/alpha"
                onClick={() => analytics.trackCTAClick('preview_alpha_apply')}
                className="rounded-none bg-white px-8 py-4 text-sm font-semibold text-aic-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white font-mono uppercase tracking-widest transition-colors"
              >
                Apply Now
              </Link>
              <Link href="/about" onClick={() => analytics.trackCTAClick('preview_alpha_learn')} className="text-sm font-semibold leading-6 text-white font-mono uppercase tracking-widest border-b border-gray-700 hover:border-white transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <div className="absolute top-0 left-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full">
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-gray-400 font-mono text-xs uppercase tracking-widest">Cohort Size</span>
                        <span className="text-aic-gold font-mono font-bold">10 ORGANIZATIONS</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-gray-400 font-mono text-xs uppercase tracking-widest">Duration</span>
                        <span className="text-aic-gold font-mono font-bold">6 MONTHS</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-gray-400 font-mono text-xs uppercase tracking-widest">Investment</span>
                        <span className="text-aic-gold font-mono font-bold">ZAR 60K - 120K</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-mono text-xs uppercase tracking-widest">Status</span>
                        <span className="text-green-400 font-mono font-bold flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            RECRUITING
                        </span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphaPreview;