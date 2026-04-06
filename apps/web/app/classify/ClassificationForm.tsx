"use client";

import { useState } from "react";
import { Check, ArrowRight, Loader2 } from "lucide-react";

export default function ClassificationForm() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const getResult = () => {
    if (answers.q1 === "No" || answers.q2 === "Not applicable") return 1;
    if (answers.q1 === "We build AI products" || answers.q2 === "We build/sell AI products") return 5;
    if (answers.q2 === "AI recommends, human decides") return 2;
    if (answers.q2 === "AI decides, humans review some cases") return 3;
    if (answers.q2 === "AI operates, systems monitor performance") return 4;
    return 2; // Default
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    const division = getResult();
    return (
      <div className="bg-white border border-aic-navy/10 p-12 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-aic-copper/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-aic-copper" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-heading font-bold text-aic-navy">Assessment Received</h2>
          <p className="text-aic-navy/60 font-sans max-w-md mx-auto">
            Based on your responses, your organisation is likely in <strong>Division {division}</strong>. We have sent a detailed breakdown and next steps to your email.
          </p>
        </div>
        <div className="pt-4">
          <button 
            onClick={() => window.location.href = "/"}
            className="text-aic-navy font-bold uppercase tracking-widest text-sm border-b-2 border-aic-copper pb-1"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-aic-navy/10 shadow-2xl overflow-hidden">
      <div className="bg-aic-navy px-8 py-4 flex justify-between items-center">
        <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Classification Assessment</span>
        <span className="text-aic-copper text-[10px] font-mono uppercase tracking-widest">Step {step} of 2</span>
      </div>

      <form onSubmit={handleSubmit} className="p-8 lg:p-12">
        {step === 1 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-6">
              <label className="block text-xl font-heading font-bold text-aic-navy">
                1. Does your organisation use any form of AI, machine learning, or automated decision-making in any operational process?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Yes", "No", "We build AI products", "We're not sure"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAnswer("q1", opt)}
                    className={`p-4 text-left border-2 transition-all font-sans ${
                      answers.q1 === opt ? "border-aic-copper bg-aic-copper/5" : "border-aic-navy/5 hover:border-aic-navy/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label className="block text-xl font-heading font-bold text-aic-navy">
                2. When AI is involved in a decision, what role does it play?
              </label>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "AI recommends, human decides",
                  "AI decides, humans review some cases",
                  "AI operates, systems monitor performance",
                  "We build/sell AI products",
                  "Not applicable — we don't use AI"
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAnswer("q2", opt)}
                    className={`p-4 text-left border-2 transition-all font-sans ${
                      answers.q2 === opt ? "border-aic-copper bg-aic-copper/5" : "border-aic-navy/5 hover:border-aic-navy/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label className="block text-xl font-heading font-bold text-aic-navy">
                3. Which industry are you in?
              </label>
              <select 
                onChange={(e) => handleAnswer("q3", e.target.value)}
                className="w-full p-4 border-2 border-aic-navy/5 font-sans focus:border-aic-copper outline-none transition-colors"
                defaultValue=""
              >
                <option value="" disabled>Select industry...</option>
                {["Financial Services", "Insurance", "Healthcare", "HR & Recruitment", "Legal", "Retail/E-commerce", "Technology", "Government/Public Sector", "Other"].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end pt-8">
              <button
                type="button"
                onClick={nextStep}
                disabled={!answers.q1 || !answers.q2 || !answers.q3}
                className="bg-aic-navy text-white px-10 py-4 font-bold uppercase tracking-widest flex items-center gap-3 disabled:opacity-50 hover:bg-aic-copper transition-all"
              >
                Next Step <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="space-y-6">
              <label className="block text-xl font-heading font-bold text-aic-navy">
                4. How many employees does your organisation have?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["1–50", "51–250", "251–1,000", "1,001–5,000", "5,000+"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAnswer("q4", opt)}
                    className={`p-4 text-center border-2 transition-all font-sans ${
                      answers.q4 === opt ? "border-aic-copper bg-aic-copper/5" : "border-aic-navy/5 hover:border-aic-navy/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xl font-heading font-bold text-aic-navy">5. Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required type="text" placeholder="Full Name" className="p-4 border-2 border-aic-navy/5 font-sans focus:border-aic-copper outline-none" />
                <input required type="text" placeholder="Job Title" className="p-4 border-2 border-aic-navy/5 font-sans focus:border-aic-copper outline-none" />
                <input required type="text" placeholder="Company Name" className="p-4 border-2 border-aic-navy/5 font-sans focus:border-aic-copper outline-none" />
                <input required type="email" placeholder="Work Email" className="p-4 border-2 border-aic-navy/5 font-sans focus:border-aic-copper outline-none" />
              </div>
              <textarea 
                placeholder="Tell us briefly about your AI systems (optional)"
                className="w-full p-4 border-2 border-aic-navy/5 font-sans h-32 focus:border-aic-copper outline-none"
              ></textarea>
            </div>

            <div className="pt-8 space-y-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-aic-copper text-aic-navy py-5 font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-aic-copper/90 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Send me my Division assessment"}
              </button>
              <p className="text-[11px] text-aic-navy/40 font-sans text-center">
                AIC will review your responses and confirm your Division classification within 5 business days. This is not a sales call unless you want it to be.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
