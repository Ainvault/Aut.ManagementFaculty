import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  // Babel React Compiler is heavy in Docker/CI; keep it for local `next dev`.
  reactCompiler: process.env.DISABLE_REACT_COMPILER !== "1",
  // Skip lint during CI image builds (lint can still run in a separate job later).
  eslint: {
    ignoreDuringBuilds: process.env.CI_FAST_BUILD === "1",
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
