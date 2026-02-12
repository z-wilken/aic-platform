'use client';

import { useState } from 'react';
import * as analytics from '@/lib/analytics';

import Link from 'next/link';

export default function AlphaForm() {
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
            analytics.trackAlphaApplication(data.company as string);
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

  if (isSubmitted) {
      return (
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
                <Link
                  href="/"
                  className="text-sm font-semibold leading-6 text-aic-black font-mono hover:text-aic-gold transition-colors"
                >
                  Return to Homepage <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
          </div>
      );
  }

  return (
    <div className="mt-16 glass-card p-8 sm:p-10 rounded-2xl shadow-xl ring-1 ring-gray-900/5 animate-in fade-in zoom-in duration-500 delay-100">
        <h2 className="text-2xl font-bold font-serif mb-8 border-b border-gray-100 pb-4">Application for Cohort 1</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">First name</label>
            <div className="mt-2.5">
                <input type="text" required name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono" />
            </div>
            </div>
            <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Last name</label>
            <div className="mt-2.5">
                <input type="text" required name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono" />
            </div>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
                <label htmlFor="job-title" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Job Title</label>
                <div className="mt-2.5">
                    <input type="text" required name="job-title" id="job-title" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono" />
                </div>
            </div>
            <div>
                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Organization Name</label>
                <div className="mt-2.5">
                    <input type="text" required name="company" id="company" autoComplete="organization" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono" />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
                <label htmlFor="org-size" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Organization Size</label>
                <div className="mt-2.5">
                    <select id="org-size" name="org-size" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono">
                        <option>1-50 employees</option>
                        <option>51-200 employees</option>
                        <option>201-1000 employees</option>
                        <option>1000+ employees</option>
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="industry" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Industry Sector</label>
                <div className="mt-2.5">
                    <select id="industry" name="industry" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono">
                        <option>Banking & FinTech</option>
                        <option>Healthcare</option>
                        <option>Recruitment & HR Tech</option>
                        <option>Insurance</option>
                        <option>Retail & E-commerce</option>
                        <option>Government / Public Sector</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Work Email</label>
            <div className="mt-2.5">
            <input type="email" required name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono" />
            </div>
        </div>

        <div>
            <label htmlFor="use-case" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Briefly describe your AI use case</label>
            <div className="mt-2.5">
            <textarea required name="use-case" id="use-case" rows={4} className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono"></textarea>
            </div>
        </div>

        <div className="space-y-4">
            <label className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Which tiers likely apply? (Select all that apply)</label>
            <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="tier1" name="tier1" className="h-4 w-4 rounded border-gray-300 text-aic-black focus:ring-aic-black" />
                    <label htmlFor="tier1" className="text-sm font-serif">Tier 1: Human-Approved</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="tier2" name="tier2" className="h-4 w-4 rounded border-gray-300 text-aic-black focus:ring-aic-black" />
                    <label htmlFor="tier2" className="text-sm font-serif">Tier 2: Human-Supervised</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="tier3" name="tier3" className="h-4 w-4 rounded border-gray-300 text-aic-black focus:ring-aic-black" />
                    <label htmlFor="tier3" className="text-sm font-serif">Tier 3: Automated</label>
                </div>
            </div>
        </div>

        <div>
            <label htmlFor="referral" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">How did you hear about AIC?</label>
            <div className="mt-2.5">
                <select id="referral" name="referral" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono">
                    <option>LinkedIn</option>
                    <option>Industry Conference</option>
                    <option>Word of Mouth</option>
                    <option>Search Engine</option>
                    <option>News Article</option>
                </select>
            </div>
        </div>

        <div className="relative flex gap-x-3 bg-aic-gold/10 p-4 rounded-lg border border-aic-gold/20">
            <div className="flex h-6 items-center">
            <input id="candidates" required name="candidates" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-aic-black focus:ring-aic-black" />
            </div>
            <div className="text-sm leading-6">
            <label htmlFor="candidates" className="font-medium text-gray-900 font-serif">I understand this is a paid pilot program starting at R60k.</label>
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
  );
}
