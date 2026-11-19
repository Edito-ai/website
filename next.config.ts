import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi-Fi load the dev server by LAN IP.
  allowedDevOrigins: ["192.168.1.4"],
  // Demo and early-access flows are retired: Chat is live, so old links land on home.
  async redirects() {
    return [
      { source: "/demo", destination: "/", permanent: true },
      { source: "/schedule-demo", destination: "/", permanent: true },
      { source: "/early-access", destination: "/", permanent: true },
    ];
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
