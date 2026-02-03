import Navbar from '../components/Navbar';
import { tiers, caseStudies } from '../data/tiers';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AIC | Tier Framework - Proportional AI Accountability",
  description: "Explore our three-tier certification framework designed to match accountability requirements to decision stakes.",
};

export default function TiersPage() {
  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-aic-gold font-mono uppercase tracking-widest">The Framework</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-aic-black sm:text-4xl font-serif">
              A Proportional Approach to AI Accountability
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
              Not all AI is created equal. We map your certification requirements directly to the stakes of the decisions being made.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {tiers.map((tier) => (
                <div key={tier.id} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-aic-black font-serif">
                    <div className={`mb-6 flex h-10 w-10 items-center justify-center rounded-lg ${tier.color.replace('text-', 'bg-')} text-white`}>
                      {tier.id}
                    </div>
                    <span className={tier.color}>{tier.name}</span>
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto font-serif italic text-sm mb-4">{tier.tagline}</p>
                    <p className="flex-auto font-serif">{tier.description}</p>
                    
                    <div className="mt-8">
                        <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Examples</h4>
                        <ul className="space-y-2">
                            {tier.examples.map(ex => (
                                <li key={ex} className="flex items-center gap-2 text-sm font-mono text-gray-500">
                                    <div className={`h-1 w-1 rounded-full ${tier.color.replace('text-', 'bg-')}`}></div>
                                    {ex}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 bg-white/50 p-4 rounded-xl border border-gray-100">
                        <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Core Requirements</h4>
                        <ul className="space-y-2">
                            {tier.requirements.map(req => (
                                <li key={req} className="flex items-start gap-2 text-xs font-serif text-gray-700">
                                    <svg className={`h-4 w-4 shrink-0 ${tier.color}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Case Studies */}
          <div className="mt-32">
            <h3 className="text-2xl font-bold font-serif text-aic-black mb-12 text-center underline decoration-aic-gold underline-offset-8">Multi-Tier Organizations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {caseStudies.map(cs => (
                    <div key={cs.organization} className="glass-card p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h4 className="font-serif font-bold text-xl mb-6">{cs.organization}</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                                <span className="font-mono text-aic-red">TIER 1</span>
                                <span className="font-serif text-gray-600">{cs.tier1}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                                <span className="font-mono text-aic-orange">TIER 2</span>
                                <span className="font-serif text-gray-600">{cs.tier2}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-mono text-aic-green">TIER 3</span>
                                <span className="font-serif text-gray-600">{cs.tier3}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-center gap-6">
            <p className="font-serif text-gray-600 italic">Unsure where your system fits?</p>
            <Link
              href="/assessment"
              className="rounded-none bg-aic-black px-12 py-4 text-sm font-semibold text-white shadow-sm hover:bg-aic-gold hover:text-aic-black transition-all font-mono uppercase tracking-widest"
            >
              Start Self-Assessment
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
