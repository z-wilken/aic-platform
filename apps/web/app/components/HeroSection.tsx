export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden pt-14">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 font-mono">
              Accepting Alpha Cohort Applications.{' '}
              <a href="/alpha" className="font-semibold text-aic-black">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-aic-black sm:text-7xl">
            Human Accountability for the AI Age
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-600 sm:text-xl/8 font-serif">
            The only certification built specifically for <span className="text-aic-black font-semibold">POPIA Section 71 compliance</span>. 
            We don't just regulate the algorithm; we certify the human oversight behind it.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/assessment"
              className="rounded-none bg-aic-black px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-black font-mono uppercase tracking-wide"
            >
              Start Self-Assessment
            </a>
            <a href="#framework" className="text-sm font-semibold leading-6 text-gray-900 font-mono flex items-center gap-2">
              View Framework <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        
        {/* Social Proof / Stats Ticker */}
        <div className="mt-20 border-y border-gray-200 py-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-2">
              <dt className="text-base leading-7 text-gray-600 font-mono">Regulation</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-aic-black font-serif">POPIA Sec 71</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-2">
              <dt className="text-base leading-7 text-gray-600 font-mono">Framework</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-aic-black font-serif">3-Tier System</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-2">
              <dt className="text-base leading-7 text-gray-600 font-mono">Validation</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-aic-black font-serif">Third-Party</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
