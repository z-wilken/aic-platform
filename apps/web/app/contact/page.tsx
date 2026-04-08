import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AIC — South Africa's algorithmic accountability certification body. Enquire about Founding Partner status, certification, or the AI Governance Index.",
  alternates: { canonical: "https://aiccertified.cloud/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-aic-paper pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm font-mono tracking-widest text-aic-gold uppercase mb-4">
          Get in Touch
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-aic-navy mb-6 leading-tight">
          Contact AIC
        </h1>
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          Whether you're exploring Founding Partner status, enquiring about
          certification, or wanting to understand the AI Governance Index —
          we'd like to hear from you.
        </p>

        <div className="space-y-8">
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-sm font-mono tracking-widest text-aic-gold uppercase mb-2">
              Email
            </h2>
            <a
              href="mailto:zander@ztoaholdings.co.za"
              className="text-aic-navy text-lg font-medium hover:text-aic-gold transition-colors"
            >
              zander@ztoaholdings.co.za
            </a>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-sm font-mono tracking-widest text-aic-gold uppercase mb-2">
              Location
            </h2>
            <p className="text-aic-navy text-lg font-medium">
              Johannesburg, South Africa
            </p>
            <p className="text-gray-500 text-sm mt-1">
              15 Smit Street, Building 4 Unit 420, Johannesburg, Gauteng, 2000
            </p>
          </div>

          <div className="border-2 border-[#0f1f3d] rounded-lg p-6 bg-[#0f1f3d] text-white">
            <p className="text-xs font-mono tracking-widest text-[#f0b429] uppercase mb-2">
              Founding Partner Enquiry
            </p>
            <p className="text-white/80 mb-4 text-sm leading-relaxed">
              Join the first South African organisations defining the future of human-accountable AI.
              Founding Partners receive priority certification access, permanent rate protection, and
              direct input into AIC&apos;s standards committee.
            </p>
            <a
              href="mailto:zander@ztoaholdings.co.za?subject=Founding Partner Enquiry"
              className="inline-block bg-[#c9920a] hover:bg-[#b07d08] text-white font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-widest transition-all"
            >
              Enquire About Partnership
            </a>
            <p className="text-white/30 text-xs mt-3">Enquiries reviewed within 2 business days</p>
          </div>
        </div>
      </div>
    </main>
  );
}
