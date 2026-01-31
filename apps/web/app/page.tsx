import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TierFramework from './components/TierFramework';

export default function Home() {
  return (
    <main className="min-h-screen bg-aic-bg">
      <Navbar />
      <HeroSection />
      <TierFramework />
      
      {/* Footer Placeholder */}
      <footer className="bg-aic-black py-12 text-center text-white font-mono text-sm">
        <p>&copy; 2026 AI Integrity Certification (AIC). Built for POPIA Compliance.</p>
      </footer>
    </main>
  );
}
