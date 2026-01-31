'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call delay for realism
    setTimeout(() => {
        router.push('/'); // Redirect to dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-aic-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-aic-black to-black opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aic-gold/5 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 w-full max-w-md p-8">
            <div className="glass-panel p-8 rounded-2xl shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl font-bold text-white mb-2">AIC PULSE<span className="text-aic-gold">.</span></h1>
                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Secure Client Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300 font-mono">Email Address</label>
                        <div className="mt-2">
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required 
                                className="block w-full rounded-md border-0 bg-white/5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-aic-gold sm:text-sm sm:leading-6 pl-3"
                                placeholder="admin@enterprise.co.za"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300 font-mono">Password</label>
                        <div className="mt-2">
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                autoComplete="current-password" 
                                required 
                                className="block w-full rounded-md border-0 bg-white/5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-aic-gold sm:text-sm sm:leading-6 pl-3"
                                placeholder="••••••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-aic-gold px-3 py-2 text-sm font-semibold leading-6 text-aic-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-gold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-mono uppercase tracking-wide"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-aic-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Protected by AIC Secure Auth v2.1 <br/>
                        <a href="#" className="text-aic-gold hover:text-white transition-colors">Forgot password?</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}
