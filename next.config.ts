import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Dev-only: lets the LAN IP load dev JS chunks (HMR, bundles) so the site
  // actually hydrates when tested from a phone on the same Wi-Fi. Has no
  // effect on the static export build.
  allowedDevOrigins: ["10.0.0.30"],
};

export default nextConfig;
