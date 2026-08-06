import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the wordmark's accent dot on the brand's off-black. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          color: "#c6f24e",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        V
      </div>
    ),
    size,
  );
}
