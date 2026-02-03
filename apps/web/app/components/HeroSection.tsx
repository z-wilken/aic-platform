// components/HeroSection.tsx
import Marquee from './Marquee';

const HeroSection = () => {
  return (
    <div className="relative min-h-[calc(100vh-120px)] flex items-center">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-[40vw] font-bold text-aic-paper opacity-10 leading-none select-none">
            AIC
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <p className="font-mono text-aic-gold uppercase tracking-widest">
              The Global Standard for Algorithmic Justice
            </p>
            <h1 className="mt-4 text-6xl font-bold tracking-tighter text-aic-black sm:text-8xl font-serif">
              No Robot <br />
              <span className="text-aic-red italic">Judges.</span>
            </h1>
          </div>
          <div className="space-y-8">
            <p className="text-xl leading-8 text-gray-700 font-serif">
              We define the line between automation and humanity. If your AI decides a human fate, it must have{' '}
              <span className="font-bold border-b-2 border-aic-red">Human Empathy</span> in the loop.
            </p>
            <div className="flex items-center gap-x-6">
              <a
                href="/assessment"
                className="rounded-none bg-aic-black px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-aic-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aic-black font-mono uppercase tracking-widest transition-colors"
              >
                Audit Your System
              </a>
              <a
                href="/report"
                className="text-sm font-semibold leading-6 text-gray-900 font-mono border-b border-gray-300 hover:border-aic-black transition-colors"
              >
                Report an Abuse <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Marquee
        text="ACCOUNTABILITY · TRANSPARENCY · JUSTICE · HUMANITY · OVERSIGHT · FAIRNESS ·"
        className="absolute bottom-0 left-0 w-full py-4 bg-aic-black text-aic-paper font-mono text-lg"
      />
    </div>
  );
};

export default HeroSection;