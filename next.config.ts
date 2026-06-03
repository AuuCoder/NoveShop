import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["shop.muyuai.top"],
    },
  },
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/store/:path*",
        destination: "/s/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
