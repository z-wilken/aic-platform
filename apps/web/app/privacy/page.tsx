import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-aic-navy">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-4xl mx-auto px-6">
          <header className="mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Privacy Policy</h1>
            <p className="text-aic-navy/40 font-mono text-sm uppercase tracking-widest">Effective Date: April 6, 2026</p>
          </header>

          <div className="prose prose-lg max-w-none font-sans text-aic-navy/80 leading-relaxed space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">1. Commitment to POPIA</h2>
              <p>
                AI Integrity Certification (Pty) Ltd (&quot;AIC&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy and personal information of our clients, partners, and visitors. This policy explains how we process personal information in compliance with the Protection of Personal Information Act (POPIA) of South Africa.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">2. Information We Collect</h2>
              <p>We collect information necessary for our certification and governance services, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Professional contact details (name, email, job title, company name).</li>
                <li>Information about your organisation&apos;s AI systems and governance frameworks.</li>
                <li>Usage data through our AIC Pulse SDK (if integrated).</li>
                <li>Communication history regarding assessments and certification.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">3. Purpose of Processing</h2>
              <p>We process personal information only for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conducting Division classification assessments.</li>
                <li>Administering the Founding Partner Programme.</li>
                <li>Providing AIC Pulse monitoring and audit services.</li>
                <li>Verifying the named human accountability required for certification.</li>
                <li>Compliance with legal and regulatory obligations.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">4. Data Subject Rights</h2>
              <p>
                Under POPIA, you have the right to access, correct, or request the deletion of your personal information. You may also object to the processing of your data for certain purposes. To exercise these rights, please contact our Information Officer at info@aiccertified.cloud.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-aic-navy">5. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including encryption of audit logs and strict access controls.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
