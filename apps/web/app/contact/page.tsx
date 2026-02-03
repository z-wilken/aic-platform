'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-aic-gold font-mono uppercase tracking-widest">Connect</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-aic-black sm:text-4xl font-serif">
              Contact AIC
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
              Whether you are a regulator, an insurer, or an organization looking to lead in AI accountability, we want to hear from you.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Full Name</label>
                  <div className="mt-2.5">
                    <input type="text" name="name" id="name" required className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Email Address</label>
                  <div className="mt-2.5">
                    <input type="email" name="email" id="email" required className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Subject</label>
                  <div className="mt-2.5">
                    <select id="subject" name="subject" className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6">
                      <option>General Inquiry</option>
                      <option>Alpha Program Information</option>
                      <option>Partnership Proposal</option>
                      <option>Regulatory Compliance</option>
                      <option>Media Inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 font-mono">Message</label>
                  <div className="mt-2.5">
                    <textarea name="message" id="message" rows={4} required className="block w-full rounded-md border-0 bg-white/50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6"></textarea>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-none bg-aic-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-black font-mono uppercase tracking-wide transition-all disabled:opacity-70"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="glass-card p-12 rounded-2xl text-center animate-in fade-in zoom-in duration-500">
                <h3 className="text-2xl font-bold text-gray-900 font-serif">Message Sent</h3>
                <p className="mt-4 text-lg text-gray-600 font-serif">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
                <div className="mt-8">
                  <a href="/" className="text-sm font-semibold text-aic-black font-mono hover:text-aic-gold transition-colors">
                    &larr; Return Home
                  </a>
                </div>
              </div>
            )}

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="glass-card p-6 rounded-xl border border-white/40">
                    <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Office</h4>
                    <p className="font-serif text-gray-600 text-sm">
                        Rosebank Link, 173 Oxford Rd<br/>
                        Rosebank, Johannesburg<br/>
                        2196, South Africa
                    </p>
                </div>
                <div className="glass-card p-6 rounded-xl border border-white/40">
                    <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Direct</h4>
                    <p className="font-serif text-gray-600 text-sm">
                        hello@aicert.co.za<br/>
                        +27 (0) 11 447 1234
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
