import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";

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
  title: "AIC | Internal Command",
  description: "Unified operations portal for AIC Certification and Intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${ibmPlexMono.variable} antialiased font-sans`}
      >
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
