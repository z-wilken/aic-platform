import Navbar from '../components/Navbar';
import AssessmentQuiz from '../components/AssessmentQuiz';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AIC | Risk Assessment - Calculate Your Integrity Score",
  description: "Take the 30-second assessment to see where your AI system fits within the South African accountability framework.",
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-aic-black sm:text-6xl">
              What's Your Risk Tier?
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
              Take this 30-second assessment to see where your AI system fits within the South African accountability framework.
            </p>
          </div>
          <AssessmentQuiz />
        </div>
      </div>
    </main>
  );
}
