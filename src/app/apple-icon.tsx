import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Mirrors icon.svg: dark tile, serif-italic B, accent dot.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            color: "#f4f4f2",
            marginRight: 14,
            marginBottom: 10,
          }}
        >
          B
        </div>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 9999,
            background: "#3c5eff",
            marginTop: 46,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
