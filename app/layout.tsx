import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Setup Vault",
  description: "Your professional trading setup library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{
        minHeight: '100vh',
        background: '#f8f8f8',
        fontFamily: 'var(--font-geist-sans), -apple-system, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        margin: 0,
        padding: 0,
      }}>
        {children}
      </body>
    </html>
  );
}