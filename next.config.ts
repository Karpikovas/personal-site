import type { NextConfig } from "next";

const isPagesPreview = process.env.NEXT_PUBLIC_IS_PAGES_PREVIEW === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isUserPagesRepo = repositoryName.endsWith(".github.io");
const branchDir = process.env.NEXT_PUBLIC_PAGES_BRANCH_PATH || "";

const normalizePath = (value: string) => {
  const parts = value.split("/").filter(Boolean);
  if (!parts.length) return "";
  return `/${parts.join("/")}`;
};

const previewBasePath = isPagesPreview
  ? normalizePath(`${isUserPagesRepo ? "" : repositoryName}/${branchDir}`)
  : "";

const nextConfig: NextConfig = {
  basePath: previewBasePath || undefined,
  assetPrefix: previewBasePath || undefined,
  images: isPagesPreview
    ? {
        unoptimized: true,
      }
    : undefined,
  output: isPagesPreview ? "export" : undefined,
  experimental: {
    reactCompiler: true,
  },
  reactStrictMode: true,
  trailingSlash: isPagesPreview,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
