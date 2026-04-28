import { PressList } from "@/components/PressList";
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

export default async function PressPage() {
  const payload = await getPayload({ config });
  const firstPage = await getPressFeedPage({
    payload,
    page: 1,
    limit: PRESS_FEED_LIMIT,
  });

  return (
    <PressList
      initialHasNextPage={firstPage.hasNextPage}
      initialNextPage={firstPage.nextPage}
      press={firstPage.items}
    />
  );
}
