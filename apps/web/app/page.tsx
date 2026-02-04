import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TierFramework from './components/TierFramework';
import ProblemStatement from './components/ProblemStatement';
import AlphaPreview from './components/AlphaPreview';
import SectorsSection from './components/Sectors';
import PulseHighlight from './components/PulseHighlight';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AIC | Home - AI Integrity Certification",
  description: "The definitive trust infrastructure for South African AI. POPIA Section 71 Compliance Framework.",
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {[
                    { n: 'POPIA Section 71', j: 'South Africa', d: 'The prohibition of automated decision making without meaningful human intervention.' },
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
      
      <footer className="bg-aic-black py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="text-[20vw] font-bold text-white select-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">ACCOUNTABLE</div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <h2 className="font-serif text-4xl mb-8">The Declaration of Algorithmic Rights</h2>
            <p className="font-serif italic text-gray-400 max-w-xl mx-auto mb-12 text-lg">
            "We hold these truths to be self-evident: that no final decision affecting a person’s legal status shall be made solely by a machine."
            </p>
            <div className="flex flex-wrap justify-center gap-12 font-mono text-[10px] text-aic-gold uppercase tracking-[0.3em]">
                <div className="flex flex-col gap-2">
                    <span className="text-gray-600">Established</span>
                    <span>2026</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gray-600">Headquarters</span>
                    <span>Johannesburg</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gray-600">Scale</span>
                    <span>Global Standard</span>
                </div>
            </div>
            
            <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 font-mono text-[9px] uppercase tracking-widest">
                <p>© 2026 AI Integrity Certification. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Documentation</a>
                </div>
            </div>
        </div>
      </footer>
    </main>
  );
}
