import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DivisionsPage() {
  const divisions = [
    {
      num: 1,
      name: "Sovereign",
      definition: "Your organisation uses no AI in operational decisions. AIC certifies that you've audited for Shadow AI and remain human-led.",
      examples: "Boutique legal firms, manual craft cooperatives, high-security data physical processing units.",
      assesses: "Inventory of all software tools, Shadow AI audit results, procurement policies, human-only decision declarations.",
      meaning: "Certification confirms that no automated processing is currently impacting stakeholder rights.",
      pricing: "Annual assessment, flat fee."
    },
    {
      num: 2,
      name: "Supervised",
      definition: "AI recommends. A named human decides. AIC certifies that your override processes are documented and real.",
      examples: "Medical diagnostic support teams, specialized credit committees, recruitment firms using ranking tools.",
      assesses: "Override logs, human-training records, tool confidence interval thresholds, intervention cadence.",
      meaning: "Certification confirms that the human retains final agency and actively validates AI outputs.",
      pricing: "AIC Pulse subscription + annual certification."
    },
    {
      num: 3,
      name: "Reviewed",
      definition: "AI decides. Humans review patterns and cases. AIC certifies that your review cadence and appeals process are functioning.",
      examples: "High-volume retail credit providers, e-commerce fraud detection units, insurance claims processing.",
      assesses: "Post-decision audit logs, appeals processing time, drift detection methodology, batch review outcomes.",
      meaning: "Certification confirms that human oversight is systemic and corrective actions are effective.",
      pricing: "AIC Pulse subscription + annual certification."
    },
    {
      num: 4,
      name: "Monitored",
      definition: "Systems operate autonomously. AIC certifies that your drift detection, escalation paths, and disclosure practices are sound.",
      examples: "Algorithmic trading desks, automated logistics routing, dynamic pricing systems.",
      assesses: "Technical fail-safes, real-time monitoring dashboard, emergency shutdown protocols, transparency disclosures.",
      meaning: "Certification confirms that autonomous systems operate within strict, monitored human-defined boundaries.",
      pricing: "AIC Pulse subscription + annual certification."
    },
    {
      num: 5,
      name: "Artificial",
      definition: "You build or sell AI systems. AIC certifies each product for transparency, bias testing, and human override capability.",
      examples: "SaaS AI vendors, foundation model developers, automated decision system consultants.",
      assesses: "Dataset provenance, bias testing results, API transparency, documentation (Model Cards), end-user override hooks.",
      meaning: "Certification confirms the product is built on accountability-first principles and enables client compliance.",
      pricing: "Per-product certification."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h1 className="text-aic-navy text-5xl md:text-6xl font-heading font-bold mb-8">
              The AIC Division Framework
            </h1>
            <p className="text-aic-navy/70 text-xl font-sans leading-relaxed">
              Every organisation that operates in a world with AI falls somewhere on this spectrum. Your Division determines your certification pathway, your assessment scope, and your AIC Pulse configuration.
            </p>
          </div>

          <div className="space-y-32">
            {divisions.map((div) => (
              <section key={div.num} className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-aic-navy/10 pt-16">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-4xl text-aic-copper">0{div.num}</span>
                    <h2 className="text-4xl font-heading font-bold text-aic-navy">{div.name}</h2>
                  </div>
                  <div className="inline-block bg-aic-navy text-white text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-1 mb-8">
                    Tier {div.num} Risk Profile
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-aic-navy/40">Definition</h3>
                    <p className="text-2xl font-sans text-aic-navy leading-relaxed">{div.definition}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-aic-navy/40">Typical Entities</h4>
                      <p className="text-aic-navy/70 font-sans">{div.examples}</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-aic-navy/40">AIC Assessment Scope</h4>
                      <p className="text-aic-navy/70 font-sans">{div.assesses}</p>
                    </div>
                  </div>

                  <div className="bg-aic-navy/[0.02] p-8 border border-aic-navy/5 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-aic-navy/40">Certification Outcome</h4>
                      <p className="text-aic-navy font-sans font-medium">{div.meaning}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-aic-navy/40">Pricing Model</h4>
                      <p className="text-aic-navy/70 font-sans text-sm">{div.pricing}</p>
                    </div>
                    <div className="pt-4">
                      <Link href="/classify" className="inline-flex items-center gap-2 bg-aic-navy text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-aic-copper transition-all">
                        Start my classification <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-32 p-12 bg-aic-navy text-white text-center space-y-8">
            <h2 className="text-3xl font-heading font-bold italic">
              &quot;Division is determined by your highest-autonomy AI system.&quot;
            </h2>
            <p className="text-white/60 font-sans max-w-2xl mx-auto">
              A company with one Division 4 system and five Division 2 systems is a Division 4 company. Your highest autonomy determines your overall risk profile and regulatory exposure.
            </p>
            <div className="pt-4">
              <Link href="/classify" className="inline-block bg-aic-copper text-aic-navy px-12 py-5 text-lg font-bold uppercase tracking-widest hover:bg-aic-copper/90 transition-all">
                Find Your Division
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
