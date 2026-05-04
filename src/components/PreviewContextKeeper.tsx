"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const STORAGE_KEY = "payload-preview-context";

type PreviewContext = {
  previewCollection: string;
  previewId: string;
};

const readStoredPreviewContext = (): null | PreviewContext => {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<PreviewContext>;
    if (!parsed.previewCollection || !parsed.previewId) return null;

    return {
      previewCollection: parsed.previewCollection,
      previewId: parsed.previewId,
    };
  } catch {
    return null;
  }
};

const writeStoredPreviewContext = (context: PreviewContext) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
};

export const PreviewContextKeeper = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.self === window.top) return;

    const previewCollection = searchParams.get("previewCollection")?.trim() || "";
    const previewId = searchParams.get("previewId")?.trim() || "";

    if (previewCollection && previewId) {
      writeStoredPreviewContext({ previewCollection, previewId });
      return;
    }

    const stored = readStoredPreviewContext();
    if (!stored) return;

    const next = new URLSearchParams(searchParams.toString());
    let shouldReplace = false;

    if (!previewCollection) {
      next.set("previewCollection", stored.previewCollection);
      shouldReplace = true;
    }

    if (!previewId) {
      next.set("previewId", stored.previewId);
      shouldReplace = true;
    }

    if (shouldReplace) {
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }
  }, [pathname, router, searchParams]);

  return null;
};
