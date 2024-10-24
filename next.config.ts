import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/personal-site",
  images: {
    unoptimized: true, // Disable default image optimization
  },
  output: "export", 
  reactStrictMode: true,
};

module.exports = nextConfig;