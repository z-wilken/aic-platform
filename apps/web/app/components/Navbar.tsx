'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import * as analytics from '@/lib/analytics';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-aic-paper/80 backdrop-blur-md border-b border-aic-black/5">
      <div className="mx-auto max-w-7xl flex h-20 items-center justify-between px-6 lg:px-8">
        <div className="flex items-center">
          <Link 
            href="/" 
            className="font-serif text-2xl font-medium tracking-tight text-aic-black" 
            onClick={() => analytics.trackCTAClick('logo')}
          >
            AIC<span className="text-aic-gold">.</span>
          </Link>
        </div>
        
        <div className="hidden md:flex md:items-center md:gap-12">
          <Link 
            href="/tiers" 
            className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group"
            onClick={() => analytics.trackCTAClick('nav_tiers')}
          >
            THE FRAMEWORK
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
          </Link>
          <Link 
            href="/process" 
            className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group"
            onClick={() => analytics.trackCTAClick('nav_process')}
          >
            PROCESS
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
          </Link>
          {['ABOUT', 'CONTACT'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group"
              onClick={() => analytics.trackCTAClick(`nav_${item.toLowerCase()}`)}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <a 
            href="http://localhost:3001/login" 
            className="hidden sm:block font-mono text-[10px] font-bold text-gray-400 hover:text-aic-black transition-colors tracking-widest"
            onClick={() => analytics.trackCTAClick('nav_login')}
          >
            LOGIN
          </a>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/alpha"
              onClick={() => analytics.trackCTAClick('nav_alpha')}
              className="bg-aic-black px-6 py-2.5 text-[10px] font-bold text-white font-mono uppercase tracking-widest hover:bg-aic-red transition-colors"
            >
              JOIN ALPHA
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}