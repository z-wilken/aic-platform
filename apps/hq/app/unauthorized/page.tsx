'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="text-6xl mb-8">🚫</div>
        <h1 className="text-3xl font-bold font-serif text-white uppercase tracking-tighter">Access Restricted</h1>
        <p className="text-gray-500 font-serif leading-relaxed italic">
          Your credentials do not grant access to the Admin Factory. This zone is restricted to Lead Auditors and System Administrators.
        </p>
        <div className="pt-8 border-t border-gray-800">
          <Link 
            href="/login" 
            className="inline-block bg-blue-600 text-white px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors"
          >
            Return to Authentication
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
