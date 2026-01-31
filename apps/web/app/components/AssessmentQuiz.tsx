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

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getTier = () => {
    if (score >= 8) return { name: 'Tier 1', color: 'text-aic-red', title: 'Critical Risk' };
    if (score >= 5) return { name: 'Tier 2', color: 'text-aic-orange', title: 'Elevated Risk' };
    return { name: 'Tier 3', color: 'text-aic-green', title: 'Standard Risk' };
  };

  const result = getTier();

  return (
    <div className="bg-white p-8 shadow-lg ring-1 ring-gray-900/5 max-w-2xl mx-auto mt-12 border-t-4 border-aic-black">
      {!showResult ? (
        <div>
          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
              Question {currentStep + 1} of {questions.length}
            </span>
            <div className="h-1 w-24 bg-gray-200">
               <div 
                 className="h-1 bg-aic-black transition-all duration-300" 
                 style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
               />
            </div>
          </div>
          
          <h3 className="font-serif text-2xl font-medium text-aic-black mb-8">
            {questions[currentStep].text}
          </h3>

          <div className="space-y-4">
            {questions[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.score)}
                className="w-full text-left p-4 border border-gray-200 hover:border-aic-gold hover:bg-aic-bg transition-colors font-mono text-sm text-gray-700"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
            <h3 className="font-mono text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                Assessment Complete
            </h3>
            <h2 className={`font-serif text-5xl font-bold mb-4 ${result.color}`}>
                {result.name}
            </h2>
            <p className="font-serif text-2xl text-aic-black mb-6">
                {result.title}
            </p>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Based on your answers, your system likely falls under {result.name} of the POPIA Section 71 accountability framework.
            </p>

            <div className="bg-aic-bg p-6 mb-8 text-left">
                <label className="block text-xs font-bold text-gray-900 uppercase font-mono mb-2">
                    Get your full compliance report
                </label>
                <div className="flex gap-2">
                    <input 
                        type="email" 
                        placeholder="work@email.com"
                        className="flex-1 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aic-black sm:text-sm sm:leading-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="bg-aic-black text-white px-4 py-2 font-mono text-sm font-medium hover:bg-gray-800">
                        SEND REPORT
                    </button>
                </div>
            </div>
            
            <a href="/alpha" className="text-sm font-semibold leading-6 text-gray-900 font-mono underline hover:text-aic-gold">
                Apply for Alpha Certification &rarr;
            </a>
        </div>
      )}
    </div>
  );
}
