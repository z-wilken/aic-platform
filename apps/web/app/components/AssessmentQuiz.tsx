'use client';

import { useState } from 'react';

type Question = {
  id: number;
  text: string;
  options: { label: string; score: number }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "What is the primary function of your AI system?",
    options: [
      { label: "High-stakes decision making (e.g., Credit, Hiring, Health)", score: 3 },
      { label: "Personalization or Customer Service", score: 2 },
      { label: "Internal automation or Sorting", score: 1 },
    ],
  },
  {
    id: 2,
    text: "Does the system process special personal information (children, health, political views)?",
    options: [
      { label: "Yes, heavily.", score: 3 },
      { label: "Yes, but incidental.", score: 2 },
      { label: "No.", score: 1 },
    ],
  },
  {
    id: 3,
    text: "Is there a human in the loop for every final decision?",
    options: [
      { label: "No, it is fully automated.", score: 3 },
      { label: "Yes, mostly, but some are automated.", score: 2 },
      { label: "Yes, strict human review required.", score: 1 },
    ],
  },
];

export default function AssessmentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setEmailSent(true);
    }, 1500);
  };

  const getTier = () => {
    if (score >= 8) return { name: 'Tier 1', color: 'text-aic-red', title: 'Critical Risk' };
    if (score >= 5) return { name: 'Tier 2', color: 'text-aic-orange', title: 'Elevated Risk' };
    return { name: 'Tier 3', color: 'text-aic-green', title: 'Standard Risk' };
  };

  const result = getTier();

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
                <div className={`absolute inset-0 blur-3xl opacity-20 ${result.color.replace('text-', 'bg-')}`}></div>
                <h2 className={`font-serif text-6xl font-bold mb-2 ${result.color} relative`}>
                    {result.name}
                </h2>
                <p className="font-serif text-2xl text-aic-black relative">
                    {result.title}
                </p>
            </div>

            <p className="text-gray-600 mb-8 max-w-md mx-auto font-serif text-lg leading-relaxed">
                Based on your answers, your system likely falls under {result.name} of the POPIA Section 71 accountability framework.
            </p>

            {!emailSent ? (
                <div className="bg-white/40 backdrop-blur-sm p-6 mb-8 text-left rounded-xl border border-white/60 shadow-inner">
                    <label className="block text-xs font-bold text-gray-500 uppercase font-mono mb-3">
                        Get your full compliance report
                    </label>
                    <form onSubmit={handleEmailSubmit} className="flex gap-2">
                        <input 
                            type="email" 
                            placeholder="work@email.com"
                            required
                            className="flex-1 border-0 rounded-lg py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6 bg-white/80"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-aic-black text-white px-6 py-2.5 rounded-lg font-mono text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-wait"
                        >
                            {isSubmitting ? 'SENDING...' : 'SEND REPORT'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-green-50/50 p-6 mb-8 rounded-xl border border-green-200/50 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-green-800 font-bold font-serif">Report Sent!</p>
                    <p className="text-green-600 text-sm">Check your inbox for the PDF.</p>
                </div>
            )}
            
            <a href="/alpha" className="inline-flex items-center text-sm font-semibold leading-6 text-gray-900 font-mono hover:text-aic-gold transition-colors group">
                Apply for Alpha Certification <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
        </div>
      )}
    </div>
  );
}
