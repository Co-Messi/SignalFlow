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

const siteUrl = "https://signalflow-eight.vercel.app";
const title = "SignalFlow — AI-Powered Trading Signals";
const description =
  "Real-time trading signals from whale tracking, sentiment analysis, liquidation cascades, and funding rate arbitrage. 524+ signals, 70% accuracy, built by autonomous AI agents.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "trading signals",
    "crypto signals",
    "AI trading",
    "whale tracking",
    "sentiment analysis",
    "liquidation cascade",
    "funding rate arbitrage",
    "Bitcoin signals",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "SignalFlow",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "SignalFlow — AI-Powered Trading Signals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og.png`],
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
