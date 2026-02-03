import Navbar from '../components/Navbar';
import AlphaForm from '../components/AlphaForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AIC | Alpha Program - Cohort 1 Application",
  description: "Join the pioneer organizations establishing the South African standard for human accountability in AI.",
};

export default function AlphaPage() {
  return (
    <main className="min-h-screen bg-aic-bg text-aic-black">
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-24 sm:py-32">
            <div className="text-center animate-in slide-in-from-bottom-4 duration-700">
                <div className="mb-6 flex justify-center">
                    <span className="inline-flex items-center rounded-full bg-aic-black/5 px-3 py-1 text-xs font-medium text-aic-black ring-1 ring-inset ring-aic-black/10 font-mono tracking-wider uppercase">
                    COHORT 1: OPEN
                    </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-aic-black sm:text-6xl font-serif">
                The Alpha Program
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 font-serif max-w-2xl mx-auto">
                We are selecting 10 pioneer South African organizations to establish the AIC accountability standard. Participants receive early access to our framework and help shape the future of algorithmic governance.
                </p>
            </div>

            {/* Program Details */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-6 border border-gray-200 rounded-2xl">
                    <h3 className="font-mono text-xs font-bold text-aic-gold uppercase tracking-widest mb-4">Duration</h3>
                    <p className="font-serif text-xl font-bold">6 Months</p>
                    <p className="mt-2 text-sm text-gray-500 font-serif">Intensive gap analysis, remediation support, and certification validation.</p>
                </div>
                <div className="glass-card p-6 border border-gray-200 rounded-2xl">
                    <h3 className="font-mono text-xs font-bold text-aic-gold uppercase tracking-widest mb-4">Pilot Pricing</h3>
                    <p className="font-serif text-xl font-bold">R60k - R120k</p>
                    <p className="mt-2 text-sm text-gray-500 font-serif">50% discount for Alpha participants. Based on organization size and AI complexity.</p>
                </div>
                <div className="glass-card p-6 border border-gray-200 rounded-2xl">
                    <h3 className="font-mono text-xs font-bold text-aic-gold uppercase tracking-widest mb-4">Benefits</h3>
                    <p className="font-serif text-xl font-bold">Early Adopter</p>
                    <p className="mt-2 text-sm text-gray-500 font-serif">Free upgrade to SANAS-accredited certification upon official launch.</p>
                </div>
            </div>

            <AlphaForm />
        </div>
      </div>
    </main>
  );
}