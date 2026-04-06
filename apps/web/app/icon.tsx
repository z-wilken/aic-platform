import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1f3d",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#c9920a",
              fontSize: 13,
              fontWeight: 800,
              fontFamily: "sans-serif",
              letterSpacing: -0.5,
              lineHeight: 1,
              display: "flex",
            }}
          >
            AIC
          </div>
          <div
            style={{
              width: 20,
              height: 2,
              background: "#c9920a",
              marginTop: 3,
              borderRadius: 1,
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
