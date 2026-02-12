'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

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
        setError('A system error occurred. Please try again later.');
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-aic-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-aic-black to-black opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aic-gold/5 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 w-full max-w-md p-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-12 rounded-[2.5rem] shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
            >
                <div className="text-center mb-12">
                    <h1 className="font-serif text-3xl font-bold text-white mb-2 tracking-tight">AIC PULSE<span className="text-aic-gold">.</span></h1>
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">Secure Client Access</p>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono text-center"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleLogin} className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-widest mb-3">Institutional Email</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            required 
                            className="w-full bg-white/5 border-b border-white/10 py-3 text-white focus:border-aic-gold outline-none font-serif text-sm transition-all"
                            placeholder="compliance@bank.co.za"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label htmlFor="password" className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-widest">Access Key</label>
                            <a href="/forgot-password" title="Forgot Password" className="text-[10px] font-bold text-gray-500 hover:text-aic-gold transition-colors font-mono uppercase tracking-widest">
                                Forgot?
                            </a>
                        </div>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            required 
                            className="w-full bg-white/5 border-b border-white/10 py-3 text-white focus:border-aic-gold outline-none font-serif text-sm transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-aic-gold text-aic-black py-4 font-mono font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 disabled:opacity-50 shadow-xl"
                    >
                        {isLoading ? 'AUTHORIZING...' : 'INITIALIZE SESSION'}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest leading-relaxed">
                        Protected by AIC Secure Auth v2.1 <br/>
                        Continuous integrity monitoring.
                    </p>
                </div>
            </motion.div>
        </div>
    </div>
  );
}

