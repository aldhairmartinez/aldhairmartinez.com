import type { NextConfig } from "next";

// Optional, dev-only: your machine's LAN IP, only needed to test the dev
// server from another device (e.g. a phone) on the same Wi-Fi - lets that
// device load dev JS chunks (HMR, bundles) so the site actually hydrates.
// Set DEV_LAN_ORIGIN in .env.local (see .env.example); leave unset for
// localhost-only development. Has no effect on the static export build.
const devLanOrigin = process.env.DEV_LAN_ORIGIN;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: devLanOrigin ? [devLanOrigin] : [],
};

export default nextConfig;
