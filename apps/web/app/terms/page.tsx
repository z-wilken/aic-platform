import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-aic-navy">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-4xl mx-auto px-6">
          <header className="mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Terms of Service</h1>
            <p className="text-aic-navy/40 font-mono text-sm uppercase tracking-widest">Effective Date: April 6, 2026</p>
          </header>

          <div className="prose prose-lg max-w-none font-sans text-aic-navy/80 leading-relaxed space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">1. Certification Services</h2>
              <p>
                AI Integrity Certification (Pty) Ltd (&quot;AIC&quot;) provides independent certification and governance services for organisations using AI. Certification is awarded based on an organisation&apos;s ability to demonstrate human accountability, transparency, and compliance with the AIC framework.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">2. Founding Partner Programme</h2>
              <p>
                Founding Partners commit to a 12-month membership at ZAR 2,500/month. This pricing is locked for the life of the membership. Partners who join during this phase will receive a free upgrade to full certified status once AIC achieves SANAS accreditation, provided they maintain their membership and meet the required certification standards.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">3. AIC Pulse SDK</h2>
              <p>
                Use of the AIC Pulse SDK is subject to its own separate license agreement provided at the time of integration. Pulse remains the intellectual property of AIC. The data collected by Pulse is used for audit and certification purposes as agreed between the parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">4. Impartiality and Conflicts</h2>
              <p>
                AIC reserves the right to refuse or withdraw certification if a conflict of interest is identified or if the organisation fails to uphold its governance obligations. We do not provide consulting services to the same organisations we certify.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">5. Governing Law</h2>
              <p>
                These terms are governed by the laws of the Republic of South Africa. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the South African courts.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
