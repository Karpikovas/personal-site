import type { Metadata } from "next";
import { BioSection } from "@/components/BioSection";
import { Music } from "@/components/Music";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/constants/siteMetaData";

export const metadata: Metadata = {
  title: siteConfig.title_meta,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: siteConfig.title_meta,
    description: siteConfig.description,
    images: [{ url: siteConfig.image }],
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ previewCollection?: string; previewId?: string }>;
}) {
  const { previewCollection, previewId } = await searchParams;
  const normalizedPreviewCollection =
    previewCollection === "releases" || previewCollection === "live-orchestral-chamber"
      ? previewCollection
      : undefined;
  const normalizedPreviewId = previewId ? Number(previewId) : NaN;
  const previewNumericId = Number.isFinite(normalizedPreviewId) ? normalizedPreviewId : undefined;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Leyla Romanova",
    url: "https://leylaromanova.com",
    image: "https://leylaromanova.com/cover-new.jpg",
    jobTitle: "Composer",
    description: siteConfig.description,
    sameAs: [
      "https://open.spotify.com/artist/57Urcz3Cz6tDGqr83lKlSO",
      "https://music.apple.com/ru/artist/leyla-romanova/1537459980",
      "https://music.yandex.ru/artist/10232907",
      "https://www.youtube.com/leylaromanova",
      "https://vk.com/artist/leylaromanova_",
    ],
  };

  return (
    <div className="fadeIn">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Photo />

      <div className="container mt-10 xl:mt-16 mb-6 xl:mb-12 mx-auto px-8 lg:px-20">
        <section id="releases" className="scroll-mt-28">
          <Music
            previewCollection={normalizedPreviewCollection}
            previewId={previewNumericId}
          />
        </section>

        <Reveal className="mt-16 md:mt-20 xl:mt-24">
          <BioSection />
        </Reveal>
      </div>
    </div>
  );
}
