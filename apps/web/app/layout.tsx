import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { ClientLayout } from "./components/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiccertified.cloud"),
  title: {
    default: "AIC | Certifying the Human Behind the Algorithm",
    template: "%s | AIC",
  },
  description:
    "AIC is South Africa's first algorithmic accountability certification body. We certify that human empathy and accountability remain in every consequential automated decision. Anchored in POPIA Section 71.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://aiccertified.cloud",
    siteName: "AI Integrity Certification",
    title: "AIC | Certifying the Human Behind the Algorithm",
    description:
      "South Africa's first algorithmic accountability certification body. Certifying that humans stay in the loop for every consequential AI decision.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Integrity Certification — AIC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIC | Certifying the Human Behind the Algorithm",
    description:
      "South Africa's first algorithmic accountability certification body.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aiccertified.cloud",
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "32x32" },
      { url: "/icon?size=16", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/icon?size=180", type: "image/png", sizes: "180x180" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Integrity Certification (Pty) Ltd",
  alternateName: "AIC",
  url: "https://aiccertified.cloud",
  logo: "https://aiccertified.cloud/icon",
  description:
    "South Africa's first algorithmic accountability certification body, built on the five Algorithmic Rights.",
  foundingDate: "2026",
  foundingLocation: "Johannesburg, South Africa",
  areaServed: "ZA",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@aiccertified.cloud",
    contactType: "General Enquiries",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld"
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
