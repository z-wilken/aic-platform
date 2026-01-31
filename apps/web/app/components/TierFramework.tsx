export default function TierFramework() {
  const tiers = [
    {
      id: 1,
      name: 'Tier 1: Critical',
      color: 'aic-red',
      borderColor: 'border-aic-red',
      bgColor: 'bg-aic-red',
      description: 'High-stakes decisions affecting life, liberty, or livelihood.',
      examples: ['Credit Scoring', 'Hiring Algorithms', 'Medical Diagnosis'],
      requirements: ['Full Human Review', 'Explainability Audit', 'Bias Testing'],
    },
    {
      id: 2,
      name: 'Tier 2: Elevated',
      color: 'aic-orange',
      borderColor: 'border-aic-orange',
      bgColor: 'bg-aic-orange',
      description: 'Significant impact but reversible or lower stakes.',
      examples: ['Dynamic Pricing', 'Customer Service Chatbots', 'Personalized Ads'],
      requirements: ['Periodic Audit', 'Opt-out Mechanism', 'Clear Disclosure'],
    },
    {
      id: 3,
      name: 'Tier 3: Automated',
      color: 'aic-green',
      borderColor: 'border-aic-green',
      bgColor: 'bg-aic-green',
      description: 'Low-risk automation with minimal human impact.',
      examples: ['Spam Filters', 'Inventory Management', 'Playlist Recommendations'],
      requirements: ['Standard Disclosure', 'Data Privacy Basics'],
    },
  ];

  return (
    <div id="framework" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-mono text-base font-semibold leading-7 text-aic-gold">THE STANDARD</h2>
          <p className="mt-2 font-serif text-3xl font-bold tracking-tight text-aic-black sm:text-4xl">
            A Risk-Based Approach to Accountability
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
            Not all AI is created equal. Our 3-Tier Framework maps directly to the "legal consequences" clause of POPIA Section 71.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier) => (
            <div key={tier.id} className={`flex flex-col justify-between rounded-sm border-t-4 ${tier.borderColor} bg-aic-bg p-8 shadow-sm ring-1 ring-gray-900/5 sm:p-10 transition hover:shadow-md`}>
              <div>
                <h3 className={`text-base font-bold leading-7 ${tier.id === 1 ? 'text-aic-red' : tier.id === 2 ? 'text-aic-orange' : 'text-aic-green'} font-mono uppercase tracking-wider`}>
                  {tier.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600 font-serif">
                  {tier.description}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 font-mono">
                  {tier.examples.map((example) => (
                    <li key={example} className="flex gap-x-3">
                      <svg className={`h-6 w-5 flex-none ${tier.id === 1 ? 'text-aic-red' : tier.id === 2 ? 'text-aic-orange' : 'text-aic-green'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 font-mono">Core Requirements</p>
                 <ul className="list-disc list-inside text-sm text-gray-600 font-serif">
                    {tier.requirements.map((req) => (
                        <li key={req}>{req}</li>
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
