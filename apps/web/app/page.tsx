import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TierFramework from './components/TierFramework';
import ProblemStatement from './components/ProblemStatement';
import AlphaPreview from './components/AlphaPreview';
import SectorsSection from './components/Sectors';
import PulseHighlight from './components/PulseHighlight';
import { Metadata } from 'next';
import Link from 'next/link';
import { InstitutionalFooter } from '@aic/ui';

export const metadata: Metadata = {
  title: "AIC | Home - AI Integrity Certification",
  description: "The definitive trust infrastructure for sovereign AI governance. POPIA Section 71 & ISO/IEC 42001 Compliance Framework.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      <HeroSection />
      
      {/* Audience Routing Section */}
      <section className="bg-aic-black py-24 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
                <Link href="/citizens" className="bg-aic-black p-16 group hover:bg-white transition-all duration-500">
                    <span className="font-mono text-[10px] font-bold text-aic-red uppercase tracking-[0.4em] mb-8 block group-hover:text-aic-red transition-colors">Path 01</span>
                    <h3 className="font-serif text-4xl text-white group-hover:text-aic-black transition-colors mb-6">For the Public</h3>
                    <p className="text-gray-500 group-hover:text-gray-600 transition-colors font-serif text-lg leading-relaxed mb-12">
                        Understand your algorithmic rights, report accountability concerns, and search our public registry of certified organizations.
                    </p>
                    <span className="font-mono text-[10px] font-bold text-white group-hover:text-aic-black border-b border-white/20 group-hover:border-aic-black pb-2 transition-all uppercase tracking-widest">
                        Know Your Rights →
                    </span>
                </Link>

                <Link href="/business" className="bg-aic-black p-16 group hover:bg-white transition-all duration-500">
                    <span className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-[0.4em] mb-8 block group-hover:text-aic-gold transition-colors">Path 02</span>
                    <h3 className="font-serif text-4xl text-white group-hover:text-aic-black transition-colors mb-6">For Organizations</h3>
                    <p className="text-gray-500 group-hover:text-gray-600 transition-colors font-serif text-lg leading-relaxed mb-12">
                        De-risk your AI deployments with our 3-tier accountability framework and continuous governance telemetry.
                    </p>
                    <span className="font-mono text-[10px] font-bold text-white group-hover:text-aic-black border-b border-white/20 group-hover:border-aic-black pb-2 transition-all uppercase tracking-widest">
                        Get Certified →
                    </span>
                </Link>
            </div>
        </div>
      </section>

      <ProblemStatement />
      <SectorsSection />
      <PulseHighlight />
      <TierFramework />
      
      {/* Compliance Standards Grid */}
      <section className="py-32 bg-white border-t border-aic-black/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-24">
                <h3 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-4">Regulatory Alignment</h3>
                <p className="font-serif text-3xl text-aic-black">Grounding AI in Universal Rights.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                {[
                    { n: 'POPIA Section 71', j: 'South Africa', d: 'The prohibition of automated decision making without meaningful human intervention.' },
                    { n: 'ISO/IEC 42001', j: 'International', d: 'The global standard for AI management systems establishing governance, risk, and accountability requirements.' },
                    { n: 'EU AI Act', j: 'European Union', d: 'Risk-based classification requiring strict conformity assessments for high-risk systems.' },
                    { n: 'EEOC Title VII', j: 'United States', d: 'Enforcing the Four-Fifths rule to prevent algorithmic discrimination in employment.' }
                ].map((item) => (
                    <div key={item.n} className="text-center md:text-left">
                        <span className="text-[9px] font-mono font-bold text-aic-gold uppercase tracking-widest block mb-2">{item.j}</span>
                        <h4 className="font-serif text-xl font-medium text-aic-black mb-4">{item.n}</h4>
                        <p className="text-sm text-gray-500 font-serif leading-relaxed">{item.d}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <AlphaPreview />
      
      <InstitutionalFooter />
    </main>
  );
}