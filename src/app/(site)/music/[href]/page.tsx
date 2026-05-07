import { MusicPagePreview } from "@/components/MusicPagePreview";
import { mapMusicDoc, type MusicCollectionSlug } from "@/lib/music-page";
import { getSiteConfig, mergeKeywords } from "@/lib/site-seo";
import config from "@/payload.config";
import { getPayload } from "payload";
import { notFound } from "next/navigation";

type MusicDocByHrefResult = {
  collection: MusicCollectionSlug;
  doc: any;
};

const getMusicDocByPreviewRef = async ({
  collection,
  id,
}: {
  collection?: string;
  id?: string;
}): Promise<MusicDocByHrefResult | null> => {
  if (
    collection !== "releases" &&
    collection !== "live-orchestral-chamber"
  ) {
    return null;
  }

  const normalizedId = id ? Number(id) : NaN;
  if (!Number.isFinite(normalizedId)) return null;

  const payload = await getPayload({ config });

  try {
    const doc = await payload.findByID({
      collection,
      id: normalizedId,
      depth: 2,
    });

    return {
      collection,
      doc,
    };
  } catch {
    return null;
  }
};

const getMusicDocByHref = async (href: string): Promise<MusicDocByHrefResult | null> => {
  const payload = await getPayload({ config });

  const release = await payload.find({
    collection: "releases",
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          href: {
            equals: href,
          },
        },
        {
          isVisible: {
            not_equals: false,
          },
        },
      ],
    },
  });

  if (release.docs[0]) {
    return {
      collection: "releases",
      doc: release.docs[0],
    };
  }

  const live = await payload.find({
    collection: "live-orchestral-chamber",
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          href: {
            equals: href,
          },
        },
        {
          isVisible: {
            not_equals: false,
          },
        },
      ],
    },
  });

  if (live.docs[0]) {
    return {
      collection: "live-orchestral-chamber",
      doc: live.docs[0],
    };
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
      where: {
        isVisible: {
          not_equals: false,
        },
      },
    }),
    payload.find({
      collection: "live-orchestral-chamber",
      pagination: false,
      select: {
        href: true,
      },
      where: {
        isVisible: {
          not_equals: false,
        },
      },
    }),
  ]);

  const all = [...releases.docs, ...live.docs];
  return all.map((item: any) => ({ href: item.href }));
}

// @ts-ignore
export async function generateMetadata({ params }) {
  const { href } = await params;
  const siteConfig = await getSiteConfig();
  const musicDoc = await getMusicDocByHref(decodeURIComponent(href));

  if (!musicDoc) {
    return {
      title: siteConfig.title_meta,
      description: siteConfig.description,
    };
  }

  const item = mapMusicDoc(musicDoc.collection, musicDoc.doc);

  const pageTitle = item.seoTitle || item.name;
  const title = `${pageTitle} | ${siteConfig.title}`;
  const img = item.imageURL;
  const descr = item.seoDescription || item.description || siteConfig.description;
  const canonical = `/music/${item.href}`;
  const keywords = mergeKeywords({
    globalKeywords: siteConfig.keywords,
    pageKeywords: item.keywords || item.name,
  });

  return {
    title: pageTitle,
    description: descr,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
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
  searchParams,
}: {
  params: Promise<{ href: string }>;
  searchParams: Promise<{ previewCollection?: string; previewId?: string }>;
}) {
  const { href } = await params;
  const { previewCollection, previewId } = await searchParams;

  const byPreviewRef = await getMusicDocByPreviewRef({
    collection: previewCollection,
    id: previewId,
  });

  const musicDoc = byPreviewRef ?? (await getMusicDocByHref(decodeURIComponent(href)));

  if (!musicDoc) {
    return notFound();
  }

  return (
    <MusicPagePreview
      collection={musicDoc.collection}
      id={musicDoc.doc?.id}
      initialDoc={musicDoc.doc}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL}
    />
  );
}
