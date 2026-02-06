'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-aic-paper flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md"
      >
        <h1 className="text-9xl font-serif font-bold text-aic-black/5 select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          404
        </h1>
        
        <div className="h-px w-12 bg-aic-gold mx-auto mb-8" />
        
        <h2 className="text-4xl font-serif font-medium text-aic-black mb-6 tracking-tight">
          Page Not Found.
        </h2>
        
        <p className="text-gray-500 font-serif leading-relaxed mb-12 italic">
          The accountability layer you are looking for has either been moved or does not exist in our current registry.
        </p>
        
        <Link 
          href="/"
          className="inline-block px-10 py-4 bg-aic-black text-white font-mono text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-aic-gold hover:text-black transition-all duration-500 shadow-xl"
        >
          Return to Registry
        </Link>
      </motion.div>
      
      <div className="absolute bottom-12 left-12 text-[10px] font-mono text-gray-300 uppercase tracking-widest vertical-text hidden lg:block">
        AI Integrity Certification
      </div>
    </div>
  );
}
