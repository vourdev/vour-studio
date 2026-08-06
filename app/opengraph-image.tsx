import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          color: "#fafafa",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: -1 }}>VOUR</span>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#c6f24e",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Satori needs an explicit display on any element with more than one
              child, so the two-colour headline is a flex row that wraps. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 62,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            <span>Website, Dashboard, dan AI Automation&nbsp;</span>
            <span style={{ color: "#c6f24e" }}>untuk Bisnis Modern.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#a1a1aa" }}>
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
