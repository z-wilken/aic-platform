import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TierFramework from './components/TierFramework';

export default function Home() {
  return (
    <main className="min-h-screen bg-aic-paper">
      <Navbar />
      <HeroSection />
      <TierFramework />

      {/* Declaration Section */}
      <section className="relative py-32 lg:py-40 bg-aic-black overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-aic-gold uppercase mb-8">
            <span className="w-8 h-px bg-aic-gold" />
            Our Promise
            <span className="w-8 h-px bg-aic-gold" />
          </span>

          <h2 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-tight mb-8">
            The Declaration of{' '}
            <span className="text-aic-gold italic">Algorithmic Rights</span>
          </h2>

          <blockquote className="relative">
            <span className="absolute -top-8 -left-4 text-8xl text-aic-gold/20 font-serif">"</span>
            <p className="font-serif text-xl lg:text-2xl text-gray-300 leading-relaxed italic">
              We hold these truths to be self-evident: that no final decision
              affecting a person's legal status, livelihood, or liberty shall
              be made solely by a machine without human oversight, empathy,
              and the right to appeal.
            </p>
            <span className="absolute -bottom-8 -right-4 text-8xl text-aic-gold/20 font-serif rotate-180">"</span>
          </blockquote>

          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16 font-mono text-xs text-gray-500 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-aic-gold rounded-full" />
                Est. 2026
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-aic-red rounded-full" />
                Johannesburg
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                Global Standard
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-aic-paper border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="/" className="inline-block font-serif text-3xl font-bold text-aic-black mb-4">
                AIC<span className="text-aic-gold">.</span>
              </a>
              <p className="font-serif text-gray-600 max-w-md leading-relaxed">
                The AI Integrity Certification sets the global standard for
                algorithmic accountability. We ensure AI systems that affect
                human lives operate with empathy, transparency, and oversight.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-mono text-xs font-bold text-aic-black uppercase tracking-wider mb-4">
                Platform
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/assessment" className="font-mono text-sm text-gray-600 hover:text-aic-black transition-colors link-underline">
                    Assessment
                  </a>
                </li>
                <li>
                  <a href="/docs" className="font-mono text-sm text-gray-600 hover:text-aic-black transition-colors link-underline">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/alpha" className="font-mono text-sm text-gray-600 hover:text-aic-black transition-colors link-underline">
                    Join Alpha
                  </a>
                </li>
                <li>
                  <a href="/report" className="font-mono text-sm text-gray-600 hover:text-aic-black transition-colors link-underline">
                    Report Abuse
                  </a>
                </li>
              </ul>
            </div>

            {/* More Links */}
            <div>
              <h4 className="font-mono text-xs font-bold text-aic-black uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="font-mono text-sm text-gray-600 hover:text-aic-black transition-colors link-underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="/faq" className="font-mono text-sm text-gray-600 hover:text-aic-black transition-colors link-underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="font-mono text-sm text-gray-600 hover:text-aic-black transition-colors link-underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="font-mono text-sm text-gray-600 hover:text-aic-black transition-colors link-underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-gray-400">
              © 2026 AI Integrity Certification. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="font-mono text-xs text-gray-400">
                POPIA Section 71 Compliant
              </span>
              <span className="w-px h-4 bg-gray-300" />
              <span className="font-mono text-xs text-aic-gold">
                v1.0-alpha
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
