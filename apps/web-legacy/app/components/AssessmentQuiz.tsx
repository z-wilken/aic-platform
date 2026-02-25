'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '@/app/data/questions';
import { calculateAssessmentResult } from '@/lib/scoring';
import { generatePDFReport } from '@/lib/report-generator';
import * as analytics from '@/lib/analytics';

export default function AssessmentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);

  useEffect(() => {
    analytics.trackAssessmentStart();
  }, []);

  const EMAIL_GATE_INDEX = 14; 

  const handleAnswer = (score: number) => {
    const questionId = questions[currentStep].id;
    analytics.trackAssessmentAnswer(questionId);
    
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
      analytics.trackAssessmentComplete(calculateAssessmentResult(newAnswers).tier.name);
    }
  };

  const result = calculateAssessmentResult(answers);

  const handleGateSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setShowEmailGate(false);
      analytics.trackEmailCaptured('assessment');
      
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

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  if (showEmailGate) {
      return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white p-12 shadow-2xl border border-aic-black/5"
        >
            <div className="text-center mb-8">
                <span className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.3em]">
                    Mid-Audit Checkpoint
                </span>
                <h3 className="font-serif text-3xl font-medium mt-4">Generate Your Preliminary Report</h3>
            </div>
            
            <form onSubmit={handleGateSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Work Email</label>
                    <input 
                        type="email" 
                        required 
                        className="w-full border-b border-aic-black/10 py-3 focus:border-aic-gold outline-none font-serif text-lg transition-colors"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Organization</label>
                    <input 
                        type="text" 
                        className="w-full border-b border-aic-black/10 py-3 focus:border-aic-gold outline-none font-serif text-lg transition-colors"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full bg-aic-black text-white py-4 font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-aic-gold transition-colors">
                    Continue & View Score
                </button>
            </form>
            <button onClick={() => setShowEmailGate(false)} className="w-full mt-6 text-[10px] font-mono text-gray-400 uppercase tracking-widest hover:text-aic-black transition-colors underline underline-offset-4">
                Skip for now
            </button>
        </motion.div>
      );
  }

  return (
    <div className="max-w-3xl mx-auto min-h-[500px]">
      {!showResult ? (
        <div className="relative">
          <div className="mb-12 flex items-center justify-between border-b border-aic-black/5 pb-6">
            <div className="flex items-center gap-4">
                {currentStep > 0 && (
                    <button 
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="text-[10px] font-mono font-bold text-gray-400 hover:text-aic-black transition-colors uppercase tracking-widest"
                    >
                        ← Back
                    </button>
                )}
                <span 
                    id="question-counter"
                    className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em]"
                >
                Question {currentStep + 1} / {questions.length}
                </span>
            </div>
            <div className="flex gap-1">
                {questions.map((_, i) => (
                    <div key={i} className={`h-1 w-4 transition-colors ${i <= currentStep ? 'bg-aic-black' : 'bg-aic-black/5'}`} />
                ))}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                variants={slideVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
                <div className="mb-4">
                    <span className="text-[10px] font-bold text-aic-gold font-mono uppercase tracking-[0.2em]">
                        {questions[currentStep].category}
                    </span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl font-medium text-aic-black mb-12 leading-tight">
                    {questions[currentStep].text}
                </h3>

                <div className="space-y-3">
                    {questions[currentStep].options.map((option, idx) => (
                    <motion.button
                        key={idx}
                        whileHover={{ x: 10 }}
                        onClick={() => handleAnswer(option.score)}
                        className="w-full text-left p-6 border border-aic-black/5 flex items-center justify-between group hover:border-aic-black transition-all"
                    >
                        <span className="font-mono text-sm text-gray-600 group-hover:text-aic-black">{option.label}</span>
                        <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </motion.button>
                    ))}
                </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <h3 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-8">
                Assessment Complete
            </h3>
            
            <div className="mb-12">
                <div className="text-8xl font-serif font-medium text-aic-black leading-none">{result.integrityScore}</div>
                <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mt-4">Integrity Score</p>
            </div>

            <div className="bg-white border border-aic-black/5 p-12 text-left mb-12 shadow-xl">
                <div className={`text-[10px] font-mono font-bold ${result.tier.color} uppercase tracking-[0.3em] mb-4`}>
                    Classification
                </div>
                <h2 className="font-serif text-4xl font-medium mb-6">
                    {result.tier.name}: {result.tier.title}
                </h2>
                <p className="font-serif text-lg text-gray-500 leading-relaxed italic mb-8">
                    &quot;{result.tier.desc}&quot;
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-aic-black/5">
                    <button 
                        onClick={handleDownload}
                        disabled={isSubmitting}
                        className="flex items-center justify-between border-b-2 border-aic-black py-4 font-mono text-xs font-bold uppercase tracking-widest hover:text-aic-gold hover:border-aic-gold transition-colors"
                    >
                        <span>{isSubmitting ? 'Generating...' : 'Download PDF Report'}</span>
                        <span>↓</span>
                    </button>
                    <a 
                        href="/alpha" 
                        className="flex items-center justify-between border-b-2 border-aic-black py-4 font-mono text-xs font-bold uppercase tracking-widest hover:text-aic-red hover:border-aic-red transition-colors"
                    >
                        <span>Join Alpha Cohort</span>
                        <span>→</span>
                    </a>
                </div>
            </div>

            <a href="/contact" className="inline-block text-[10px] font-mono font-bold text-gray-400 hover:text-aic-black transition-colors uppercase tracking-[0.2em] border-b border-gray-200 hover:border-aic-black pb-1">
                Schedule Lead Auditor Consultation
            </a>
        </motion.div>
      )}
    </div>
  );
}
