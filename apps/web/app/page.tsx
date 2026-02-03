import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TierFramework from './components/TierFramework';

export default function Home() {
  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      <HeroSection />
      <TierFramework />
      <footer className="bg-aic-black py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-4xl mb-4">The Declaration of Algorithmic Rights</h2>
            <p className="font-mono text-gray-400 max-w-xl mx-auto mb-8">
            "We hold these truths to be self-evident: that no final decision affecting a person’s legal status shall be made solely by a machine."
            </p>
            <div className="flex justify-center gap-8 font-mono text-xs text-aic-gold uppercase tracking-widest">
                <span>Est. 2026</span>
                <span>Johannesburg</span>
                <span>Global</span>
            </div>
        </div>
      </footer>
    </main>
  );
}