'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import * as analytics from '@/lib/analytics';

export default function Navbar() {
  const pathname = usePathname();
  
  const isCitizenPath = pathname.startsWith('/citizens');
  const isOrgPath = pathname.startsWith('/business');

  return (
    <nav className="sticky top-0 z-50 w-full bg-aic-paper/80 backdrop-blur-md border-b border-aic-black/5">
      {/* Approach/Audience Switcher */}
      <div className="bg-aic-black text-[9px] font-mono font-bold tracking-[0.3em] uppercase py-4 flex justify-center gap-8 items-center">
        <Link 
            href="/citizens" 
            className={`hover:text-white transition-colors ${isCitizenPath ? 'text-aic-gold underline underline-offset-4' : 'text-gray-500'}`}
        >
            For the Public
        </Link>
        <Link 
            href="/business" 
            className={`hover:text-white transition-colors ${isOrgPath || (!isCitizenPath && !isOrgPath) ? 'text-aic-gold underline underline-offset-4' : 'text-gray-500'}`}
        >
            For Organizations
        </Link>
      </div>

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
          {isCitizenPath ? (
            <>
                <Link href="/citizens/rights" className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group">
                    KNOW YOUR RIGHTS
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
                </Link>
                <Link href="/citizens/appeal" className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group">
                    APPEAL A DECISION
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
                </Link>
                <Link href="/citizens/blog" className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group">
                    INSIGHTS
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
                </Link>
                <Link href="/registry" className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group">
                    CERTIFIED REGISTRY
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
                </Link>
                <Link href="/contact?type=report" className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group text-aic-red">
                    REPORT A CONCERN
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-red transition-all group-hover:w-full" />
                </Link>
            </>
          ) : (
            <>
                <Link href="/tiers" className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group">
                    THE FRAMEWORK
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
                </Link>
                <Link href="/process" className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group">
                    PROCESS
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
                </Link>
                <Link href="/business/pricing" className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group">
                    PRICING
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-aic-black transition-all group-hover:w-full" />
                </Link>
                <Link href="/about" className="relative font-mono text-[10px] font-bold text-gray-500 hover:text-aic-black transition-colors tracking-widest group">
                    ABOUT
                </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-8">
          <a 
            href={process.env.NEXT_PUBLIC_PLATFORM_URL ? `${process.env.NEXT_PUBLIC_PLATFORM_URL}/login` : '/login'}
            className="hidden sm:block font-mono text-[10px] font-bold text-gray-400 hover:text-aic-black transition-colors tracking-widest"
            onClick={() => analytics.trackCTAClick('nav_login')}
          >
            LOGIN
          </a>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={isCitizenPath ? "/assessment" : "/alpha"}
              onClick={() => analytics.trackCTAClick('nav_cta')}
              className="bg-aic-black px-6 py-2.5 text-[10px] font-bold text-white font-mono uppercase tracking-widest hover:bg-aic-red transition-colors"
            >
              {isCitizenPath ? 'CHECK A SYSTEM' : 'JOIN ALPHA'}
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
