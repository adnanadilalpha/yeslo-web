import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Yeslo. Send a quote. Get a yes.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const logo = readFileSync(join(process.cwd(), "public/brand/yeslo-lockup-light.svg")).toString("base64");
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
        <img src={`data:image/svg+xml;base64,${logo}`} width={280} height={112} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, letterSpacing: -3, lineHeight: 0.92, fontWeight: 600 }}>
          <div>Send a quote.</div>
          <div style={{ color: "#12805C" }}>Get a yes.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#5B6172" }}>Quotes clients say yes to.</div>
      </div>
    ),
    { ...size },
  );
}
