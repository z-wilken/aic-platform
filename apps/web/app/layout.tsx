import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import PageProgress from "./components/PageProgress";
import ScrollToTop from "./components/ScrollToTop";

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
  description: "The first POPIA Section 71 compliant accountability certification for South African AI. No robot judges.",
  keywords: ["AI certification", "algorithmic accountability", "POPIA", "AI ethics", "machine learning audit", "AI transparency"],
  authors: [{ name: "AI Integrity Certification" }],
  openGraph: {
    title: "AIC | No Robot Judges",
    description: "The global standard for algorithmic accountability. If your AI decides a human fate, it must have human empathy in the loop.",
    type: "website",
    locale: "en_ZA",
    siteName: "AI Integrity Certification",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIC | No Robot Judges",
    description: "The global standard for algorithmic accountability.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${crimsonPro.variable} ${ibmPlexMono.variable} antialiased bg-aic-paper text-aic-black font-sans`}
      >
        <PageProgress />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
