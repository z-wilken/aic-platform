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
          </div>

          <div className="border-2 border-aic-navy rounded-lg p-6 bg-aic-navy text-white">
            <h2 className="text-sm font-mono tracking-widest text-aic-gold uppercase mb-2">
              Founding Partner Enquiry
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Founding Partners receive lifetime-locked pricing, a complimentary
              first-year audit, and the AIC Founding Partner trust mark.
              R 3,000/month. Limited to 10 partners.
            </p>
            <Link
              href="mailto:zander@ztoaholdings.co.za?subject=Founding Partner Enquiry"
              className="inline-block bg-aic-gold text-aic-navy font-semibold px-6 py-3 rounded-md text-sm hover:bg-aic-gold/90 transition-colors"
            >
              Express Interest
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
