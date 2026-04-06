"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function WaitlistForm() {
  const [type, setType] = useState<"pulse" | "partner" | "both">("pulse");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-aic-navy/10 p-12 text-center space-y-8">
        <div className="w-20 h-20 bg-aic-copper/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-aic-copper" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-heading font-bold text-aic-navy">Application Sent</h2>
          <p className="text-aic-navy/60 font-sans max-w-md mx-auto">
            Thank you for your interest. We review applications for the Founding Partner Programme and Pulse Early Access every Tuesday. You will hear from us shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-aic-navy/10 p-8 lg:p-12 shadow-2xl space-y-10">
      <div className="space-y-6">
        <label className="block text-sm font-mono uppercase tracking-widest text-aic-navy/40">I am interested in</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: "pulse", label: "Pulse Early Access" },
            { id: "partner", label: "Founding Partner" },
            { id: "both", label: "Both" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setType(opt.id as any)}
              className={`p-4 text-center border-2 transition-all font-sans text-sm font-bold ${
                type === opt.id ? "border-aic-copper bg-aic-copper/5" : "border-aic-navy/5 hover:border-aic-navy/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-aic-navy/40">Full Name</label>
          <input required type="text" className="w-full p-4 border-2 border-aic-navy/5 font-sans focus:border-aic-copper outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-aic-navy/40">Work Email</label>
          <input required type="email" className="w-full p-4 border-2 border-aic-navy/5 font-sans focus:border-aic-copper outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-aic-navy/40">Company</label>
          <input required type="text" className="w-full p-4 border-2 border-aic-navy/5 font-sans focus:border-aic-copper outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-aic-navy/40">Job Title</label>
          <input required type="text" className="w-full p-4 border-2 border-aic-navy/5 font-sans focus:border-aic-copper outline-none" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-widest text-aic-navy/40">Tell us about your AI systems</label>
        <textarea required className="w-full p-4 border-2 border-aic-navy/5 font-sans h-32 focus:border-aic-copper outline-none" placeholder="What decisions does your AI make? Which division do you think you fall into?"></textarea>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-aic-navy text-white py-5 font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-aic-copper transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
