// components/ProblemStatement.tsx
const ProblemStatement = () => {
  const stats = [
    {
      value: "85.1%",
      label: "Favoritism in AI Screening",
      desc: "University of Washington study (2024) found AI resume screening favored white-associated names in over 85% of cases.",
      source: "University of Washington, 2024"
    },
    {
      value: "$365,000",
      label: "First EEOC AI Settlement",
      desc: "iTutorGroup paid a federal penalty after their AI automatically rejected applicants based on age.",
      source: "EEOC v. iTutorGroup, 2024"
    },
    {
      value: "100%",
      label: "Mandatory Accountability",
      desc: "POPIA Section 71 prohibits decisions based solely on automated processing that produce legal effects.",
      source: "POPIA Section 71, South Africa"
    }
  ];

  return (
    <div className="bg-aic-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="font-mono text-base font-semibold leading-7 text-aic-gold uppercase tracking-widest">The Compliance Reality</h2>
            <p className="mt-2 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Efficiency Without Accountability is Liability
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300 font-serif max-w-3xl mx-auto">
              As AI adoption scales, so does the risk of algorithmic bias and regulatory non-compliance. South African law is clear: human beings must remain in control.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-white/5 p-8 backdrop-blur-sm">
                <dt className="text-sm font-semibold leading-6 text-gray-400 font-mono uppercase tracking-widest">{stat.label}</dt>
                <dd className="order-first text-5xl font-bold tracking-tight text-aic-gold font-serif mb-4">{stat.value}</dd>
                <p className="mt-2 text-sm text-gray-400 font-serif leading-relaxed">
                    {stat.desc}
                </p>
                <p className="mt-4 text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                    Source: {stat.source}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement;