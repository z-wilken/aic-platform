import "./globals.css";
import type { Metadata } from "next";
import { ClientLayout } from "./components/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiccertified.cloud"),
  title: {
    default: "AI Integrity Certification (Pty) Ltd | AIC",
    template: "%s | AIC",
  },
  description:
    "AIC is the world's premier accreditation body certifying the professionals accountable for AI — not just the machines. We establish the global standard for AI governance, ethics, and human accountability. POPIA Section 71 compliant.",
  keywords: [
    "AI certification",
    "AI governance",
    "POPIA Section 71",
    "human accountability",
    "AI ethics",
    "South Africa AI",
    "ISO IEC 42001",
    "AI integrity",
    "algorithmic accountability",
    "AI accreditation",
  ],
  authors: [{ name: "AI Integrity Certification (Pty) Ltd" }],
  creator: "AI Integrity Certification (Pty) Ltd",
  publisher: "AI Integrity Certification (Pty) Ltd",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://aiccertified.cloud",
    siteName: "AI Integrity Certification",
    title: "AI Integrity Certification | Certifying Human Accountability in AI",
    description:
      "AIC is the world's premier accreditation body certifying the professionals accountable for AI — not just the machines. Founding Partner slots now open.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Integrity Certification | Human Accountability in AI",
    description:
      "The global standard for AI governance, ethics, and human responsibility. POPIA Section 71 compliant.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aiccertified.cloud",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Integrity Certification (Pty) Ltd",
  alternateName: "AIC",
  url: "https://aiccertified.cloud",
  description:
    "The world's premier accreditation body certifying the professionals accountable for AI.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Johannesburg",
    addressCountry: "ZA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "integrity@aiccertified.cloud",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
