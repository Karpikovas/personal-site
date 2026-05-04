"use client";

import { useEffect } from "react";
import { putPreviewLiveData } from "@/lib/preview-live-cache";

export const PreviewLiveStateCache = () => {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof window === "undefined") return;
      if (window.self === window.top) return;
      if (event.origin !== window.location.origin) return;

      const payload = event.data;
      if (!payload || typeof payload !== "object") return;
      if (payload.type !== "payload-live-preview") return;

      const collection = payload.collectionSlug || payload.globalSlug;
      const data = payload.data;
      const id = data?.id;

      if (!collection || id == null || !data) return;

      putPreviewLiveData({
        collection,
        data,
        id,
      });
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
};
