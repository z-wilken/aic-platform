import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIC | Admin Factory",
  description: "AI Integrity Certification - Technical Audit & Compliance Management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${ibmPlexMono.variable} antialiased bg-black text-white font-sans`}
      >
        <Providers>
            {children}
            <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}