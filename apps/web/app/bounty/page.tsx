import Navbar from '../components/Navbar';

export default function BountyPage() {
  return (
    <main className="min-h-screen bg-aic-black text-white">
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-mono">
              BIAS_BOUNTY_PROGRAM
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400 font-mono">
              Break the algorithm. Get paid.
              <br />
              We pay ethical hackers to prove discrimination in Tier 1 systems.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 font-mono uppercase"
              >
                View Active Targets
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white font-mono">
                Submision Guidelines <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Terminal Effect Targets */}
        <div className="mx-auto max-w-4xl font-mono text-sm">
            <div className="border border-green-900 bg-black p-4 rounded-lg">
                <p className="text-green-500">$ TARGET_LIST_LOADED</p>
                <div className="mt-4 grid grid-cols-1 gap-4">
                    <div className="flex justify-between border-b border-green-900 pb-2">
                        <span>BANK_CHATBOT_V4</span>
                        <span className="text-green-400">$5,000 BOUNTY</span>
                    </div>
                    <div className="flex justify-between border-b border-green-900 pb-2">
                        <span>INSURER_RISK_MODEL_A</span>
                        <span className="text-green-400">$12,000 BOUNTY</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
