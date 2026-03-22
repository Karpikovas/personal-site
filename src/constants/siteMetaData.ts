import type { Metadata } from "next";
const DOMAIN = 'leylaromanova.com';
const isSeoDisabled = process.env.NEXT_PUBLIC_DISABLE_SEO === "true";

export const siteConfig = {
  title: 'Leyla Romanova',
  description: 'Official website of composer Leyla Romanova who creates music of different genres – from orchestral, chamber and neoclassical piano music to trance-techno.',
  keywords: 'Leyla Romanova, official website, composer, orchestral, chamber, neoclassical piano music, trance-techno, композитор, Лейла Романова, фортепианная неоклассика, оркестровые произведения, техно',
  title_meta: 'Leyla Romanova - composer - musical artist',
  url: '/',
  image: `/preview.jpg`,
}

export const metadata: Metadata = {
  metadataBase: new URL(`https://${DOMAIN}`),
  title: {
    template: `%s | ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
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
        url: siteConfig.url,
        title: siteConfig.title ,
        description: siteConfig.description,
        images: [{ url: siteConfig.image }],
      },
  twitter: isSeoDisabled
    ? undefined
    : {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.image],
      },
}
