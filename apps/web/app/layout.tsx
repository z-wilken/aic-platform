import "./globals.css";
import { Metadata } from "next";
import { ClientLayout } from "./components/ClientLayout";

export const metadata: Metadata = {
  title: "AIC - AI Certification Institute",
  description: "The global standard for certifying the humans accountable for AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
