import { ImageResponse } from "next/og";

export const alt = "Yeslo. Send a quote. Get a yes.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F7F4",
          color: "#111426",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#12805C",
              color: "#F7F7F4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
            }}
          >
            Y
          </div>
          Yeslo
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, letterSpacing: -3, lineHeight: 0.95 }}>
          <div>Send a quote.</div>
          <div style={{ color: "#12805C" }}>Get a yes.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#5B6172" }}>Proposals and estimates for iOS. The client never makes an account.</div>
      </div>
    ),
    { ...size },
  );
}
