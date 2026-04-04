import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Integrity Certification (Pty) Ltd";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f1f3d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "#c9920a",
            fontSize: 13,
            letterSpacing: 6,
            marginBottom: 32,
            textTransform: "uppercase",
          }}
        >
          South African Standard · POPIA Compliant
        </div>
        <div
          style={{
            color: "white",
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 28,
          }}
       >
          AI Integrity
          <br />
          Certification
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
            maxWidth: 680,
            lineHeight: 1.55,
          }}
        >
          The global standard for AI governance, ethics, and human
          accountability.
        </div>
        <div
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#c9920a",
            }}
          />
          <div
            style={{
              color: "#c9920a",
              fontSize: 16,
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            aiccertified.cloud
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
