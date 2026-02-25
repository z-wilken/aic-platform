import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { Sidebar } from "./components/Sidebar";
import { getNavigation } from "@/lib/navigation";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIC Pulse | Compliance Dashboard",
  description: "Real-time AI integrity monitoring.",
  robots: "noindex, nofollow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await getNavigation();

  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable} antialiased bg-white text-[#0f1f3d] font-sans`}
      >
        <Providers>
          <div className="flex">
            <Sidebar navItems={navItems} />
            <main className="flex-1 ml-64 min-h-screen">
              {children}
            </main>
          </div>
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
