'use client';

import { useState } from 'react';
import { trackContactForm } from '../lib/analytics';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple honeypot check
    const formData = new FormData(e.currentTarget);
    if (formData.get('bot-field')) {
        return; // Bot detected
    }

    setIsLoading(true);
    trackContactForm(formData.get('subject') as string);
    
    // D-10: For MVP, we simulate or use Formspree. 
    // Since we don't have a Formspree ID yet, we'll simulate success.
    // In production, you'd fetch("https://formspree.io/f/your-id", { method: "POST", body: formData })
    
    setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
      return (
          <div className="bg-white p-12 rounded-2xl text-center animate-in fade-in zoom-in duration-500 border border-gray-100 shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-aic-navy font-serif italic">Inquiry Received</h3>
            <p className="mt-4 text-lg text-gray-600 font-serif">
              "Trust but verify." <br/>
              A lead auditor will respond to your inquiry within 24 hours.
            </p>
            <div className="mt-10">
              <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-aic-navy font-mono hover:text-aic-copper transition-colors uppercase tracking-widest border-b-2 border-aic-navy hover:border-aic-copper">
                Return to Homepage <ArrowRight className="w-4 h-4" />
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
          <label htmlFor="name" className="block text-xs font-bold leading-6 text-aic-navy font-mono uppercase tracking-widest">Full Name</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="name" 
              id="name" 
              required 
              placeholder="e.g. John Doe"
              className="block w-full rounded-lg border-gray-200 bg-aic-paper/50 px-4 py-3 text-aic-navy shadow-sm focus:ring-2 focus:ring-aic-copper/50 focus:border-aic-copper transition-all font-sans" 
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-bold leading-6 text-aic-navy font-mono uppercase tracking-widest">Work Email Address</label>
          <div className="mt-2">
            <input 
              type="email" 
              name="email" 
              id="email" 
              required 
              placeholder="john@company.co.za"
              className="block w-full rounded-lg border-gray-200 bg-aic-paper/50 px-4 py-3 text-aic-navy shadow-sm focus:ring-2 focus:ring-aic-copper/50 focus:border-aic-copper transition-all font-sans" 
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-xs font-bold leading-6 text-aic-navy font-mono uppercase tracking-widest">Subject</label>
          <div className="mt-2">
            <select 
              id="subject" 
              name="subject" 
              className="block w-full rounded-lg border-gray-200 bg-aic-paper/50 px-4 py-3 text-aic-navy shadow-sm focus:ring-2 focus:ring-aic-copper/50 focus:border-aic-copper transition-all font-sans appearance-none"
            >
              <option>General Inquiry</option>
              <option>Founding Partner Program</option>
              <option>Partnership Proposal</option>
              <option>Regulatory Compliance (POPIA)</option>
              <option>Media Inquiry</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-xs font-bold leading-6 text-aic-navy font-mono uppercase tracking-widest">Message</label>
          <div className="mt-2">
            <textarea 
              name="message" 
              id="message" 
              rows={4} 
              required 
              placeholder="How can we help your organization remain human-accountable?"
              className="block w-full rounded-lg border-gray-200 bg-aic-paper/50 px-4 py-3 text-aic-navy shadow-sm focus:ring-2 focus:ring-aic-copper/50 focus:border-aic-copper transition-all font-sans"
            ></textarea>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center items-center gap-2 rounded-lg bg-aic-navy px-4 py-4 text-center text-sm font-bold text-white shadow-lg hover:bg-aic-navy-mid focus:ring-4 focus:ring-aic-navy/20 font-mono uppercase tracking-widest transition-all disabled:opacity-70"
          >
            {isLoading ? 'TRANSMITTING...' : 'SEND INQUIRY'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
    </form>
  );
}
