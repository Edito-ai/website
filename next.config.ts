import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The demo flow was replaced by early access for the 16 Oct launch.
  async redirects() {
    return [
      { source: "/demo", destination: "/early-access", permanent: true },
      { source: "/schedule-demo", destination: "/early-access", permanent: true },
      { source: "/api/submit-demo", destination: "/api/early-access", permanent: false },
    ];
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
