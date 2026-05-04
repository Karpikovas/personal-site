const PREVIEW_LIVE_CACHE_KEY = "payload-live-preview-cache-v1";

type PreviewCacheMap = Record<string, any>;

const getDocKey = (collection: string, id: number | string) => `${collection}:${String(id)}`;

const readCacheMap = (): PreviewCacheMap => {
  if (typeof window === "undefined") return {};

  const raw = sessionStorage.getItem(PREVIEW_LIVE_CACHE_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as PreviewCacheMap;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
};

const writeCacheMap = (map: PreviewCacheMap) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PREVIEW_LIVE_CACHE_KEY, JSON.stringify(map));
};

export const putPreviewLiveData = ({
  collection,
  data,
  id,
}: {
  collection: string;
  data: any;
  id: number | string;
}) => {
  const cache = readCacheMap();
  cache[getDocKey(collection, id)] = data;
  writeCacheMap(cache);
};

export const getPreviewLiveData = ({
  collection,
  id,
}: {
  collection?: string;
  id?: number | string;
}): any | null => {
  if (!collection || id == null) return null;
  const cache = readCacheMap();
  return cache[getDocKey(collection, id)] ?? null;
};
