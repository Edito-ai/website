import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/site";

export const alt = "Broll — The operating system for autonomous video editing";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          backgroundImage:
            "radial-gradient(circle at 50% 120%, rgba(59,130,246,0.25), transparent 60%)",
        }}
      >
        <div
          style={{
            fontSize: 44,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: 24,
          }}
        >
          Agentic video editing
        </div>
        <div
          style={{
            fontSize: 200,
            fontWeight: 700,
            letterSpacing: -10,
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          Broll.
        </div>
        <div
          style={{
            fontSize: 40,
            color: "rgba(255,255,255,0.75)",
            marginTop: 36,
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size },
  );
}
