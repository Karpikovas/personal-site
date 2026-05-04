import { withBasePath } from "@/constants/basePath";
import { resolveUploadURL } from "@/lib/media-url";

export type MusicCollectionSlug = "live-orchestral-chamber" | "releases";

export type TrackLinkItem = {
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

export type MusicPageItem = {
  amazon?: string;
  apple?: string;
  cardSubtitle?: string;
  cardType?: string;
  description?: string;
  group?: string;
  href: string;
  imageURL: string;
  items?: TrackLinkItem[];
  keywords?: string;
  name: string;
  releaseYear?: number;
  spotify?: string;
  type?: string;
  video?: string;
  vk?: string;
  yandex?: string;
  youtube?: string;
  zvuk?: string;
};

const getDocLink = (doc: any, key: string) => {
  const grouped = doc?.links?.[key];
  if (grouped != null && grouped !== "") return grouped;

  const flat = doc?.[key];
  if (flat != null && flat !== "") return flat;

  return undefined;
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

export const mapReleaseDoc = (doc: any, fallbackDoc?: any): MusicPageItem => {
  const imageURL =
    resolveUploadURL(doc?.cover) ||
    resolveUploadURL(fallbackDoc?.cover) ||
    withBasePath("/cover.jpg");

  return {
    amazon: getDocLink(doc, "amazon"),
    apple: getDocLink(doc, "apple"),
    cardSubtitle: doc?.cardSubtitle ?? undefined,
    cardType: doc?.cardType ?? undefined,
    description: doc?.description ?? undefined,
    group: doc?.group ?? undefined,
    href: doc?.href,
    imageURL,
    items: Array.isArray(doc?.items) ? doc.items.map(mapTrack) : undefined,
    keywords: doc?.keywords ?? undefined,
    name: doc?.name,
    releaseYear: doc?.releaseYear ?? undefined,
    spotify: getDocLink(doc, "spotify"),
    type: doc?.type ?? undefined,
    video: getDocLink(doc, "video"),
    vk: getDocLink(doc, "vk"),
    yandex: getDocLink(doc, "yandex"),
    youtube: getDocLink(doc, "youtube"),
    zvuk: getDocLink(doc, "zvuk"),
  };
};

export const mapLiveDoc = (doc: any, fallbackDoc?: any): MusicPageItem => {
  const imageURL =
    resolveUploadURL(doc?.cover) ||
    resolveUploadURL(fallbackDoc?.cover) ||
    withBasePath("/cover.jpg");

  return {
    amazon: getDocLink(doc, "amazon"),
    apple: getDocLink(doc, "apple"),
    cardSubtitle: doc?.cardSubtitle ?? undefined,
    description: doc?.description ?? undefined,
    href: doc?.href,
    imageURL,
    keywords: doc?.keywords ?? undefined,
    name: doc?.name,
    spotify: getDocLink(doc, "spotify"),
    video: getDocLink(doc, "video"),
    vk: getDocLink(doc, "vk"),
    yandex: getDocLink(doc, "yandex"),
    youtube: getDocLink(doc, "youtube"),
    zvuk: getDocLink(doc, "zvuk"),
  };
};

export const mapMusicDoc = (
  collection: MusicCollectionSlug,
  doc: any,
  fallbackDoc?: any,
): MusicPageItem => (collection === "releases" ? mapReleaseDoc(doc, fallbackDoc) : mapLiveDoc(doc, fallbackDoc));
