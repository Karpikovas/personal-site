import type { MetadataRoute } from "next";

const isSeoDisabled = process.env.NEXT_PUBLIC_DISABLE_SEO === "true";

export default function robots(): MetadataRoute.Robots {
  if (isSeoDisabled) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}

