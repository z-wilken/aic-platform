'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function AlphaPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      company: formData.get('company'),
      email: formData.get('email'),
      role: formData.get('role'),
      useCase: formData.get('use-case'),
      aiSystems: formData.get('ai-systems'),
      timestamp: new Date().toISOString(),
    };

    try {
      // In production, this would submit to your API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setReferenceNumber(`AIC-${Date.now().toString(36).toUpperCase()}`);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Success State
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-aic-paper">
        <Navbar />
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <div className="bg-white p-12 lg:p-16 shadow-xl text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <span className="inline-flex items-center gap-2 font-mono text-xs text-aic-gold uppercase tracking-wider mb-4">
                <span className="w-6 h-px bg-aic-gold" />
                Application Received
                <span className="w-6 h-px bg-aic-gold" />
              </span>

              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-aic-black mb-4">
                Welcome to the Alpha
              </h1>

              <p className="font-serif text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for your interest in pioneering AI accountability in South Africa.
                Our team will review your application and contact you within 48 hours.
              </p>

              {/* Reference Number */}
              <div className="inline-block bg-aic-paper p-6 mb-10">
                <p className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Reference Number
                </p>
                <p className="font-mono text-2xl font-bold text-aic-black">
                  {referenceNumber}
                </p>
              </div>

              {/* What's Next */}
              <div className="text-left border-t border-gray-100 pt-8">
                <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  What Happens Next
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-aic-gold/10 rounded-full flex items-center justify-center font-mono text-sm font-bold text-aic-gold">1</span>
                    <div>
                      <p className="font-serif font-semibold text-aic-black">Application Review</p>
                      <p className="font-serif text-sm text-gray-600">We assess your AI use case and compliance needs</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-aic-gold/10 rounded-full flex items-center justify-center font-mono text-sm font-bold text-aic-gold">2</span>
                    <div>
                      <p className="font-serif font-semibold text-aic-black">Discovery Call</p>
                      <p className="font-serif text-sm text-gray-600">30-minute call to understand your systems</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-aic-gold/10 rounded-full flex items-center justify-center font-mono text-sm font-bold text-aic-gold">3</span>
                    <div>
                      <p className="font-serif font-semibold text-aic-black">Certification Begins</p>
                      <p className="font-serif text-sm text-gray-600">Kick off your Alpha certification audit</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-10 font-mono text-sm text-aic-black hover:text-aic-red transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Homepage
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[25vw] font-bold text-aic-black/[0.02] leading-none">
            α
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          {/* Status Badge */}
          <div
            className={`mb-6 animate-fade-up ${mounted ? '' : 'opacity-0'}`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-aic-black text-white font-mono text-xs uppercase tracking-wider">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Cohort 1: Now Accepting Applications
            </span>
          </div>

          <h1
            className={`font-serif text-4xl lg:text-6xl font-bold text-aic-black leading-tight mb-6 animate-slide-left ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            Join the{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-aic-gold italic">Alpha</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-aic-gold/20 -z-0" />
            </span>{' '}
            Program
          </h1>

          <p
            className={`text-lg lg:text-xl font-serif text-gray-600 leading-relaxed max-w-2xl mx-auto animate-blur-reveal ${mounted ? '' : 'opacity-0'}`}
            style={{ animationDelay: '300ms' }}
          >
            Be among the first 10 South African organizations to pioneer the
            AIC accountability standard. Shape the future of ethical AI in Africa.
          </p>
        </div>
      </section>

      {/* Benefits + Form Section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Benefits */}
            <div
              className={`animate-fade-up ${mounted ? '' : 'opacity-0'}`}
              style={{ animationDelay: '400ms' }}
            >
              <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-aic-gold uppercase mb-6">
                <span className="w-8 h-px bg-aic-gold" />
                Alpha Benefits
              </span>

              <h2 className="font-serif text-3xl font-bold text-aic-black mb-8">
                Why Join Early?
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-aic-red/10 flex items-center justify-center">
                    <span className="font-mono text-lg font-bold text-aic-red">50%</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-aic-black mb-1">
                      Founding Member Pricing
                    </h3>
                    <p className="font-serif text-gray-600">
                      50% discount on certification fees. Lock in early-adopter rates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-aic-gold/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-aic-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-aic-black mb-1">
                      Direct Access
                    </h3>
                    <p className="font-serif text-gray-600">
                      Work directly with our founding team. Shape the certification framework.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-aic-black/5 flex items-center justify-center">
                    <svg className="w-6 h-6 text-aic-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-aic-black mb-1">
                      First Certified
                    </h3>
                    <p className="font-serif text-gray-600">
                      Be featured as a founding certified organization. PR and case study opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-aic-black/5 flex items-center justify-center">
                    <svg className="w-6 h-6 text-aic-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-aic-black mb-1">
                      POPIA Section 71 Compliance
                    </h3>
                    <p className="font-serif text-gray-600">
                      Demonstrate accountability for automated decisions as required by law.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Note */}
              <div className="mt-10 p-6 bg-aic-gold/10 border-l-4 border-aic-gold">
                <p className="font-mono text-xs text-aic-gold uppercase tracking-wider mb-2">
                  Alpha Pricing
                </p>
                <p className="font-serif text-2xl font-bold text-aic-black mb-1">
                  From R50,000
                </p>
                <p className="font-serif text-sm text-gray-600">
                  Full certification audit, tier assessment, and ongoing compliance support.
                </p>
              </div>
            </div>

            {/* Application Form */}
            <div
              className={`animate-fade-up ${mounted ? '' : 'opacity-0'}`}
              style={{ animationDelay: '500ms' }}
            >
              <div className="bg-white p-8 lg:p-10 shadow-xl">
                <h3 className="font-serif text-2xl font-bold text-aic-black mb-2">
                  Apply Now
                </h3>
                <p className="font-serif text-gray-600 mb-8">
                  Limited to 10 organizations in Cohort 1.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 font-mono text-sm focus:outline-none focus:border-aic-gold focus:ring-1 focus:ring-aic-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 font-mono text-sm focus:outline-none focus:border-aic-gold focus:ring-1 focus:ring-aic-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      className="w-full px-4 py-3 border border-gray-200 font-mono text-sm focus:outline-none focus:border-aic-gold focus:ring-1 focus:ring-aic-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 font-mono text-sm focus:outline-none focus:border-aic-gold focus:ring-1 focus:ring-aic-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Your Role
                    </label>
                    <select
                      name="role"
                      required
                      className="w-full px-4 py-3 border border-gray-200 font-mono text-sm focus:outline-none focus:border-aic-gold focus:ring-1 focus:ring-aic-gold transition-colors bg-white"
                    >
                      <option value="">Select your role</option>
                      <option value="cto">CTO / Technical Lead</option>
                      <option value="cfo">CFO / Finance</option>
                      <option value="compliance">Compliance / Legal</option>
                      <option value="ceo">CEO / Founder</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Number of AI Systems
                    </label>
                    <select
                      name="ai-systems"
                      required
                      className="w-full px-4 py-3 border border-gray-200 font-mono text-sm focus:outline-none focus:border-aic-gold focus:ring-1 focus:ring-aic-gold transition-colors bg-white"
                    >
                      <option value="">Select</option>
                      <option value="1-2">1-2 systems</option>
                      <option value="3-5">3-5 systems</option>
                      <option value="6+">6+ systems</option>
                      <option value="planning">Planning to deploy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Briefly describe your AI use case
                    </label>
                    <textarea
                      name="use-case"
                      required
                      rows={4}
                      placeholder="e.g., Credit scoring, hiring recommendations, claims processing..."
                      className="w-full px-4 py-3 border border-gray-200 font-mono text-sm focus:outline-none focus:border-aic-gold focus:ring-1 focus:ring-aic-gold transition-colors resize-none"
                    />
                  </div>

                  {/* Pricing Acknowledgment */}
                  <div className="flex items-start gap-3 p-4 bg-aic-paper">
                    <input
                      type="checkbox"
                      id="pricing-ack"
                      required
                      className="mt-1 h-4 w-4 border-gray-300 text-aic-gold focus:ring-aic-gold"
                    />
                    <label htmlFor="pricing-ack" className="font-serif text-sm text-gray-700">
                      I understand this is a paid program starting at R50,000 and am authorized to make purchasing decisions for my organization.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-aic-black text-white py-4 font-mono text-sm font-semibold uppercase tracking-wider hover:bg-aic-red transition-colors disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <a href="/" className="font-serif text-xl font-bold text-aic-black">
              AIC<span className="text-aic-gold">.</span>
            </a>
            <p className="font-mono text-xs text-gray-400">
              © 2026 AI Integrity Certification. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
