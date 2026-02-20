'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMfaRequired, setIsMfaRequired] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const mfaToken = formData.get('mfaToken') as string;

    try {
        const result = await signIn('credentials', {
            email,
            password,
            mfaToken,
            redirect: false,
        });

        if (result?.error) {
            if (result.error.includes('MFA_REQUIRED')) {
                setIsMfaRequired(true);
                setError('MFA Token Required');
            } else if (result.error.includes('locked')) {
                setError(result.error);
            } else {
                setError('Invalid credentials or insufficient permissions.');
            }
            setIsLoading(false);
        } else {
            router.push('/');
        }
    } catch {
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
                    {/* SSO Providers */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all group"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.75c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-[10px] font-bold font-mono text-white uppercase tracking-widest">Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => signIn('microsoft-entra-id', { callbackUrl: '/' })}
                            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all group"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 23 23">
                                <path fill="#f3f3f3" d="M0 0h11v11H0z" />
                                <path fill="#f3f3f3" d="M12 0h11v11H12z" />
                                <path fill="#f3f3f3" d="M0 12h11v11H0z" />
                                <path fill="#f3f3f3" d="M12 12h11v11H12z" />
                            </svg>
                            <span className="text-[10px] font-bold font-mono text-white uppercase tracking-widest">Office 365</span>
                        </button>
                    </div>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
                        <div className="relative flex justify-center text-[8px] font-mono font-bold uppercase"><span className="bg-[#0a0a0a] px-2 text-gray-600">Institutional Relay</span></div>
                    </div>

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

                    <AnimatePresence>
                        {isMfaRequired && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3"
                            >
                                <label htmlFor="mfaToken" className="block text-[10px] font-bold text-aic-gold font-mono uppercase tracking-widest">
                                    MFA Verification Token
                                </label>
                                <input 
                                    id="mfaToken" 
                                    name="mfaToken" 
                                    type="text" 
                                    required={isMfaRequired}
                                    className="w-full bg-aic-gold/5 border-b border-aic-gold/30 py-3 text-white focus:border-aic-gold outline-none font-mono text-lg tracking-[0.5em] text-center transition-all"
                                    placeholder="000000"
                                    maxLength={6}
                                    pattern="\d{6}"
                                    autoComplete="one-time-code"
                                />
                                <p className="text-[9px] text-gray-500 font-mono uppercase text-center">
                                    Enter the 6-digit code from your authenticator app
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

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

