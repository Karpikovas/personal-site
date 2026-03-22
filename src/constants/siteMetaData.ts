import type { Metadata } from "next";
const DOMAIN = 'leylaromanova.com';

export const siteConfig = {
  title: 'Leyla Romanova',
  description: 'Official website of composer Leyla Romanova who creates music of different genres – from orchestral, chamber and neoclassical piano music to trance-techno.',
  keywords: 'Leyla Romanova, official website, composer, orchestral, chamber, neoclassical piano music, trance-techno, композитор, Лейла Романова, фортепианная неоклассика, оркестровые произведения, техно',
  title_meta: 'Leyla Romanova - composer - musical artist',
  siteName: 'Leyla Romanova Official',
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
  applicationName: siteConfig.title,
  authors: [{ name: siteConfig.title, url: `https://${DOMAIN}` }],
  creator: siteConfig.title,
  publisher: siteConfig.title,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: siteConfig.title ,
    description: siteConfig.description,
    images: [{ url: siteConfig.image }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.image],
  },
}
