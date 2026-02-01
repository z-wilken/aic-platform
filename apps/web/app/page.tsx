import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TierFramework from './components/TierFramework';

export default function Home() {
  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      
      {/* Manifesto Hero */}
      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-none border border-aic-black px-4 py-1 text-sm leading-6 text-aic-black ring-1 ring-gray-900/10 hover:bg-aic-black hover:text-white transition-all font-mono uppercase tracking-widest">
                The Global Standard for Algorithmic Justice
              </div>
            </div>
            <h1 className="text-6xl font-bold tracking-tighter text-aic-black sm:text-8xl font-serif mb-8">
              No Robot <br/>
              <span className="text-aic-red italic">Judges.</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-700 font-serif max-w-2xl mx-auto">
              We define the line between automation and humanity. 
              If your AI decides a human fate, it must have <span className="font-bold border-b-2 border-aic-red">Human Empathy</span> in the loop.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/assessment"
                className="rounded-none bg-aic-black px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-aic-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-black font-mono uppercase tracking-widest transition-colors"
              >
                Audit Your System
              </a>
              <a href="/report" className="text-sm font-semibold leading-6 text-gray-900 font-mono border-b border-gray-300 hover:border-aic-black transition-colors">
                Report an Abuse <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <TierFramework />
      
      {/* The Mission Footer */}
      <footer className="bg-aic-black py-24 text-center text-white">
        <h2 className="font-serif text-4xl mb-4">The Declaration of Algorithmic Rights</h2>
        <p className="font-mono text-gray-400 max-w-xl mx-auto mb-8">
          "We hold these truths to be self-evident: that no final decision affecting a person’s legal status shall be made solely by a machine."
        </p>
        <div className="flex justify-center gap-8 font-mono text-xs text-aic-gold uppercase tracking-widest">
            <span>Est. 2026</span>
            <span>Johannesburg</span>
            <span>Global</span>
        </div>
      </footer>
    </main>
  );
}
