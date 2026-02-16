'use client';

import { motion } from 'framer-motion';
import * as analytics from '@/lib/analytics';

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Dynamic Background Element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-aic-gold/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-aic-gold uppercase tracking-[0.3em] text-xs mb-6"
          >
            POPIA Section 71 &amp; ISO/IEC 42001 Compliance
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
            className="text-6xl md:text-8xl font-serif font-medium tracking-tight text-aic-black leading-[0.95]"
          >
            Accountability <br />
            <span className="italic font-normal text-aic-red">by Design.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          >
            <div>
                <p className="text-lg leading-relaxed text-gray-600 font-serif mb-8">
                    AIC is the definitive trust infrastructure for sovereign AI governance. We certify the humans accountable for algorithmic outcomes, ensuring compliance with POPIA Section 71 and ISO/IEC 42001.
                </p>
                <div className="flex flex-col gap-4">
                    <motion.a
                        whileHover={{ x: 10 }}
                        href="/business"
                        onClick={() => analytics.trackCTAClick('hero_business')}
                        className="group flex items-center justify-between border-b border-aic-black py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-aic-gold hover:border-aic-gold"
                    >
                        <span>For Organizations</span>
                        <span className="text-xl">→</span>
                    </motion.a>
                    
                    <motion.a
                        whileHover={{ x: 10 }}
                        href="/citizens"
                        onClick={() => analytics.trackCTAClick('hero_citizens')}
                        className="group flex items-center justify-between border-b border-aic-black py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-aic-red hover:border-aic-red"
                    >
                        <span>For the Public</span>
                        <span className="text-xl">→</span>
                    </motion.a>
                </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <motion.a
                whileHover={{ x: 10 }}
                href="/assessment"
                onClick={() => analytics.trackCTAClick('hero_assessment')}
                className="group flex items-center justify-between border-b border-aic-black/5 py-4 font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-aic-red hover:border-aic-red"
              >
                <span>Take Self-Assessment</span>
                <span className="text-xl">→</span>
              </motion.a>
              
              <motion.a
                whileHover={{ x: 10 }}
                href="/alpha"
                onClick={() => analytics.trackCTAClick('hero_alpha')}
                className="group flex items-center justify-between border-b border-aic-black/5 py-4 font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-aic-gold hover:border-aic-gold"
              >
                <span>Alpha Recruitment</span>
                <span className="text-xl">→</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: "20vh" }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-8 w-px bg-aic-black/10 hidden lg:block"
      />
    </div>
  );
};

export default HeroSection;
