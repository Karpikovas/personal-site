import type { Metadata } from "next";
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

export default function Home() {
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
        <Reveal className="mb-12 md:mb-16 xl:mb-20">
          <section id="bio" className="bio-shell rounded-2xl px-5 py-6 md:px-8 md:py-8 xl:px-10 xl:py-10">
            <h2 className="font-display text-2xl md:text-4xl tracking-tight !text-stone-100">Biography</h2>
            <p className="mt-4 text-base md:text-lg xl:text-xl !text-stone-300/95">
              <span className="font-display font-semibold !text-stone-100">Leyla Romanova</span> is a multi-genre
              composer whose work spans nearly the entire musical spectrum, from symphonic grandeur to cutting-edge
              electronic soundscapes.
              <br />
              <br />
              Her portfolio includes orchestral, chamber, and piano works, as well as experimental electronica,
              progressive techno, pop-jazz, and pop-rock. Rooted in the academic tradition of concert halls and
              handwritten scores, yet constantly evolving, she fuses orchestral textures with electronic pulses to
              craft cinematic worlds that evoke vivid imagery through powerful dramaturgy and atmosphere.
            </p>
          </section>
        </Reveal>

        <section id="releases" className="scroll-mt-28">
          <Music />
        </section>
      </div>
    </div>
  );
}
