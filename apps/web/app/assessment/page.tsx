import { Metadata } from 'next';
import ClientAssessment from './ClientAssessment';

export const metadata: Metadata = {
  title: "AIC | Risk Assessment - Calculate Your Integrity Score",
  description: "Take the 30-second assessment to see where your AI system fits within the South African accountability framework.",
};

export default function AssessmentPage() {
  return <ClientAssessment />;
}
