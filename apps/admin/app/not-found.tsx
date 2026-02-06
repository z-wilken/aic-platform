'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md bg-[#1c1c1c] p-12 rounded-3xl border border-white/5 shadow-2xl"
      >
        <div className="mb-8">
          <span className="text-4xl text-aic-gold font-mono font-bold tracking-tighter">404</span>
        </div>
        
        <h2 className="text-2xl font-serif font-bold text-white mb-4 tracking-tight">
          Invalid Access Point.
        </h2>
        
        <p className="text-gray-500 font-serif text-sm leading-relaxed mb-10">
          The operation you are trying to perform is not registered in the system index. Please verify the URL and try again.
        </p>
        
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all rounded-lg"
        >
          Return to Command Center
        </Link>
      </motion.div>
      
      <div className="mt-12 flex items-center gap-2">
        <div className="h-1 w-1 rounded-full bg-aic-red animate-pulse"></div>
        <span className="text-[8px] font-mono text-gray-700 uppercase tracking-[0.4em]">Internal Security Protocol Active</span>
      </div>
    </div>
  );
}
