import { MusicLinks } from "@/components/MusicLinks";
import { siteConfig } from "@/constants/siteMetaData";
import { withBasePath } from "@/constants/basePath";
import config from "@/payload.config";
import { getPayload } from "payload";
import { notFound } from "next/navigation";

type TrackLinkItem = {
  amazon?: string;
  apple?: string;
  name: string;
  spotify?: string;
  video?: string;
  vk?: string;
  yandex?: string;
  youtube?: string;
  zvuk?: string;
};

type MusicPageItem = {
  amazon?: string;
  apple?: string;
  cardSubtitle?: string;
  cardType?: string;
  description?: string;
  group?: string;
  href: string;
  imageURL: string;
  name: string;
  releaseYear?: number;
  spotify?: string;
  type?: string;
  video?: string;
  vk?: string;
  yandex?: string;
  youtube?: string;
  zvuk?: string;
  items?: TrackLinkItem[];
};

const mapTrack = (track: any): TrackLinkItem => ({
  amazon: track?.amazon ?? undefined,
  apple: track?.apple ?? undefined,
  name: track?.name,
  spotify: track?.spotify ?? undefined,
  video: track?.video ?? undefined,
  vk: track?.vk ?? undefined,
  yandex: track?.yandex ?? undefined,
  youtube: track?.youtube ?? undefined,
  zvuk: track?.zvuk ?? undefined,
});

const mapReleaseDoc = (doc: any): MusicPageItem => {
  const cover = typeof doc.cover === "object" ? doc.cover : null;

  return {
    amazon: doc.amazon ?? undefined,
    apple: doc.apple ?? undefined,
    cardSubtitle: doc.cardSubtitle ?? undefined,
    cardType: doc.cardType ?? undefined,
    description: doc.description ?? undefined,
    group: doc.group ?? undefined,
    href: doc.href,
    imageURL: cover?.url || cover?.thumbnailURL || withBasePath("/cover.jpg"),
    items: Array.isArray(doc.items) ? doc.items.map(mapTrack) : undefined,
    name: doc.name,
    releaseYear: doc.releaseYear ?? undefined,
    spotify: doc.spotify ?? undefined,
    type: doc.type ?? undefined,
    video: doc.video ?? undefined,
    vk: doc.vk ?? undefined,
    yandex: doc.yandex ?? undefined,
    youtube: doc.youtube ?? undefined,
    zvuk: doc.zvuk ?? undefined,
  };
};

const mapLiveDoc = (doc: any): MusicPageItem => {
  const cover = typeof doc.cover === "object" ? doc.cover : null;

  return {
    amazon: doc.amazon ?? undefined,
    apple: doc.apple ?? undefined,
    cardSubtitle: doc.cardSubtitle ?? undefined,
    description: doc.description ?? undefined,
    href: doc.href,
    imageURL: cover?.url || cover?.thumbnailURL || withBasePath("/cover.jpg"),
    name: doc.name,
    spotify: doc.spotify ?? undefined,
    video: doc.video ?? undefined,
    vk: doc.vk ?? undefined,
    yandex: doc.yandex ?? undefined,
    youtube: doc.youtube ?? undefined,
    zvuk: doc.zvuk ?? undefined,
  };
};

const getMusicByHref = async (href: string): Promise<MusicPageItem | null> => {
  const payload = await getPayload({ config });

  const release = await payload.find({
    collection: "releases",
    depth: 2,
    limit: 1,
    where: {
      href: {
        equals: href,
      },
    },
  });

  if (release.docs[0]) {
    return mapReleaseDoc(release.docs[0]);
  }

  const live = await payload.find({
    collection: "live-orchestral-chamber",
    depth: 2,
    limit: 1,
    where: {
      href: {
        equals: href,
      },
    },
  });

  if (live.docs[0]) {
    return mapLiveDoc(live.docs[0]);
  }

  return null;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const [releases, live] = await Promise.all([
    payload.find({
      collection: "releases",
      pagination: false,
      select: {
        href: true,
      },
    }),
    payload.find({
      collection: "live-orchestral-chamber",
      pagination: false,
      select: {
        href: true,
      },
    }),
  ]);

  const all = [...releases.docs, ...live.docs];
  return all.map((item: any) => ({ href: item.href }));
}

// @ts-ignore
export async function generateMetadata({ params }) {
  const { href } = await params;
  const item = await getMusicByHref(decodeURIComponent(href));

  if (!item) {
    return {
      title: siteConfig.title_meta,
      description: siteConfig.description,
    };
  }

  const title = `${item.name} | ${siteConfig.title}`;
  const img = item.imageURL;
  const descr = item.description || siteConfig.description;

  return {
    title: item.name,
    description: item.description,
    keywords: `${siteConfig.keywords}, ${item.name}`,
    openGraph: {
      type: "website",
      url: `/music/${item.href}`,
      title,
      description: descr,
      images: [{ url: img }],
    },
    twitter: {
      card: "summary_large_image",
      title,
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
  const { href } = await params;
  const item = await getMusicByHref(decodeURIComponent(href));

  if (!item) {
    return notFound();
  }

  const subtitle = item.cardSubtitle || item.group?.trim() || "";
  const releaseYear = item.releaseYear ? String(item.releaseYear) : null;
  const releaseType = (item.cardType || item.type || "").toLowerCase();
  const descriptionParagraphs = item.description
    ? item.description
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];
  const trackCount = item.type === "album" && item.items ? item.items.length : 0;

  return (
    <div className="mx-auto mb-12 mt-12 max-w-screen-2xl px-6 md:px-12 xl:px-20 !text-stone-200">
      <section className="grid items-start gap-10 lg:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.08fr)] lg:gap-14 xl:gap-16">
        <div className="order-2 space-y-8 lg:order-2 lg:space-y-10">
          <header className="space-y-4">
            <h1 className="text-[1.52rem] leading-[1.04] tracking-tight font-semibold !text-stone-100 md:text-[clamp(1.82rem,3.9vw,3.25rem)] md:leading-[0.98]">
              {item.name}
            </h1>
            {subtitle && (
              <p className="text-[1.14rem] tracking-tight md:text-[1.42rem] !text-stone-400">
                {subtitle}
              </p>
            )}
            {(releaseYear || releaseType) && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.12rem] tracking-tight md:text-[1.26rem]">
                {releaseYear && (
                  <span className="font-semibold !text-stone-100">{releaseYear}</span>
                )}
                {releaseYear && releaseType && <span className="!text-stone-600">•</span>}
                {releaseType && (
                  <span className="lowercase !text-stone-400">{releaseType}</span>
                )}
              </div>
            )}
          </header>

          {descriptionParagraphs.length > 0 && (
            <div className="max-w-[72ch] space-y-4 text-[1.03rem] leading-[1.72] tracking-tight md:text-[1.13rem]">
              {descriptionParagraphs.map((paragraph, index) => (
                <p key={`${item.href}-paragraph-${index}`} className="!text-stone-300">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {item.type === "album" && item.items && item.items.length > 0 && (
            <section className="max-w-[78ch] pt-2">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] !text-stone-500">
                  Tracklist
                </p>
                <p className="text-xs uppercase tracking-[0.16em] !text-stone-600">
                  {trackCount} tracks
                </p>
              </div>
              <ol className="divide-y divide-stone-800/90 border-b border-t border-stone-800/90">
                {item.items.map((track, index) => (
                  <li
                    key={`${track.name}-${index}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3.5 md:py-4"
                  >
                    <span className="min-w-[2.35rem] text-[0.72rem] font-medium tracking-[0.2em] !text-stone-600">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="min-w-0 pr-2 text-[1.01rem] leading-snug tracking-tight !text-stone-200 md:text-[1.1rem]">
                      {track.name}
                    </span>
                    <div className="shrink-0 text-lg !text-stone-500 transition-colors duration-200 group-hover:!text-stone-300 md:text-xl">
                      <MusicLinks {...track} />
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className="order-1 space-y-5 lg:order-1 lg:sticky lg:top-24 lg:self-start">
          <img
            className="w-full rounded-2xl border border-stone-800/80 shadow-[0_26px_80px_-46px_rgba(0,0,0,0.95)]"
            src={item.imageURL}
            alt={item.name}
            width={1200}
            height={1200}
            style={{ height: "auto" }}
            loading="eager"
          />
          <div className="text-[1.95rem] md:text-[2.2rem] !text-stone-300">
            <MusicLinks {...item} />
          </div>
        </aside>
      </section>
    </div>
  );
}
