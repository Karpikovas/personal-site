"use client";

import { useMemo } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";

import { mapPressDocToListItem, type PressListItem } from "@/lib/press-feed";
import { PressList } from "@/components/PressList";

type BaseProps = {
  initialHasNextPage: boolean;
  initialNextPage: number | null;
  press: PressListItem[];
};

type PressPagePreviewProps = BaseProps & {
  previewDoc?: any | null;
  serverURL?: string;
};

const PressPagePreviewWithLive = ({
  initialHasNextPage,
  initialNextPage,
  press,
  previewDoc,
  serverURL,
}: BaseProps & { previewDoc: any; serverURL: string }) => {
  const { data } = useLivePreview({
    depth: 2,
    initialData: previewDoc,
    serverURL,
  });

  const livePreviewItem =
    data?.id && data.id === previewDoc.id
      ? mapPressDocToListItem(data, previewDoc)
      : mapPressDocToListItem(previewDoc);

  return (
    <PressList
      initialHasNextPage={initialHasNextPage}
      initialNextPage={initialNextPage}
      press={press}
      livePreviewItem={livePreviewItem}
    />
  );
};

export const PressPagePreview = ({
  initialHasNextPage,
  initialNextPage,
  press,
  previewDoc,
  serverURL,
}: PressPagePreviewProps) => {
  const resolvedServerURL = useMemo(() => {
    const envURL = serverURL?.trim();
    if (envURL) return envURL;
    if (typeof window !== "undefined") return window.location.origin;
    return "http://localhost:3000";
  }, [serverURL]);

  if (!previewDoc?.id) {
    return (
      <PressList
        initialHasNextPage={initialHasNextPage}
        initialNextPage={initialNextPage}
        press={press}
      />
    );
  }

  return (
    <PressPagePreviewWithLive
      initialHasNextPage={initialHasNextPage}
      initialNextPage={initialNextPage}
      press={press}
      previewDoc={previewDoc}
      serverURL={resolvedServerURL}
    />
  );
};
