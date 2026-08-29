import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site.config";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0d0d0c",
          backgroundImage:
            "linear-gradient(#2b2b28 1px, transparent 1px), linear-gradient(to right, #2b2b28 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "2px solid #b7b3a9",
            }}
          />
          <span style={{ fontSize: 22, color: "#a3a19c", letterSpacing: 2 }}>
            {siteConfig.domain.toUpperCase()}
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 64, color: "#efece5", fontWeight: 600 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#b7b3a9", marginTop: 12 }}>
          {siteConfig.role}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#6f6d67", marginTop: 40 }}>
          Observability · Cloud Infrastructure · DevOps/SRE · OpenTelemetry · AI
        </div>
      </div>
    ),
    { ...size }
  );
}
