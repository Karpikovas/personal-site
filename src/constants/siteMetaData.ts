import type { Metadata } from "next";
const DOMAIN = 'leylaromanova.com';

export const siteConfig = {
  title: 'Leyla Romanova',
  description: 'Official website of composer Leyla Romanova who creates music of different genres – from orchestral, chamber and neoclassical piano music to trance-techno.',
  keywords: 'Leyla Romanova, official website, composer, orchestral, chamber, neoclassical piano music, trance-techno, композитор, Лейла Романова, фортепианная неоклассика, оркестровые произведения, техно',
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
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.title,
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