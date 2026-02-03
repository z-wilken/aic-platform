'use client';

import { useState } from 'react';
import { questions } from '../data/questions';
import { calculateAssessmentResult, AssessmentResult } from '../../lib/scoring';
import { generatePDFReport } from '../../lib/report-generator';

export default function AssessmentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);

  // Constants
  const EMAIL_GATE_INDEX = 14; 

  const handleAnswer = (score: number) => {
    const questionId = questions[currentStep].id;
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    
    if (currentStep === EMAIL_GATE_INDEX && !email) {
        setShowEmailGate(true);
        return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const result = calculateAssessmentResult(answers);

  const handleGateSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setShowEmailGate(false);
      
      // Submit lead data
      try {
          await fetch('/api/assessment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  email,
                  score: result.integrityScore,
                  tier: result.tier.name,
                  answers: answers
              })
          });
      } catch (err) {
          console.error("Transmission failed", err);
      }

      if (currentStep < questions.length - 1) {
          setCurrentStep(currentStep + 1);
      }
  };

  const handleDownload = async () => {
      setIsSubmitting(true);
      await generatePDFReport(result, company || 'Your Organization');
      setIsSubmitting(false);
  };

  if (showEmailGate) {
      return (
        <div className="glass-card p-8 rounded-2xl max-w-lg mx-auto mt-12 text-center animate-in fade-in zoom-in">
            <div className="mb-6">
                <span className="inline-flex items-center rounded-full bg-aic-gold/10 px-3 py-1 text-xs font-bold text-aic-gold ring-1 ring-inset ring-aic-gold/20 font-mono uppercase tracking-wider">
                    Tier {result.integrityScore < 50 ? '1' : result.integrityScore < 80 ? '2' : '3'} Detected
                </span>
            </div>
            <h3 className="font-serif text-2xl font-bold mb-4">Unlock Your Full Report</h3>
            <p className="text-gray-600 mb-6 font-serif">You are halfway through. To generate your custom Integrity Score and detailed PDF recommendation, we need a few details.</p>
            <form onSubmit={handleGateSubmit} className="space-y-4 text-left">
                <div>
                    <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-1">Work Email</label>
                    <input 
                        type="email" 
                        required 
                        placeholder="you@company.co.za" 
                        className="w-full border rounded-lg p-3 font-serif"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-1">Organization Name</label>
                    <input 
                        type="text" 
                        placeholder="Company Name (for the report)" 
                        className="w-full border rounded-lg p-3 font-serif"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full bg-aic-black text-white py-3 rounded-lg font-mono font-bold hover:bg-gray-800 transition-colors">
                    CONTINUE & GENERATE REPORT
                </button>
            </form>
            <button onClick={() => setShowEmailGate(false)} className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline font-mono uppercase tracking-widest">
                Skip (Show limited results)
            </button>
        </div>
      );
  }

  return (
    <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto mt-12 border border-white/40 shadow-xl relative overflow-hidden transition-all duration-500">
      {!showResult ? (
        <div>
          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
              Question {currentStep + 1} of {questions.length}
            </span>
            <div className="h-1 w-24 bg-gray-200/50 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-aic-black transition-all duration-500 ease-out" 
                 style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
               />
            </div>
          </div>
          
          <div className="mb-4">
              <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                  questions[currentStep].category === 'USAGE' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  questions[currentStep].category === 'OVERSIGHT' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                  'bg-gray-50 text-gray-600 border-gray-100'
              }`}>
                  {questions[currentStep].category}
              </span>
          </div>

          <h3 className="font-serif text-2xl font-medium text-aic-black mb-8 leading-snug">
            {questions[currentStep].text}
          </h3>

          <div className="space-y-4">
            {questions[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.score)}
                className="w-full text-left p-5 border border-gray-200/60 rounded-xl hover:border-aic-gold hover:bg-white/60 hover:shadow-md transition-all duration-200 font-mono text-sm text-gray-700 active:scale-[0.99]"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center animate-in fade-in zoom-in duration-500">
            <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                Assessment Complete
            </h3>
            
            <div className="mb-8 relative inline-block">
                <div className="text-6xl font-mono font-bold text-aic-black mb-2">{result.integrityScore}/100</div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Integrity Score</p>
            </div>

            <div className={`p-6 rounded-xl border mb-8 text-left ${result.tier.color.replace('text-', 'bg-').replace('500', '50')} ${result.tier.color.replace('text-', 'border-').replace('500', '200')}`}>
                <h2 className={`font-serif text-2xl font-bold mb-2 ${result.tier.color}`}>
                    {result.tier.name}: {result.tier.title}
                </h2>
                <p className="font-serif text-gray-700 text-sm leading-relaxed">
                    {result.tier.desc}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                    onClick={handleDownload}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 bg-white border-2 border-aic-black text-aic-black px-6 py-4 rounded-lg font-mono font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    {isSubmitting ? 'GENERATING...' : 'DOWNLOAD PDF'}
                </button>
                <a href="/alpha" className="flex items-center justify-center bg-aic-black text-white px-6 py-4 rounded-lg font-mono font-bold hover:bg-gray-800 transition-all">
                    JOIN ALPHA
                </a>
            </div>

            <div className="pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-mono uppercase tracking-widest mb-4">Recommended Next Step</p>
                <a href="/contact" className="text-sm font-bold text-aic-gold hover:text-yellow-600 transition-colors font-mono">
                    SCHEDULE A COMPLIANCE CONSULTATION &rarr;
                </a>
            </div>
        </div>
      )}
    </div>
  );
}