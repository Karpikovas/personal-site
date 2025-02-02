import type { Metadata } from "next";
const DOMAIN = 'leylaromanova.com';

export const siteConfig = {
  title: 'Leyla Romanova',
  description: 'Leyla Romanova is a composer who creates music of different genres – from orchestral, chamber and neoclassical piano music to trance-techno',
  keywords: 'Leyla Romanova, composer, orchestral, chamber, neoclassical piano music, trance-techno, композитор, Лейла Романова, фортепианная неоклассика, оркестровые проиведения, техно',
  url: DOMAIN,
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
  },
}