'use client';

import { useState } from 'react';
import { questions, categoryWeights, Category } from '../data/questions';
import Link from 'next/link';

export default function AssessmentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailGate, setShowEmailGate] = useState(false);

  // Email gate at question 15 (index 14) - 75% through
  const EMAIL_GATE_INDEX = 14;

  const handleAnswer = (score: number) => {
    const questionId = questions[currentStep].id;
    setAnswers(prev => ({ ...prev, [questionId]: score }));

    // Check if we should show email gate
    if (currentStep === EMAIL_GATE_INDEX && !email) {
      setShowEmailGate(true);
      return;
    }

    // Move to next question or show results
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  // Calculate weighted score by category
  const calculateWeightedScore = () => {
    const categoryScores: Record<Category, { total: number; max: number }> = {
      USAGE: { total: 0, max: 0 },
      OVERSIGHT: { total: 0, max: 0 },
      TRANSPARENCY: { total: 0, max: 0 },
      INFRASTRUCTURE: { total: 0, max: 0 },
    };

    questions.forEach((q) => {
      const maxScore = Math.max(...q.options.map(o => o.score));
      categoryScores[q.category].max += maxScore;
      if (answers[q.id] !== undefined) {
        categoryScores[q.category].total += answers[q.id];
      }
    });

    let weightedScore = 0;
    (Object.keys(categoryWeights) as Category[]).forEach((cat) => {
      const catScore = categoryScores[cat].max > 0
        ? (categoryScores[cat].total / categoryScores[cat].max)
        : 0;
      weightedScore += catScore * categoryWeights[cat];
    });

    return Math.round(weightedScore * 100);
  };

  const integrityScore = calculateWeightedScore();

  const getTier = () => {
    if (integrityScore < 40) {
      return {
        tier: 1,
        name: 'Tier 1: Human-Approved',
        level: 'CRITICAL',
        color: 'aic-red',
        desc: 'Your AI systems require mandatory human oversight for every decision. Critical gaps in accountability infrastructure.',
        action: 'Immediate certification recommended to establish compliance baseline.',
      };
    }
    if (integrityScore < 70) {
      return {
        tier: 2,
        name: 'Tier 2: Human-Supervised',
        level: 'ELEVATED',
        color: 'aic-gold',
        desc: 'Good foundation, but gaps in transparency and oversight processes need addressing.',
        action: 'Certification will help formalize your human oversight mechanisms.',
      };
    }
    return {
      tier: 3,
      name: 'Tier 3: Automated',
      level: 'STANDARD',
      color: 'aic-gray',
      desc: 'Strong accountability infrastructure in place. Your AI systems are well-governed.',
      action: 'Certification validates your compliance for stakeholders and regulators.',
    };
  };

  const result = getTier();

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowEmailGate(false);

    // Submit partial assessment data
    try {
      await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          answers,
          partialScore: integrityScore,
          questionsAnswered: Object.keys(answers).length,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Assessment submission failed', err);
    }

    // Continue to next question
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'USAGE': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'OVERSIGHT': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'TRANSPARENCY': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'INFRASTRUCTURE': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Email Gate Screen
  if (showEmailGate) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white p-10 shadow-xl">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-xs text-aic-gold uppercase tracking-wider">75% Complete</span>
            <div className="flex-1 mx-4 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-aic-gold" style={{ width: '75%' }} />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-aic-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-aic-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-aic-black mb-3">
              Unlock Your Full Report
            </h3>
            <p className="font-serif text-gray-600">
              You're almost there. Enter your email to receive your personalized Integrity Score
              and Tier Recommendation.
            </p>
          </div>

          <form onSubmit={handleGateSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Work Email
              </label>
              <input
                type="email"
                required
                placeholder="you@company.co.za"
                className="w-full px-4 py-3 border border-gray-200 font-mono text-sm focus:outline-none focus:border-aic-gold focus:ring-1 focus:ring-aic-gold transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-aic-black text-white py-4 font-mono text-sm font-semibold uppercase tracking-wider hover:bg-aic-red transition-colors"
            >
              Continue Assessment
            </button>
          </form>

          <button
            onClick={() => {
              setShowEmailGate(false);
              if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="w-full mt-4 text-xs text-gray-400 hover:text-gray-600 font-mono uppercase tracking-wider"
          >
            Skip for now
          </button>

          <p className="mt-6 text-xs text-gray-400 text-center font-mono">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-10 lg:p-12 shadow-xl">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-aic-gold uppercase tracking-wider mb-4">
              <span className="w-6 h-px bg-aic-gold" />
              Assessment Complete
              <span className="w-6 h-px bg-aic-gold" />
            </span>
            <h2 className="font-serif text-3xl font-bold text-aic-black">
              Your AI Integrity Report
            </h2>
          </div>

          {/* Score Display */}
          <div className="text-center mb-10">
            <div className="relative inline-block">
              <div className={`text-7xl lg:text-8xl font-mono font-bold text-${result.color}`}>
                {integrityScore}
              </div>
              <div className="absolute -right-8 top-0 text-2xl font-mono text-gray-300">/100</div>
            </div>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-wider mt-2">
              Integrity Score
            </p>
          </div>

          {/* Tier Result */}
          <div className={`p-8 border-l-4 border-${result.color} bg-${result.color}/5 mb-8`}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`w-3 h-3 rounded-full bg-${result.color}`} />
              <span className={`font-mono text-xs font-bold text-${result.color} uppercase tracking-wider`}>
                {result.level} RISK
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-aic-black mb-3">
              {result.name}
            </h3>
            <p className="font-serif text-gray-600 leading-relaxed mb-4">
              {result.desc}
            </p>
            <p className="font-mono text-sm text-aic-black font-medium">
              {result.action}
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="mb-10">
            <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Score by Category
            </h4>
            <div className="space-y-3">
              {(Object.keys(categoryWeights) as Category[]).map((cat) => {
                const catQuestions = questions.filter(q => q.category === cat);
                const catMax = catQuestions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0);
                const catScore = catQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
                const percentage = catMax > 0 ? Math.round((catScore / catMax) * 100) : 0;

                return (
                  <div key={cat} className="flex items-center gap-4">
                    <span className="font-mono text-xs text-gray-500 w-28 uppercase">{cat}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          percentage >= 70 ? 'bg-aic-gray' :
                          percentage >= 40 ? 'bg-aic-gold' : 'bg-aic-red'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="font-mono text-sm font-semibold w-12 text-right">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/alpha"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-aic-black text-white px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wider hover:bg-aic-red transition-colors"
            >
              Apply for Certification
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button
              onClick={() => {
                setCurrentStep(0);
                setAnswers({});
                setShowResult(false);
              }}
              className="px-8 py-4 border border-gray-200 font-mono text-sm font-semibold uppercase tracking-wider text-gray-600 hover:border-aic-black hover:text-aic-black transition-colors"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question Screen
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 lg:p-10 shadow-xl">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
            Question {currentStep + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-3">
            <div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-aic-black transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-gray-400">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-6">
          <span className={`inline-flex px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border ${getCategoryColor(currentQuestion.category)}`}>
            {currentQuestion.category}
          </span>
        </div>

        {/* Question */}
        <h3 className="font-serif text-2xl lg:text-3xl font-medium text-aic-black mb-8 leading-snug">
          {currentQuestion.text}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.score)}
              className="w-full text-left p-5 border border-gray-200 hover:border-aic-gold hover:bg-aic-gold/5 transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 group-hover:border-aic-gold group-hover:bg-aic-gold/20 transition-colors flex items-center justify-center">
                  <span className="font-mono text-xs text-gray-400 group-hover:text-aic-gold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                </span>
                <span className="font-serif text-gray-700 group-hover:text-aic-black transition-colors">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation hint */}
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mt-6 font-mono text-xs text-gray-400 hover:text-gray-600 uppercase tracking-wider"
          >
            ← Previous question
          </button>
        )}
      </div>
    </div>
  );
}
