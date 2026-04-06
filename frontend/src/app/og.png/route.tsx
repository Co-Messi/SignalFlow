import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0A0A0F 0%, #111118 50%, #0A0A0F 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(0,232,123,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo + Signal icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2 12h4l3-8 4 16 3-10h6"
              stroke="#00E87B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ color: "#ffffff", fontSize: "28px", fontWeight: 600 }}>
            SignalFlow
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "56px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            AI-Powered
          </span>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              background: "linear-gradient(90deg, #00E87B, #00C9FF)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Trading Signals
          </span>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "40px",
          }}
        >
          {[
            { value: "524+", label: "Signals" },
            { value: "70%", label: "Accuracy" },
            { value: "7", label: "Strategies" },
            { value: "24/7", label: "Autonomous" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  color: "#00E87B",
                  fontSize: "32px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
              >
                {stat.value}
              </span>
              <span style={{ color: "#888888", fontSize: "14px", fontWeight: 500 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <span
          style={{
            position: "absolute",
            bottom: "32px",
            color: "#555555",
            fontSize: "16px",
          }}
        >
          signalflow-eight.vercel.app
        </span>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
