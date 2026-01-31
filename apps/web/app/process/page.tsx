import Navbar from '../components/Navbar';

export default function ProcessPage() {
  const steps = [
    {
      id: '01',
      title: 'Application & Triage',
      duration: 'Week 1',
      desc: 'You submit the Alpha Application. Our intake team reviews your AI usage context to determine eligibility and preliminary tier classification.',
    },
    {
      id: '02',
      title: 'Gap Analysis',
      duration: 'Weeks 2-3',
      desc: 'We conduct a deep-dive audit of your current governance. We interview your product owners and review your technical documentation against POPIA Section 71.',
    },
    {
      id: '03',
      title: 'Remediation',
      duration: 'Weeks 4-6',
      desc: 'We provide a "findings report". You implement the necessary human oversight mechanisms (e.g., appeal workflows, bias testing) with our guidance.',
    },
    {
      id: '04',
      title: 'Final Validation',
      duration: 'Week 7',
      desc: 'Our lead auditor verifies the changes. We test your "Human-in-the-Loop" protocols with real-world scenarios.',
    },
    {
      id: '05',
      title: 'Certification',
      duration: 'Week 8',
      desc: 'You receive the AIC Seal and the detailed Compliance Report. We integrate with your insurer to trigger premium discounts.',
    }
  ];

  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-aic-gold font-mono uppercase tracking-widest">The Journey</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-aic-black sm:text-4xl font-serif">
              From "Black Box" to Benchmark
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-serif">
              Our certification process is designed to be rigorous but non-disruptive. We certify your governance, not your code.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-5">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col relative group">
                  {/* Connector Line */}
                  <div className="hidden lg:block absolute top-4 left-8 w-full h-0.5 bg-gray-200 -z-10 group-last:hidden"></div>
                  
                  <div className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 font-mono">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-aic-black text-white text-xs">
                        {step.id}
                    </span>
                    <span className="text-sm text-gray-500">{step.duration}</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-y-3">
                    <h3 className="text-xl font-bold text-aic-black font-serif">{step.title}</h3>
                    <p className="text-base leading-7 text-gray-600 font-serif text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <a href="/alpha" className="rounded-none bg-aic-gold px-8 py-3 text-sm font-semibold text-aic-black shadow-sm hover:bg-yellow-500 font-mono uppercase tracking-wide">
                Start the Process
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
