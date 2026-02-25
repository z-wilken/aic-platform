'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import AICCharacter from './AICCharacter';
import * as analytics from '@/lib/analytics';

const HeroSection = () => {
  const [characterPose, setCharacterPose] = useState<'idle' | 'thinking' | 'reviewing' | 'approving'>('idle');

  return (
    <section className="relative min-h-screen bg-aic-navy overflow-hidden flex items-center">

      {/* ── Copper ambient glow ──────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aic-copper/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-aic-copper/3 rounded-full blur-[100px]" />
      </motion.div>

      {/* ── Subtle grid overlay ───────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center min-h-screen">

          {/* ── Left: Copy ───────────────────────────────────────── */}
          <div className="lg:pr-16 pt-24 lg:pt-0">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="font-mono text-[10px] font-bold text-aic-copper uppercase tracking-[0.4em] mb-8"
            >
              The Global Standard for Human Accountability in AI
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-serif text-5xl md:text-6xl xl:text-7xl font-medium text-white leading-[1.0] tracking-tight"
            >
              The Human<br />
              <span className="italic font-normal text-aic-copper">in the Loop.</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="mt-8 text-lg leading-relaxed text-white/60 font-sans max-w-lg"
            >
              AIC certifies that human empathy and accountability remain present for every
              consequential automated decision. Built on POPIA Section 71 and ISO/IEC 42001.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="mt-12 flex flex-col gap-0 border-t border-white/10"
            >
              {[
                {
                  label: 'For Organisations — Get Certified',
                  href: '/business',
                  track: 'hero_business',
                  pose: 'reviewing' as const,
                },
                {
                  label: 'For the Public — Know Your Rights',
                  href: '/citizens',
                  track: 'hero_citizens',
                  pose: 'approving' as const,
                },
                {
                  label: 'Take the Self-Assessment',
                  href: '/assessment',
                  track: 'hero_assessment',
                  pose: 'thinking' as const,
                },
              ].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setCharacterPose(item.pose)}
                  onMouseLeave={() => setCharacterPose('idle')}
                  onClick={() => analytics.trackCTAClick(item.track)}
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group flex items-center justify-between border-b border-white/10 py-5
                             font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/50
                             hover:text-aic-copper hover:border-aic-copper/40 transition-colors duration-200"
                >
                  <span>{item.label}</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Character ─────────────────────────────────── */}
          <div className="flex items-center justify-center lg:justify-end relative">
            {/* Glow behind character */}
            <div className="absolute w-80 h-80 bg-aic-copper/8 rounded-full blur-[80px]" />

            {/* Character label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0
                         font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] text-center"
            >
              Human Accountability Officer
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <AICCharacter
                pose={characterPose}
                scheme="dark"
                size={340}
                animate
              />
            </motion.div>

            {/* Floating annotation — copper */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block"
            >
              <div className="flex items-center gap-2 font-mono text-[9px] text-aic-copper/70 uppercase tracking-widest">
                <div className="w-8 h-px bg-aic-copper/40" />
                <span>Always in the loop</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom fade ───────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-aic-navy to-transparent pointer-events-none" />

      {/* ── Scroll hint ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
