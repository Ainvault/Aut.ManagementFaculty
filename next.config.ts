import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  // Babel React Compiler is heavy in Docker/CI; keep it for local `next dev`.
  reactCompiler: process.env.DISABLE_REACT_COMPILER !== "1",
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
  async redirects() {
    return [
      {
        source: "/faculty",
        destination: "https://mst.aut.ac.ir/content/31094/شبکه-اساتید",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
