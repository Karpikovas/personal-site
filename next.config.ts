import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: "/personal-site",
  images: {
    unoptimized: true, // Disable default image optimization
  },
  experimental: {    
    reactCompiler: true,  
  },
  // output: "standalone", 
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;