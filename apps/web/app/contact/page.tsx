import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with AI Integrity Certification (Pty) Ltd. Reach out about founding partner opportunities, certification, or general enquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-aic-paper">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-gray-400 hover:text-aic-navy transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <span className="text-aic-gold text-xs uppercase tracking-[0.3em] font-mono font-bold">
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl text-aic-navy mt-4 mb-6 font-serif italic leading-tight">
            Get in Touch
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
            Whether you&apos;re interested in becoming a Founding Partner, seeking certification, or have a general enquiry — we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <a
            href="mailto:integrity@aiccertified.cloud"
          className="flex items-start gap-4 p-7 bg-white border border-gray-100 rounded-2xl hover:border-aic-gold/40 hover:shadow-lg transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-aic-navy flex items-center justify-center shrink-0 group-hover:bg-aic-gold transition-colors">
              <Mail className="w-5 h-5 text-aic-gold group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                Email
              </div>
              <div className="text-aic-navy font-medium text-sm">
                integrity@aiccertified.cloud
              </div>
            </div>
          </a>

          <div className="flex items-start gap-4 p-7 bg-white border border-gray-100 rounded-2xl">
            <div className="w-11 h-11 rounded-xl bg-aic-navy flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-aic-gold" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                Location
              </div>
              <div className="text-aic-navy font-medium text-sm">
                Johannesburg, South Africa
              </div>
            </div>
          </div>
        </div>

        <div className="bg-aic-navy rounded-2xl p-8 sm:p-10 text-center">
          <Shield className="w-10 h-10 text-aic-gold mx-auto mb-4" />
          <h2 className="text-2xl text-white font-serif italic mb-3">
            Ready to become a Founding Partner?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Only 5 slots available. Lock in your R 3,000/month rate for life and help define the future of human-accountable AI in South Africa.
          </p>
          <Link
            href="/alpha-apply"
            className="inline-flex items-center gap-2 bg-aic-gold hover:bg-[#b07d08] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest font-mono text-xs transition-all shadow-xl shadow-aic-gold/20"
          >
            Apply for Founding Partner Slot
          </Link>
        </div>
      </div>
    </div>
  );
}
