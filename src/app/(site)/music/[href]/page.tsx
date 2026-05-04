import { MusicPagePreview } from "@/components/MusicPagePreview";
import { siteConfig } from "@/constants/siteMetaData";
import { mapMusicDoc, type MusicCollectionSlug } from "@/lib/music-page";
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
      href: {
        equals: href,
      },
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
      href: {
        equals: href,
      },
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
    }),
    payload.find({
      collection: "live-orchestral-chamber",
      pagination: false,
      select: {
        href: true,
      },
    }),
  ]);

  const all = [...releases.docs, ...live.docs];
  return all.map((item: any) => ({ href: item.href }));
}

// @ts-ignore
export async function generateMetadata({ params }) {
  const { href } = await params;
  const musicDoc = await getMusicDocByHref(decodeURIComponent(href));

  if (!musicDoc) {
    return {
      title: siteConfig.title_meta,
      description: siteConfig.description,
    };
  }

  const item = mapMusicDoc(musicDoc.collection, musicDoc.doc);

  const title = `${item.name} | ${siteConfig.title}`;
  const img = item.imageURL;
  const descr = item.description || siteConfig.description;
  const canonical = `/music/${item.href}`;
  const keywords = item.keywords || `${siteConfig.keywords}, ${item.name}`;

  return {
    title: item.name,
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
