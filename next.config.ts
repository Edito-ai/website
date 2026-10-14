import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The demo / early-access flows were replaced by the plugin download.
  async redirects() {
    return [
      { source: "/demo", destination: "/download", permanent: true },
      { source: "/early-access", destination: "/download", permanent: true },
      { source: "/schedule-demo", destination: "/download", permanent: true },
    ];
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
