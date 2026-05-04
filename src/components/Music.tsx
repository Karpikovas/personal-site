import config from "@/payload.config";
import { getPayload } from "payload";
import { getMusicGroups } from "@/lib/music-feed";
import { MusicPreviewGroups } from "./MusicPreviewGroups";

export const Music = async ({
  previewCollection,
  previewId,
}: {
  previewCollection?: "live-orchestral-chamber" | "releases";
  previewId?: number;
}) => {
  const payload = await getPayload({ config });
  const groups = await getMusicGroups(payload);
  let previewDoc: any = null;

  if (previewCollection && typeof previewId === "number") {
    try {
      previewDoc = await payload.findByID({
        collection: previewCollection,
        id: previewId,
        depth: 1,
      });
    } catch {
      previewDoc = null;
    }
  }

  return (
    <MusicPreviewGroups
      groups={groups}
      previewCollection={previewCollection}
      previewDoc={previewDoc}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL}
    />
  );
};
