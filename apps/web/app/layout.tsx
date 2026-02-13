import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIC | AI Integrity Certification",
  description: "The first POPIA Section 71 compliant accountability certification for South African AI.",
  openGraph: {
    title: "AIC | AI Integrity Certification",
    description: "Validate your AI accountability. POPIA Section 71 Compliant.",
    type: "website",
    locale: "en_ZA",
    siteName: "AI Integrity Certification",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIC | AI Integrity Certification",
    description: "Validate your AI accountability.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Integrity Certification (AIC)",
    "url": "https://aic.co.za",
    "logo": "https://aic.co.za/logo.png",
    "description": "The national authority for AI Integrity & Compliance in South Africa, aligning with POPIA Section 71.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ZA"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AIC Certification Tiers",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tier 1: Critical Accountability",
            "description": "Highest level of certification for AI systems with significant human rights impact."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tier 2: Elevated Supervision",
            "description": "Rigorous monitoring and human-in-the-loop requirements for medium-risk systems."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tier 3: Standard Governance",
            "description": "Base-level certification for standard business AI integrations."
          }
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${crimsonPro.variable} ${ibmPlexMono.variable} antialiased bg-aic-bg text-aic-black font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
