'use client';

import { useState } from 'react';
import * as analytics from '@/lib/analytics';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple honeypot check
    const formData = new FormData(e.currentTarget);
    if (formData.get('bot-field')) {
        return; // Bot detected
    }

    setIsLoading(true);
    analytics.trackContactForm(formData.get('subject') as string);
    // Simulate API delay
    setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
      return (
          <div className="glass-card p-12 rounded-2xl text-center animate-in fade-in zoom-in duration-500 border border-gray-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-aic-gold/10 mb-6">
                <svg className="h-8 w-8 text-aic-gold" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 font-serif">Inquiry Received</h3>
            <p className="mt-4 text-lg text-gray-600 font-serif italic">
              "Trust but verify." <br/>
              A lead auditor will respond to your inquiry within 24 hours.
            </p>
            <div className="mt-10">
              <a href="/" className="text-sm font-semibold text-aic-black font-mono hover:text-aic-gold transition-colors uppercase tracking-widest border-b border-aic-black">
                Return to Homepage
              </a>
            </div>
          </div>
      );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
        {/* Honeypot field */}
        <input type="hidden" name="bot-field" />
        
        <div>
          <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900 font-mono uppercase tracking-wider">Full Name</label>
          <div className="mt-2.5">
            <input type="text" name="name" id="name" required className="block w-full rounded-none border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 font-mono uppercase tracking-wider">Work Email Address</label>
          <div className="mt-2.5">
            <input type="email" name="email" id="email" required className="block w-full rounded-none border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono" />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900 font-mono uppercase tracking-wider">Subject</label>
          <div className="mt-2.5">
            <select id="subject" name="subject" className="block w-full rounded-none border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono">
              <option>General Inquiry</option>
              <option>Alpha Program Information</option>
              <option>Partnership Proposal</option>
              <option>Regulatory Compliance</option>
              <option>Media Inquiry</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 font-mono uppercase tracking-wider">Message</label>
          <div className="mt-2.5">
            <textarea name="message" id="message" rows={4} required className="block w-full rounded-none border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 font-mono"></textarea>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-none bg-aic-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-black font-mono uppercase tracking-widest transition-all disabled:opacity-70"
          >
            {isLoading ? 'TRANSMMITTING...' : 'SEND INQUIRY'}
          </button>
        </div>
    </form>
  );
}
