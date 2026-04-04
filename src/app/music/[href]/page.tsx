import {MusicLinks} from "@/components/MusicLinks";
import {getAllMusicHrefs, getByHref} from "@/constants/data";
import Image from "next/image";
import {notFound} from "next/navigation";
import {siteConfig} from "@/constants/siteMetaData";
import {withBasePath} from "@/constants/basePath";

export async function generateStaticParams() {
  return getAllMusicHrefs().map((href) => ({href}));
}

// or Dynamic metadata
// @ts-ignore
export async function generateMetadata({params}) {
  const {href} = await params;
  const item = getByHref(decodeURIComponent(href));

  const title = `${item?.name} | ${siteConfig.title}`;
  const img = item?.image ? withBasePath(`/covers/${item?.image}`) : '';
  const descr = item?.description ? item?.description : siteConfig.description;

  return {
    title: item?.name,
    description: item?.description,
    keywords: siteConfig.keywords + ', ' + item?.name,
    openGraph: {
      type: "website",
      url: item?.href,
      title: title,
      description: descr,
      images: [{url: img}],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: descr,
      images: [img],
    },
  };
}

export default async function PageMusic({
                                          params,
                                        }: {
  params: Promise<{ href: string }>;
}) {
  const {href} = await params;
  const item = getByHref(decodeURIComponent(href));

  if (!item) {
    return notFound();
  }

  const subtitle = item.cardSubtitle || item.group.trim();
  const releaseYear = item.releaseYear ? String(item.releaseYear) : null;
  const releaseType = (item.cardType || item.type || "").toLowerCase();
  const descriptionParagraphs = item.description
    ? item.description
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
    : [];

  return (
    <div className="mx-auto mt-12 mb-10 max-w-screen-2xl px-6 md:px-12 xl:px-20 !text-stone-200">
      <section className="grid gap-9 lg:grid-cols-[minmax(320px,560px)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
        <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Image
            className="w-full rounded-2xl border border-stone-800/80 shadow-[0_24px_80px_-42px_rgba(0,0,0,0.95)]"
            src={withBasePath("/covers/" + item.image)}
            alt={item.name}
            width={1200}
            height={1200}
            sizes="(max-width: 1024px) 100vw, 48vw"
            style={{height: "auto"}}
            priority
          />
          <div className="text-3xl md:text-4xl !text-stone-300">
            <MusicLinks {...item} />
          </div>
        </div>

        <div className="space-y-7 md:space-y-8">
          <header className="space-y-3 md:space-y-4">
            <h1 className="text-3xl leading-[1.08] tracking-tight font-semibold md:text-4xl xl:text-5xl !text-stone-100">
              {item.name}
            </h1>
            <p className="text-lg tracking-tight md:text-xl !text-stone-400">
              {subtitle}
            </p>
            {(releaseYear || releaseType) && (
              <div className="flex items-center gap-3 text-base md:text-lg">
                {releaseYear && (
                  <span className="font-semibold tracking-tight !text-stone-100">
                    {releaseYear}
                  </span>
                )}
                {releaseYear && releaseType && (
                  <span className="!text-stone-500">•</span>
                )}
                {releaseType && (
                  <span className="lowercase tracking-tight !text-stone-400">
                    {releaseType}
                  </span>
                )}
              </div>
            )}
          </header>

          {descriptionParagraphs.length > 0 && (
            <div className="space-y-4 text-base leading-relaxed tracking-tight md:text-lg md:leading-relaxed xl:text-[1.17rem] !text-stone-300">
              {descriptionParagraphs.map((paragraph, index) => (
                <p key={`${item.href}-paragraph-${index}`}>{paragraph}</p>
              ))}
            </div>
          )}

          {item.type === "album" && item.items && item.items.length > 0 && (
            <section className="space-y-3 md:space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] !text-stone-500">
                Tracklist
              </p>
              <ul className="space-y-1.5 md:space-y-2">
                {item.items.map((track, index) => (
                  <li
                    key={track.name}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-stone-800/70 bg-stone-950/45 px-3 py-2.5 transition-colors duration-200 hover:border-stone-700/90 hover:bg-stone-900/55 md:px-4"
                  >
                    <div className="min-w-0 text-base md:text-lg !text-stone-200">
                      <span className="mr-3 inline-flex w-7 justify-end !text-stone-500">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="tracking-tight">{track.name}</span>
                    </div>
                    <div className="shrink-0 text-lg md:text-xl !text-stone-400 transition-colors duration-200 group-hover:!text-stone-200">
                      <MusicLinks {...track} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
