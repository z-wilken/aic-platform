import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Mono } from "next/font/google";
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
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${ibmPlexMono.variable} antialiased bg-aic-bg text-aic-black font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
