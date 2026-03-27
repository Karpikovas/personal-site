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
          <section id="bio" className="bio-shell rounded-[1.65rem] px-5 py-6 md:px-8 md:py-8 xl:px-10 xl:py-10">
            <div className="bio-content grid gap-8 md:gap-9 xl:grid-cols-[0.9fr_1.1fr] xl:gap-12">
              <div className="space-y-5 md:space-y-6">
                <p className="bio-kicker">About composer</p>
                <p className="bio-intro text-base md:text-lg xl:text-xl !text-stone-200/95">
                  <span className="font-display font-semibold !text-stone-100 md:text-xl xl:text-3xl">Leyla Romanova</span> is a
                  multi-genre composer whose work spans nearly the entire musical spectrum, from{" "}
                  <span className="whitespace-nowrap">symphonic grandeur</span>
                  to <span className="whitespace-nowrap">cutting-edge</span> electronic soundscapes.
                </p>
                <div className="bio-tags xl:pt-4">
                  <span className="bio-tag">Cinematic</span>
                  <span className="bio-tag">Electronic</span>
                  <span className="bio-tag">Chamber</span>
                  <span className="bio-tag">Orchestral</span>
                </div>
              </div>

              <div className="pt-4 md:pt-10 xl:pt-12 space-y-5 md:space-y-6 text-base md:text-lg xl:text-xl !text-stone-300/95">
                <p>
                  Her portfolio includes orchestral, chamber, and piano works, as well as experimental electronica,
                  progressive techno, pop-jazz, and pop-rock.
                </p>
                <p>
                  Rooted in the academic tradition of concert halls and handwritten scores, yet constantly evolving, she now fuses orchestral textures with electronic pulses to craft cinematic worlds that evoke vivid imagery through powerful dramaturgy and atmosphere — a vision that has earned her numerous international awards.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <section id="releases" className="scroll-mt-28">
          <Music />
        </section>
      </div>
    </div>
  );
}
