export default function TierFramework() {
  const tiers = [
    {
      id: 1,
      name: 'Tier 1: Critical',
      color: 'text-aic-red',
      borderColor: 'border-aic-red/20',
      bgColor: 'bg-aic-red/5',
      description: 'High-stakes decisions affecting life, liberty, or livelihood.',
      examples: ['Credit Scoring', 'Hiring Algorithms', 'Medical Diagnosis'],
      requirements: ['Full Human Review', 'Explainability Audit', 'Bias Testing'],
    },
    {
      id: 2,
      name: 'Tier 2: Elevated',
      color: 'text-aic-orange',
      borderColor: 'border-aic-orange/20',
      bgColor: 'bg-aic-orange/5',
      description: 'Significant impact but reversible or lower stakes.',
      examples: ['Dynamic Pricing', 'Customer Service Chatbots', 'Personalized Ads'],
      requirements: ['Periodic Audit', 'Opt-out Mechanism', 'Clear Disclosure'],
    },
    {
      id: 3,
      name: 'Tier 3: Automated',
      color: 'text-aic-green',
      borderColor: 'border-aic-green/20',
      bgColor: 'bg-aic-green/5',
      description: 'Low-risk automation with minimal human impact.',
      examples: ['Spam Filters', 'Inventory Management', 'Playlist Recommendations'],
      requirements: ['Standard Disclosure', 'Data Privacy Basics'],
    },
  ];

  return (
    <div id="framework" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-mono text-base font-semibold leading-7 text-aic-gold uppercase tracking-widest">The Standard</h2>
          <p className="mt-2 font-serif text-3xl font-bold tracking-tight text-aic-black sm:text-4xl">
            A Risk-Based Approach
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
            Our 3-Tier Framework maps directly to the "legal consequences" clause of POPIA Section 71.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier) => (
            <div key={tier.id} className={`flex flex-col justify-between rounded-2xl glass-card p-8 sm:p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
              <div>
                <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tier.bgColor} ${tier.color} ring-1 ring-inset ${tier.borderColor} mb-4 font-mono`}>
                    RISK LEVEL: 0{tier.id}
                </div>
                <h3 className={`text-2xl font-bold leading-7 ${tier.color} font-serif`}>
                  {tier.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600 font-serif">
                  {tier.description}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 font-mono">
                  {tier.examples.map((example) => (
                    <li key={example} className="flex gap-x-3 items-center">
                      <div className={`h-1.5 w-1.5 rounded-full ${tier.color.replace('text-', 'bg-')}`}></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200/50">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">Requirements</p>
                 <ul className="text-sm text-gray-600 font-serif space-y-1">
                    {tier.requirements.map((req) => (
                        <li key={req} className="flex items-center gap-2">
                             <svg className={`h-4 w-4 ${tier.color}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                             </svg>
                             {req}
                        </li>
                    ))}
                 </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
