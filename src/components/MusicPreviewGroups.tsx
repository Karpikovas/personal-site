"use client";

import { useMemo } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";

import { Group } from "@/components/Group";
import { Reveal } from "@/components/Reveal";
import { getPreviewLiveData } from "@/lib/preview-live-cache";
import { mapDocToMusicCard, type MusicGroups } from "@/lib/music-feed";

type PreviewCollection = "live-orchestral-chamber" | "releases";

type MusicPreviewGroupsProps = {
  groups: MusicGroups;
  previewCollection?: PreviewCollection;
  previewDoc?: any | null;
  serverURL?: string;
};

const sections: Array<keyof MusicGroups> = ["RELEASES", "LIVE Orchestral & Chamber"];

const renderGroups = (groups: MusicGroups) => (
  <>
    {sections.map((key, index) => (
      <Reveal key={key} delay={index * 120}>
        <Group name={key} items={groups[key].items} type="single" />
      </Reveal>
    ))}
  </>
);

const MusicPreviewGroupsWithLive = ({
  groups,
  previewCollection,
  previewDoc,
  serverURL,
}: {
  groups: MusicGroups;
  previewCollection: PreviewCollection;
  previewDoc: any;
  serverURL: string;
}) => {
  const seededInitialData = useMemo(() => {
    const id = previewDoc?.id as number | undefined;
    const cached = getPreviewLiveData({ collection: previewCollection, id });
    if (!cached) return previewDoc;
    return { ...previewDoc, ...cached };
  }, [previewCollection, previewDoc]);

  const { data } = useLivePreview({
    depth: 1,
    initialData: seededInitialData,
    serverURL,
  });

  const nextGroups = useMemo<MusicGroups>(() => {
    const updatedCard = mapDocToMusicCard(data?.id ? data : seededInitialData, seededInitialData);
    const key = previewCollection === "releases" ? "RELEASES" : "LIVE Orchestral & Chamber";
    const items = groups[key].items;
    const index = items.findIndex((item) => item.id === updatedCard.id);

    if (index === -1) return groups;

    const nextItems = [...items];
    nextItems[index] = {
      ...nextItems[index],
      ...updatedCard,
    };

    return {
      ...groups,
      [key]: {
        ...groups[key],
        items: nextItems,
      },
    };
  }, [data, groups, previewCollection, seededInitialData]);

  return renderGroups(nextGroups);
};

export const MusicPreviewGroups = ({
  groups,
  previewCollection,
  previewDoc,
  serverURL,
}: MusicPreviewGroupsProps) => {
  const resolvedServerURL = useMemo(() => {
    const envURL = serverURL?.trim();
    if (envURL) return envURL;
    if (typeof window !== "undefined") return window.location.origin;
    return "http://localhost:3000";
  }, [serverURL]);

  if (!previewDoc?.id || !previewCollection) {
    return renderGroups(groups);
  }

  return (
    <MusicPreviewGroupsWithLive
      groups={groups}
      previewCollection={previewCollection}
      previewDoc={previewDoc}
      serverURL={resolvedServerURL}
    />
  );
};
