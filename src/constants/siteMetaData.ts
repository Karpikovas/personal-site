import type { Metadata } from "next";
const DOMAIN = 'leylaromanova.com';
const isSeoDisabled = process.env.NEXT_PUBLIC_DISABLE_SEO === "true";

export type SiteConfig = {
  title: string
  description: string
  keywords: string
  title_meta: string
  url: string
  image: string
}

export const buildSiteMetadata = (config: SiteConfig): Metadata => ({
  metadataBase: new URL(`https://${DOMAIN}`),
  title: {
    template: `%s | ${config.title}`,
    default: config.title,
  },
  description: config.description,
  keywords: config.keywords,
  robots: isSeoDisabled
    ? {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true,
        nosnippet: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          noarchive: true,
          nosnippet: true,
          "max-image-preview": "none",
          "max-video-preview": 0,
          "max-snippet": 0,
        },
      }
    : {
        index: true,
        follow: true,
      },
  alternates: isSeoDisabled
    ? undefined
    : {
        canonical: './',
      },
  openGraph: isSeoDisabled
    ? undefined
    : {
        type: 'website',
        url: config.url,
        title: config.title,
        description: config.description,
        images: [{ url: config.image }],
      },
  twitter: isSeoDisabled
    ? undefined
    : {
        card: 'summary_large_image',
        title: config.title,
        description: config.description,
        images: [config.image],
      },
})
