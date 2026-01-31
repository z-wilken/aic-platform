'use client';

import { useState } from 'react';
import { questions, Option } from '../data/questions';

export default function AssessmentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);

  // Constants
  const EMAIL_GATE_INDEX = 5; // Simulating gate early for demo (normally Q15)

  const handleAnswer = (score: number) => {
    const questionId = questions[currentStep].id;
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    
    if (currentStep === EMAIL_GATE_INDEX && !email) {
        setShowEmailGate(true);
        return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults();
    }
  };

  const handleGateSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setShowEmailGate(false);
      if (currentStep < questions.length - 1) {
          setCurrentStep(currentStep + 1);
      }
  };

  const calculateResults = () => {
      setShowResult(true);
  };

  const getScore = () => {
      // Simple aggregation for MVP - usually this would use the weighted formula
      const totalPossible = questions.length * 4;
      const currentScore = Object.values(answers).reduce((a, b) => a + b, 0);
      return Math.round((currentScore / totalPossible) * 100);
  };

  const integrityScore = getScore();

  const getTier = () => {
    // Logic: Low Oversight + High Risk = Tier 1
    // Logic: High Oversight + Low Risk = Tier 3
    if (integrityScore < 50) return { name: 'Tier 1', color: 'text-aic-red', title: 'Critical Risk', desc: 'Your infrastructure does not match your risk profile.' };
    if (integrityScore < 80) return { name: 'Tier 2', color: 'text-aic-orange', title: 'Elevated Risk', desc: 'Good foundation, but gaps in transparency.' };
    return { name: 'Tier 3', color: 'text-aic-green', title: 'Standard Risk', desc: 'You are likely compliant for low-stakes AI.' };
  };

  const result = getTier();

  if (showEmailGate) {
      return (
        <div className="glass-card p-8 rounded-2xl max-w-lg mx-auto mt-12 text-center animate-in fade-in zoom-in">
            <h3 className="font-serif text-2xl font-bold mb-4">Unlock Your Full Report</h3>
            <p className="text-gray-600 mb-6 font-serif">You are halfway through. To generate your custom Integrity Score and Tier Recommendation, we need to know where to send the PDF.</p>
            <form onSubmit={handleGateSubmit} className="space-y-4">
                <input 
                    type="email" 
                    required 
                    placeholder="work@email.com" 
                    className="w-full border rounded-lg p-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="w-full bg-aic-black text-white py-3 rounded-lg font-mono font-bold hover:bg-gray-800">
                    CONTINUE ASSESSMENT
                </button>
            </form>
            <button onClick={() => setShowEmailGate(false)} className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline">
                Skip (Show partial results only)
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
                <div className="text-6xl font-mono font-bold text-aic-black mb-2">{integrityScore}/100</div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Integrity Score</p>
            </div>

            <div className={`p-6 rounded-xl border mb-8 ${result.color.replace('text-', 'bg-').replace('500', '50')} ${result.color.replace('text-', 'border-').replace('500', '200')}`}>
                <h2 className={`font-serif text-3xl font-bold mb-2 ${result.color}`}>
                    {result.name}: {result.title}
                </h2>
                <p className="font-serif text-gray-700">
                    {result.desc}
                </p>
            </div>

            <a href="/alpha" className="inline-block bg-aic-black text-white px-8 py-4 rounded-lg font-mono font-bold hover:bg-aic-gold hover:text-black transition-all">
                APPLY FOR CERTIFICATION
            </a>
        </div>
      )}
    </div>
  );
}
