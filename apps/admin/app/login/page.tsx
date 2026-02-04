'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError('Invalid credentials or insufficient permissions.');
            setIsLoading(false);
        } else {
            router.push('/');
        }
    } catch (err) {
        setError('A system error occurred during authentication.');
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.05),_transparent)] opacity-50"></div>
        
        <div className="relative z-10 w-full max-w-md p-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1c1c1c] p-12 rounded-3xl border border-gray-800 shadow-2xl"
            >
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl font-bold text-white tracking-tighter mb-2">AIC <span className="text-blue-500 font-mono text-3xl">ADMIN</span></h1>
                    <p className="text-gray-500 font-mono text-[8px] uppercase tracking-[0.4em]">Internal Audit Factory</p>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block text-[10px] font-bold text-gray-500 font-mono uppercase tracking-widest mb-3">Auditor Identifier</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            required 
                            className="w-full border-b border-gray-800 bg-transparent py-3 text-white focus:border-blue-500 outline-none font-mono text-sm transition-colors"
                            placeholder="auditor@aic.co.za"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-[10px] font-bold text-gray-500 font-mono uppercase tracking-widest mb-3">Authorization Key</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            required 
                            className="w-full border-b border-gray-800 bg-transparent py-3 text-white focus:border-blue-500 outline-none font-mono text-sm transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-4 font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-blue-900/20"
                    >
                        {isLoading ? 'AUTHORIZING...' : 'INITIALIZE ADMIN SESSION'}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-[8px] font-mono text-gray-600 uppercase tracking-widest leading-relaxed">
                        Classified Access Level 2 <br/>
                        Continuous monitoring active.
                    </p>
                </div>
            </motion.div>
        </div>
    </div>
  );
}
