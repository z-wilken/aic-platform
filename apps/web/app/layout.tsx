import "./globals.css";
import { Metadata } from "next";
import { ClientLayout } from "./components/ClientLayout";

export const metadata: Metadata = {
  title: "AI Integrity Certification (Pty) Ltd",
  description: "The South African benchmark for human accountability in automated systems. We certify that human empathy remains in the loop.",
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
