import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signal Dashboard — SignalFlow",
  description:
    "Live AI-generated trading signals: 524+ signals across 7 strategies with 70% accuracy. BTC, ETH, SOL, and more.",
  openGraph: {
    title: "Signal Dashboard — SignalFlow",
    description:
      "Live AI-generated trading signals: 524+ signals across 7 strategies with 70% accuracy.",
    images: [{ url: "https://signalflow-eight.vercel.app/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Signal Dashboard — SignalFlow",
    description:
      "Live AI-generated trading signals: 524+ signals across 7 strategies with 70% accuracy.",
    images: ["https://signalflow-eight.vercel.app/og.png"],
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
