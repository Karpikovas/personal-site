import { cache } from "react";
import { getPayload } from "payload";

import type { SiteConfig } from "@/constants/siteMetaData";
import config from "@/payload.config";

const FALLBACK_SITE_CONFIG: SiteConfig = {
  title: "Leyla Romanova",
  description:
    "Official website of composer Leyla Romanova who creates cinematic music across multiple genres: symphonic, electronic, jazz and beyond.",
  keywords:
    "Leyla Romanova, official website, composer, cinematic music, multi-genre, symphonic music, electronic music, jazz, композитор, Лейла Романова",
  title_meta: "Leyla Romanova - composer - musical artist",
};

const normalizeString = (value: unknown, fallback: string): string => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
};

const toSiteConfig = (value: any): SiteConfig => ({
  title: normalizeString(value?.title, FALLBACK_SITE_CONFIG.title),
  description: normalizeString(value?.description, FALLBACK_SITE_CONFIG.description),
  keywords: normalizeString(value?.keywords, FALLBACK_SITE_CONFIG.keywords),
  title_meta: normalizeString(value?.title_meta, FALLBACK_SITE_CONFIG.title_meta),
});

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  try {
    const payload = await getPayload({ config });
    const siteSEO = await (payload as any).findGlobal({
      slug: "site-seo",
    });

    return toSiteConfig(siteSEO);
  } catch {
    return FALLBACK_SITE_CONFIG;
  }
});

const splitKeywords = (value: string): string[] =>
  value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

export const mergeKeywords = ({
  globalKeywords,
  pageKeywords,
}: {
  globalKeywords: string;
  pageKeywords?: string | null;
}): string => {
  const result: string[] = [];
  const seen = new Set<string>();

  for (const keyword of [...splitKeywords(globalKeywords), ...splitKeywords(pageKeywords || "")]) {
    const key = keyword.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(keyword);
  }

  return result.join(", ");
};
