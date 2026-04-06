import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Scale, ShieldCheck, AlertTriangle, FileText, CheckCircle } from "lucide-react";

export default function ImpartialityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-aic-navy">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="space-y-12 mb-20">
            <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight">
              Impartiality & Disclosure
            </h1>
            <p className="text-xl font-sans text-aic-navy/70 leading-relaxed italic border-l-4 border-aic-copper pl-8">
              &quot;AIC is currently in its founding phase. We are building toward SANAS accreditation. Our standards are modelled on ISO/IEC 17021 and 17024 and designed to meet accreditation requirements from day one.&quot;
            </p>
          </div>

          <div className="space-y-24">
            {/* Core Principle */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 text-aic-copper uppercase font-mono text-xs font-bold tracking-[0.2em]">
                <Scale className="w-5 h-5" />
                <span>The Core Principle</span>
              </div>
              <h2 className="text-3xl font-heading font-bold">Independence is our only product.</h2>
              <p className="text-lg font-sans text-aic-navy/70 leading-relaxed">
                AI Integrity Certification (Pty) Ltd operates as an independent, third-party certification body. We maintain strict impartiality in all certification activities. We do not provide consultancy services to organisations seeking certification. If we help you build it, we cannot certify it.
              </p>
            </section>

            {/* The Arthur Andersen Rule */}
            <section className="bg-aic-navy text-white p-10 md:p-16 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-heading font-bold">The Arthur Andersen Rule</h2>
                <p className="text-white/60 font-sans leading-relaxed">
                  The collapse of a major auditing firm over a conflict of interest is the clearest illustration of why independence matters. To prevent this, AIC enforces a hard separation between advice and audit.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-mono uppercase tracking-widest text-aic-copper">Prohibited Services</h3>
                <p className="text-white/80 font-sans">AIC does <strong className="text-white">not</strong> provide any of the following services to organisations it certifies:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "AI Management system implementation",
                    "Internal audit services for AI governance",
                    "Algorithm or model risk assessment design",
                    "Policy or procedure development for clients",
                    "Custom AI software integration or coding",
                    "Direct employee training on client-specific tools"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-sans text-white/70">
                      <AlertTriangle className="w-4 h-4 text-aic-copper shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Safeguards */}
            <section className="space-y-12">
              <h2 className="text-3xl font-heading font-bold">Conflict of Interest Safeguards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-bold">Personnel Separation</h3>
                  <p className="text-aic-navy/60 font-sans text-sm leading-relaxed">
                    Auditors and technical assessors are prohibited from evaluating any organisation where they have provided consultancy or had any commercial interest within the previous 24 months.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-bold">Financial Independence</h3>
                  <p className="text-aic-navy/60 font-sans text-sm leading-relaxed">
                    AIC is structured to ensure that no single client or founding partner represents more than 15% of our annual operating revenue, preventing commercial pressure on certification decisions.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-bold">Impartiality Committee</h3>
                  <p className="text-aic-navy/60 font-sans text-sm leading-relaxed">
                    Our certification decisions are reviewed by an independent committee that includes representatives from legal, academic, and regulatory backgrounds who have no financial stake in AIC.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-bold">Public Accountability</h3>
                  <p className="text-aic-navy/60 font-sans text-sm leading-relaxed">
                    Any reported conflict of interest is investigated immediately. Our register of interests is available for inspection by accreditation bodies and regulators.
                  </p>
                </div>
              </div>
            </section>

            {/* Accreditation Roadmap */}
            <section className="border-t border-aic-navy/10 pt-24 space-y-8">
              <div className="flex items-center gap-4 text-aic-copper uppercase font-mono text-xs font-bold tracking-[0.2em]">
                <ShieldCheck className="w-5 h-5" />
                <span>Accreditation Roadmap</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-6">
                  <h2 className="text-3xl font-heading font-bold">Building toward the SANAS Gold Standard</h2>
                  <p className="text-aic-navy/70 font-sans leading-relaxed">
                    In South Africa, formal accreditation is granted by SANAS (South African National Accreditation System). The process for a new certification body typically takes 18 to 24 months.
                  </p>
                  <p className="text-aic-navy/70 font-sans leading-relaxed">
                    AIC is currently in the operational phase required to demonstrate compliance. We operate to ISO/IEC 17021 (Management Systems) and ISO/IEC 17024 (Personnel Certification) standards. Certificates issued during this phase are issued as &quot;Founding Partner Verifications&quot; and will be eligible for upgrade to accredited status upon completion of the SANAS process.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-aic-navy/[0.02] p-8 border border-aic-navy/5">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-aic-navy/40 mb-6">Alignment Matrix</h3>
                  <ul className="space-y-4">
                    {[
                      { std: "ISO/IEC 17021", status: "Operational Compliance" },
                      { std: "ISO/IEC 17024", status: "Operational Compliance" },
                      { std: "ISO/IEC 42001", status: "Assessment Ready" },
                      { std: "POPIA Sec 71", status: "Full Mapping" }
                    ].map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center text-sm font-mono">
                        <span className="text-aic-navy font-bold">{item.std}</span>
                        <span className="text-aic-copper">{item.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
