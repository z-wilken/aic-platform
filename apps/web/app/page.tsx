import Link from "next/link";
import { ChevronRight, Shield, Scale, Eye, Heart, CheckCircle2, FileText, Lock } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Section 1: Hero */}
        <section className="relative min-h-[90vh] flex items-center pt-20 bg-aic-navy overflow-hidden">
          {/* Option A: Pure deep navy with subtle grid */}
          <div className="absolute inset-0 subtle-grid opacity-20" />
          
          <div className="container relative z-10 max-w-5xl mx-auto px-6">
            <div className="flex flex-col items-center text-center space-y-12">
              <div className="space-y-6">
                <h1 className="text-white text-5xl md:text-7xl font-heading font-bold leading-tight">
                  Certifying the Human Behind the Algorithm
                </h1>
                <div className="w-24 h-1 bg-aic-copper mx-auto" />
              </div>
              
              <p className="text-white/80 text-lg md:text-xl font-sans max-w-3xl leading-relaxed">
                When an AI system makes a decision that affects someone&apos;s life — their credit, their job, their healthcare — AIC certification means a named human is accountable for it. We certify organisations on how they govern AI. What we verify is whether someone can be held responsible.
              </p>

              <div className="pt-8">
                <Link
                  href="/classify"
                  className="bg-aic-copper text-aic-navy px-10 py-5 text-lg font-bold uppercase tracking-widest hover:bg-aic-copper/90 transition-all shadow-2xl shadow-aic-copper/20"
                >
                  Find Your Division
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Problem */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="container max-w-4xl mx-auto px-6">
            <h2 className="text-aic-navy text-3xl md:text-5xl font-heading mb-12">
              AI is making consequential decisions. Someone needs to be accountable.
            </h2>
            <div className="space-y-8 text-aic-navy/70 text-lg md:text-xl font-sans leading-relaxed">
              <p>
                POPIA Section 71 creates legal exposure for automated decisions that affect South Africans. But regulation alone doesn&apos;t create accountability — it just creates liability.
              </p>
              <p>
                AIC certification does both: it documents that your organisation has a governance framework AND that a named person within it can answer for every decision the algorithm makes. When the regulator asks &quot;who decided this?&quot; — AIC certification means you have an answer.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: The Five Algorithmic Rights */}
        <section className="py-24 lg:py-32 bg-aic-navy text-white">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading mb-6">The Declaration of Algorithmic Rights</h2>
              <p className="text-white/60 font-sans max-w-2xl mx-auto">
                AIC&apos;s certification framework is built on these five rights. Every assessment measures how well an organisation upholds each one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { icon: Shield, title: "Article I: Human Agency", desc: "Humans must retain the power to override automated outcomes." },
                { icon: Eye, title: "Article II: Explanation", desc: "Every consequential decision must be explainable in plain language." },
                { icon: Heart, title: "Article III: Empathy", desc: "Systems must account for human context and dignity in their outputs." },
                { icon: CheckCircle2, title: "Article IV: Correction", desc: "A clear, human-led path must exist to contest and fix errors." },
                { icon: Scale, title: "Article V: Truth", desc: "Algorithms must be audited for factual accuracy and bias mitigation." },
              ].map((right, idx) => (
                <div key={idx} className="border border-white/10 p-8 flex flex-col items-center text-center space-y-6">
                  <right.icon className="w-8 h-8 text-aic-copper" />
                  <h3 className="text-xl font-heading font-bold">{right.title}</h3>
                  <p className="text-white/60 text-sm font-sans">{right.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: The 5 Divisions */}
        <section className="py-24 lg:py-32 bg-white text-aic-navy">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-heading mb-6">Which Division Are You?</h2>
              <p className="text-aic-navy/60 font-sans max-w-2xl">
                AIC certifies organisations across the full spectrum of AI use — from companies that use no AI at all, to companies that build and sell AI products.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { num: 1, name: "Sovereign", desc: "Your organisation uses no AI in operational decisions. AIC certifies that you've audited for Shadow AI and remain human-led." },
                { num: 2, name: "Supervised", desc: "AI recommends. A named human decides. AIC certifies that your override processes are documented and real." },
                { num: 3, name: "Reviewed", desc: "AI decides. Humans review patterns and cases. AIC certifies that your review cadence and appeals process are functioning." },
                { num: 4, name: "Monitored", desc: "Systems operate autonomously. AIC certifies that your drift detection, escalation paths, and disclosure practices are sound." },
                { num: 5, name: "Artificial", desc: "You build or sell AI systems. AIC certifies each product for transparency, bias testing, and human override capability." },
              ].map((div) => (
                <div key={div.num} className="group border-b border-aic-navy/10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-aic-navy/[0.02] transition-colors px-4">
                  <div className="flex items-center gap-8">
                    <span className="font-mono text-3xl text-aic-copper/40 group-hover:text-aic-copper transition-colors">0{div.num}</span>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-heading font-bold">{div.name}</h3>
                      <p className="text-aic-navy/60 font-sans max-w-xl">{div.desc}</p>
                    </div>
                  </div>
                  <Link href="/divisions" className="inline-flex items-center gap-2 text-aic-navy font-bold uppercase tracking-widest text-sm">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link href="/classify" className="inline-block border-2 border-aic-navy px-8 py-4 font-bold uppercase tracking-widest hover:bg-aic-navy hover:text-white transition-all">
                Take the 5-minute classification assessment
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: AIC Pulse */}
        <section className="py-24 lg:py-32 bg-aic-navy text-white">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-heading leading-tight">AIC Pulse — Decision Logging for AI Systems</h2>
                <p className="text-white/60 text-lg font-sans leading-relaxed">
                  Pulse is an SDK that creates an immutable audit trail of every AI decision your system makes. Three lines of code. No codebase access required. Every decision logged, timestamped, and human-reviewable.
                </p>
                <Link href="/waitlist" className="inline-block bg-aic-copper text-aic-navy px-8 py-4 font-bold uppercase tracking-widest hover:bg-aic-copper/90 transition-all">
                  Request early access
                </Link>
              </div>
              <div className="bg-aic-navy-mid p-8 border border-white/10 font-mono text-aic-copper text-sm">
                <pre className="whitespace-pre-wrap">
{`// Initialize AIC Pulse
const pulse = new AICPulse({ apiKey: process.env.AIC_KEY });

// Log automated decision
await pulse.log({
  decisionId: "loan_apr_4421",
  subjectId: "user_882",
  outcome: "approved",
  accountableHuman: "John Doe (Chief Risk Officer)"
});`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Regulatory Context */}
        <section className="py-24 lg:py-32 bg-white text-aic-navy">
          <div className="container max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-heading mb-20 text-center">Built Around the Regulations That Are Already Binding</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-aic-copper tracking-wider uppercase">PO71 (South Africa)</h3>
                <p className="font-sans text-aic-navy/70 leading-relaxed">
                  The Protection of Personal Information Act (POPIA) Section 71 regulates decisions based solely on automated processing. AIC operationalises this by ensuring &quot;human in the loop&quot; is not just a policy, but a verified reality.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-aic-copper tracking-wider uppercase">EU AI Act</h3>
                <p className="font-sans text-aic-navy/70 leading-relaxed">
                  With enforcement starting August 2, 2026, the EU AI Act imposes strict transparency and accountability requirements on high-risk systems. AIC certification maps directly to these extraterritorial obligations.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-aic-copper tracking-wider uppercase">ISO/IEC 42001</h3>
                <p className="font-sans text-aic-navy/70 leading-relaxed">
                  The international standard for AI Management Systems (AIMS). AIC&apos;s framework bridges the gap between management-level standards and the technical reality of decision accountability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Articles Teaser */}
        <section className="py-24 lg:py-32 bg-aic-navy/[0.02] border-y border-aic-navy/5">
          <div className="container max-w-7xl mx-auto px-6 text-aic-navy">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-heading mb-4">AIC Articles</h2>
                <p className="text-aic-navy/60 font-sans">Published thinking on algorithmic accountability.</p>
              </div>
              <Link href="/articles" className="font-bold uppercase tracking-widest text-sm border-b-2 border-aic-copper pb-1">
                View all articles
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { cat: "Governance", title: "POPIA Section 71: Why South African Boards Can No Longer Ignore Automated Decision-Making", date: "April 2026" },
                { cat: "Case Studies", title: "A Credit Rejection, an Algorithm, and No One to Call", date: "March 2026" },
                { cat: "Policy", title: "The EU AI Act Enforcement Begins August 2026. What South African Companies Need to Know.", date: "March 2026" },
              ].map((article, idx) => (
                <Link key={idx} href="/articles" className="group bg-white border border-aic-navy/10 p-8 space-y-6 hover:shadow-xl transition-all">
                  <span className="inline-block bg-aic-navy text-white text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-1">{article.cat}</span>
                  <h3 className="text-xl font-heading font-bold group-hover:text-aic-copper transition-colors">{article.title}</h3>
                  <div className="flex justify-between items-center text-[11px] font-mono text-aic-navy/40 uppercase tracking-widest">
                    <span>{article.date}</span>
                    <span className="group-hover:translate-x-2 transition-transform">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: Founding Partner Programme */}
        <section className="py-24 lg:py-32 bg-aic-navy text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-aic-copper/5 -skew-x-12 translate-x-1/2" />
          <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-heading mb-8">Founding Partner Programme</h2>
            <div className="space-y-12">
              <p className="text-white/60 text-lg font-sans leading-relaxed">
                We are building the standard. Join us now and your pricing is locked for life. When SANAS accreditation completes, Founding Partners receive a free upgrade to full certified status — at no additional cost.
              </p>
              
              <div className="bg-white/5 border border-white/10 p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-mono uppercase tracking-[0.15em] text-aic-copper">
                <div className="space-y-2">
                  <div className="text-white/40 text-[10px]">Investment</div>
                  <div className="text-white">ZAR 2,500/month</div>
                </div>
                <div className="space-y-2">
                  <div className="text-white/40 text-[10px]">Term</div>
                  <div className="text-white">12-Month Lock</div>
                </div>
                <div className="space-y-2">
                  <div className="text-white/40 text-[10px]">Accreditation</div>
                  <div className="text-white">Free Upgrade</div>
                </div>
              </div>

              <div className="pt-8">
                <Link href="/waitlist" className="inline-block bg-aic-copper text-aic-navy px-12 py-5 text-lg font-bold uppercase tracking-widest hover:bg-aic-copper/90 transition-all">
                  Apply for a Founding Partner Slot
                </Link>
                <p className="mt-8 text-white/30 text-xs font-sans italic">
                  We are currently in the Founding Partner phase. Full SANAS accreditation is a 12–24 month process. Partners who join now are investing in the standard, not just buying certification.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
