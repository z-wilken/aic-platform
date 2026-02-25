import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import HQShell from "./components/HQShell";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIC HQ | Corporate Operating System",
  description: "Internal command and control for AI Integrity Certification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable} antialiased bg-aic-navy text-white font-sans selection:bg-aic-copper selection:text-white`}
      >
        <Providers>
            <HQShell>
                {children}
            </HQShell>
            <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
