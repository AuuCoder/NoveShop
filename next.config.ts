import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["shop.muyuai.top"],
    },
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
