import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIC | AI Certification Institute",
  description:
    "The global standard for certifying the humans accountable for AI systems. ISO/IEC 42001 & ISO/IEC 17024 accredited certification body.",
  openGraph: {
    title: "AIC | AI Certification Institute",
    description:
      "Certifying the human behind the algorithm. IAF MLA accredited.",
    type: "website",
    siteName: "AI Certification Institute",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIC | AI Certification Institute",
    description:
      "Certifying the human behind the algorithm.",
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
    name: "AI Certification Institute (AIC)",
    url: "https://aic-cert.org",
    description:
      "The global standard for certifying the humans accountable for AI systems — ensuring transparency, accountability, and trust.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1225 Eye Street NW, Suite 550",
      addressLocality: "Washington",
      addressRegion: "DC",
      postalCode: "20005",
      addressCountry: "US",
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded at runtime, not build time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
      <body className="antialiased bg-white text-aic-navy font-sans">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
