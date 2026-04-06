import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h1 className="text-aic-navy text-5xl md:text-6xl font-heading font-bold leading-tight">
                  Join the Waitlist
                </h1>
                <p className="text-aic-navy/70 text-xl font-sans leading-relaxed">
                  AIC Pulse is in early access. The Founding Partner Programme has limited slots. Get in first.
                </p>
              </div>

              <div className="space-y-8">
                <div className="p-8 border border-aic-navy/10 space-y-4">
                  <h3 className="text-xl font-heading font-bold text-aic-navy">AIC Pulse Early Access</h3>
                  <p className="text-aic-navy/60 font-sans text-sm leading-relaxed">
                    Be among the first to deploy immutable AI decision logging in your systems. SDK access, onboarding support, and priority certification.
                  </p>
                </div>

                <div className="p-8 border border-aic-navy/10 space-y-4">
                  <h3 className="text-xl font-heading font-bold text-aic-navy">Founding Partner Programme</h3>
                  <p className="text-aic-navy/60 font-sans text-sm leading-relaxed">
                    ZAR 2,500/month. Pricing locked for life. Free upgrade to certified status when SANAS accreditation completes.
                  </p>
                  <div className="text-aic-copper font-mono text-xs font-bold uppercase tracking-widest">
                    Available for limited entities
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
