'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'Unauthorized') {
      setError('Access Denied: You do not have the required permissions for HQ.');
    } else if (errorParam) {
      setError(`Authentication error: ${errorParam}`);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        console.log('Attempting sign in for:', email);
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        console.log('Sign in result:', result?.error ? 'Error' : 'Success');

        if (result?.error) {
            setError(result.error === 'CredentialsSignin' ? 'Invalid credentials or unauthorized role.' : `Login failed: ${result.error}`);
            setIsLoading(false);
        } else {
            console.log('Navigating to dashboard...');
            router.push('/');
            // If navigation takes time, ensure we can still show errors if redirected back
            setTimeout(() => setIsLoading(false), 5000);
        }
    } catch (err) {
        console.error('Login submission error:', err);
        setError('An unexpected error occurred.');
        setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-8">
        {error && (
            <div className="mb-8 p-4 bg-aic-red/10 border border-aic-red/20 rounded-xl text-aic-red text-xs font-mono text-center">
                {error}
            </div>
        )}

        <div>
            <label htmlFor="email" className="block text-[10px] font-bold text-gray-500 font-mono uppercase tracking-widest mb-3">Authentication Email</label>
            <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="w-full border-b border-white/10 bg-transparent py-3 text-white focus:border-aic-gold outline-none font-mono text-sm transition-colors"
                placeholder="admin@aic.co.za"
            />
        </div>

        <div>
            <label htmlFor="password" className="block text-[10px] font-bold text-gray-500 font-mono uppercase tracking-widest mb-3">Security Key</label>
            <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="w-full border-b border-white/10 bg-transparent py-3 text-white focus:border-aic-gold outline-none font-mono text-sm transition-colors"
                placeholder="••••••••"
            />
        </div>

        <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-black py-4 font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-aic-gold transition-all duration-300 disabled:opacity-50"
        >
            {isLoading ? 'VERIFYING...' : 'INITIALIZE SESSION'}
        </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* HQ Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>
        <motion.div 
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"
        />

        <div className="relative z-10 w-full max-w-md p-8">
            <div className="bg-[#0a0a0a] p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl font-bold text-white tracking-tighter mb-2">AIC<span className="text-aic-gold">HQ</span></h1>
                    <p className="text-gray-500 font-mono text-[8px] uppercase tracking-[0.4em]">Internal Command Center</p>
                </div>

                <Suspense fallback={<div className="text-center font-mono text-xs text-gray-500">Loading Access Terminal...</div>}>
                    <LoginForm />
                </Suspense>

                <div className="mt-12 text-center">
                    <p className="text-[8px] font-mono text-gray-600 uppercase tracking-widest leading-relaxed">
                        Restricted Access. <br/>
                        All unauthorized attempts are logged and reported.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}
