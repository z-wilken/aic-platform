'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function AlphaPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/alpha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to connect to the server. Please check your connection.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-24 sm:py-32">
          {!isSubmitted ? (
              <>
                <div className="text-center animate-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-6 flex justify-center">
                        <span className="inline-flex items-center rounded-full bg-aic-black/5 px-3 py-1 text-xs font-medium text-aic-black ring-1 ring-inset ring-aic-black/10 font-mono tracking-wider uppercase">
                        COHORT 1: OPEN
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-aic-black sm:text-6xl font-serif">
                    Join the Alpha Program
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 font-serif max-w-xl mx-auto">
                    We are selecting 10 South African organizations to pioneer the AIC accountability standard. Participants receive early certification access and direct support.
                    </p>
                </div>

                <div className="mt-16 glass-card p-8 sm:p-10 rounded-2xl shadow-xl ring-1 ring-gray-900/5 animate-in fade-in zoom-in duration-500 delay-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">First name</label>
                        <div className="mt-2.5">
                            <input type="text" required name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                        </div>
                        </div>
                        <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Last name</label>
                        <div className="mt-2.5">
                            <input type="text" required name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                        </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Company</label>
                        <div className="mt-2.5">
                        <input type="text" required name="company" id="company" autoComplete="organization" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Work Email</label>
                        <div className="mt-2.5">
                        <input type="email" required name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="use-case" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Briefly describe your AI use case</label>
                        <div className="mt-2.5">
                        <textarea required name="use-case" id="use-case" rows={4} className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6"></textarea>
                        </div>
                    </div>

                    <div className="relative flex gap-x-3 bg-aic-gold/10 p-4 rounded-lg border border-aic-gold/20">
                        <div className="flex h-6 items-center">
                        <input id="candidates" required name="candidates" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-aic-black focus:ring-aic-black" />
                        </div>
                        <div className="text-sm leading-6">
                        <label htmlFor="candidates" className="font-medium text-gray-900 font-serif">I understand this is a paid pilot program starting at R50k.</label>
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-aic-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-black font-mono uppercase tracking-wide transition-all disabled:opacity-70 disabled:cursor-wait"
                        >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                SUBMITTING...
                            </span>
                        ) : 'Submit Application'}
                        </button>
                    </div>
                    </form>
                </div>
              </>
          ) : (
              /* Success State */
              <div className="glass-card p-12 rounded-2xl shadow-xl ring-1 ring-gray-900/5 text-center animate-in fade-in zoom-in duration-500">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6 animate-bounce">
                    <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-serif">Application Received</h2>
                  <p className="mt-4 text-lg text-gray-600 font-serif">
                    Thank you for your interest in the AIC Alpha Cohort. <br/>
                    Our team will review your submission and contact you within 48 hours.
                  </p>
                  
                  <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-200 inline-block text-left">
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">REFERENCE NUMBER</p>
                    <p className="text-xl font-mono font-bold text-gray-900">AIC-{Math.floor(1000 + Math.random() * 9000)}</p>
                  </div>

                  <div className="mt-10">
                    <a
                      href="/"
                      className="text-sm font-semibold leading-6 text-aic-black font-mono hover:text-aic-gold transition-colors"
                    >
                      Return to Homepage <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
              </div>
          )}
        </div>
      </div>
    </main>
  );
}
