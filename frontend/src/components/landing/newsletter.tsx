"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="animate-fade-in text-3xl sm:text-4xl font-bold tracking-tight">
            Stay Ahead of the Market
          </h2>
          <p className="animate-fade-in mt-4 text-muted">
            Get weekly signal summaries, strategy insights, and platform updates
            delivered to your inbox.
          </p>

          <div className="animate-slide-up mt-8" style={{ animationDelay: "0.1s" }}>
            {submitted ? (
              <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl border border-success/20 bg-success/5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-success"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
                <span className="text-sm text-foreground">
                  You&apos;re in. Watch your inbox for the next signal report.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-lg text-sm",
                    "bg-card border border-border text-foreground placeholder:text-muted-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50",
                    "transition-all duration-200"
                  )}
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
