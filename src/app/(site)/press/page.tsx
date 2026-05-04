import { PressPagePreview } from "@/components/PressPagePreview";
import type { Metadata } from "next";
import config from "@/payload.config";
import { getPayload } from "payload";
import { getPressFeedPage, PRESS_FEED_LIMIT } from "@/lib/press-feed";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press features, reviews, and interviews about composer Leyla Romanova and her latest releases.",
  alternates: {
    canonical: "/press",
  },
};

export default async function PressPage({
  searchParams,
}: {
  searchParams: Promise<{ previewCollection?: string; previewId?: string }>;
}) {
  const { previewCollection, previewId } = await searchParams;
  const payload = await getPayload({ config });
  const firstPage = await getPressFeedPage({
    payload,
    page: 1,
    limit: PRESS_FEED_LIMIT,
  });
  let previewDoc: any = null;

  const normalizedPreviewId = previewId?.trim();
  if (previewCollection === "press" && normalizedPreviewId) {
    const previewDocId = Number(normalizedPreviewId);
    if (Number.isFinite(previewDocId)) {
      try {
        previewDoc = await payload.findByID({
          collection: "press",
          id: previewDocId,
          depth: 2,
        });
      } catch {
        previewDoc = null;
      }
    }
  }

  return (
    <PressPagePreview
      initialHasNextPage={firstPage.hasNextPage}
      initialNextPage={firstPage.nextPage}
      press={firstPage.items}
      previewDoc={previewDoc}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL}
    />
  );
}
