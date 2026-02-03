'use client';

import { useEffect, useRef, useState } from 'react';
import { tiers } from '../data/tiers';

export default function TierFramework() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTier, setActiveTier] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="framework"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aic-black/[0.02] to-transparent" />
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 font-mono text-[20vw] font-bold text-aic-black/[0.02] leading-none transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          RISK
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 lg:mb-32">
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-aic-gold uppercase mb-6">
              <span className="w-8 h-px bg-aic-gold" />
              The Standard
            </span>
          </div>

          <h2
            className={`font-serif text-4xl lg:text-6xl font-bold text-aic-black leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Risk demands{' '}
            <span className="relative inline-block">
              <span className="relative z-10">accountability</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-aic-red/20 -z-0" />
            </span>
          </h2>

          <p
            className={`mt-6 text-xl text-gray-600 font-serif leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            We map oversight to consequence. The higher the stakes, the more human involvement required.
          </p>
        </div>

        {/* Risk Meter Visualization */}
        <div
          className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-aic-gray via-aic-gold to-aic-red transition-all duration-1000 delay-500"
              style={{ width: isVisible ? '100%' : '0%' }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-mono text-xs text-aic-gray uppercase tracking-wider">Low Risk</span>
            <span className="font-mono text-xs text-aic-red uppercase tracking-wider">Critical Risk</span>
          </div>
        </div>

        {/* Tier Comparison - Horizontal Stack */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0">
            {tiers.map((tier, index) => (
              <div
                key={tier.id}
                className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
                onMouseEnter={() => setActiveTier(tier.id)}
                onMouseLeave={() => setActiveTier(null)}
              >
                {/* Card */}
                <div
                  className={`tier-card tier-${tier.id} relative bg-white p-8 lg:p-10 transition-all duration-500 ${
                    activeTier === tier.id ? 'shadow-2xl scale-[1.02] z-10' : 'shadow-lg'
                  } ${activeTier && activeTier !== tier.id ? 'opacity-50' : ''}`}
                >
                  {/* Tier Number - Large */}
                  <div className="absolute -top-6 -left-2 lg:left-6">
                    <span className={`font-mono text-8xl lg:text-9xl font-bold ${tier.textColor} opacity-10`}>
                      0{tier.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Level Badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`w-3 h-3 rounded-full ${tier.bgColor}`} />
                      <span className={`font-mono text-xs font-bold ${tier.textColor} uppercase tracking-wider`}>
                        {tier.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-aic-black mb-2">
                      {tier.name}
                    </h3>

                    {/* Tagline */}
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-6">
                      {tier.tagline}
                    </p>

                    {/* Description */}
                    <p className="font-serif text-gray-600 leading-relaxed mb-8">
                      {tier.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100 mb-6">
                      <div>
                        <div className={`font-mono text-2xl font-bold ${tier.textColor}`}>
                          {tier.stats.humanReview}%
                        </div>
                        <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                          Human Review
                        </div>
                      </div>
                      <div>
                        <div className={`font-mono text-2xl font-bold ${tier.textColor}`}>
                          {tier.stats.responseTime}
                        </div>
                        <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                          Response
                        </div>
                      </div>
                      <div>
                        <div className={`font-mono text-xs font-bold ${tier.textColor} leading-tight`}>
                          {tier.stats.auditFrequency}
                        </div>
                        <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                          Audits
                        </div>
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="mb-6">
                      <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Common Use Cases
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tier.examples.map((example) => (
                          <span
                            key={example}
                            className="inline-flex px-3 py-1 bg-gray-50 font-mono text-xs text-gray-600"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {tier.requirements.map((req) => (
                          <li
                            key={req.text}
                            className="flex items-center gap-2 font-mono text-sm text-gray-700"
                          >
                            <svg
                              className={`w-4 h-4 flex-shrink-0 ${req.critical ? tier.textColor : 'text-gray-300'}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {req.critical ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              )}
                            </svg>
                            <span className={req.critical ? 'font-medium' : ''}>{req.text}</span>
                            {req.critical && (
                              <span className={`ml-auto px-1.5 py-0.5 text-[9px] font-bold ${tier.bgColor} text-white uppercase`}>
                                Required
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Connector dot */}
                <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className={`w-4 h-4 rounded-full ${tier.bgColor} border-4 border-white shadow-md`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-20 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-serif text-lg text-gray-600 mb-6">
            Not sure which tier applies to your system?
          </p>
          <a
            href="/assessment"
            className="group inline-flex items-center gap-3 bg-aic-black px-8 py-4 font-mono text-sm font-semibold text-white uppercase tracking-wider transition-all duration-300 hover:bg-aic-red"
          >
            Take the Assessment
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
