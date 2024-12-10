import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/personal-site",
  images: {
    unoptimized: true, // Disable default image optimization
  },
  output: "export", 
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;