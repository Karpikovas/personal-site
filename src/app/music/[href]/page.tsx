import { MusicLinks } from "@/components/MusicLinks";
import { getByHref } from "@/constants/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { siteConfig } from "@/constants/siteMetaData";

// or Dynamic metadata
// @ts-ignore
export async function generateMetadata({ params }) {
  const { href } = await params;
  const item = getByHref(href);

  const title = `${item?.name} | ${siteConfig.title}`;
  const img =  item?.image ? `/covers/${item?.image}` : ''

  return {
    title: item?.name,
    description: item?.description,
    keywords: siteConfig.keywords + ', ' + item?.name,
    openGraph: {
      type: "website",
      url: item?.href,
      title: title,
      description: item?.description,
      images: [{ url: img }],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: item?.description,
      images: [img],
    },
  };
}

export default async function PageMusic({
  params,
}: {
  params: Promise<{ href: string }>;
}) {
  const { href } = await params;
  const item = getByHref(href);

  if (!item) {
    return notFound();
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-6 xl:gap-16 lg:gap-8 mt-16 mb-8 max-w-screen-2xl px-8 md:px-16 xl:px-48 !text-stone-300">
      <ul className="md:hidden block mt-8">
        {item.type === "album" &&
          item.items &&
          item.items.map((item, index) => (
            <li
              key={item.name}
              className="text-lg flex justify-between mb-1 font-normal !text-stone-300"
            >
              <span>
                <span className="inline-flex font-medium w-6 !text-stone-300">
                  {index + 1}.
                </span>
                {item.name}
              </span>
              <MusicLinks {...item} />
            </li>
          ))}
      </ul>
      {item.description && (
        <div className="block mt-8 md:hidden pb-2 tracking-tight lg:text-l text-wrap !text-stone-300">
          {item.description}
        </div>
      )}
      <div className="md:basis-1/2">
        <Image
          className="border border-stone-900 rounded-xl mb-2"
          src={"/covers/" + item.image}
          alt={item.name}
          width={1200}
          height={1200}
          sizes="100vw"
          style={{ width: "1200px", height: "auto" }} // optional
        />
        <div className="text-4xl mt-5 !text-stone-300">
          <MusicLinks {...item} />
        </div>
      </div>
      <div className="md:basis-1/2">
        <h2 className="text-2xl pb-2 xl:pb-6 tracking-tight lg:text-3xl font-semibold text-wrap !text-stone-300s">
          {item.name}
        </h2>

        <h3 className="text-sm pb-2 tracking-tight lg:text-l font-semibold text-wrap !text-stone-300">
          {item.group.toUpperCase()}
        </h3>

        <hr className="my-4 xl:my-7" />
        {item.description && (
          <div className="hidden md:block pb-2 tracking-tight lg:text-l text-wrap !text-stone-300">
            {item.description}
          </div>
        )}

        <ul className="hidden md:block !text-stone-300">
          {item.type === "album" &&
            item.items &&
            item.items.map((item, index) => (
              <li
                key={item.name}
                className="text-xl flex justify-between mb-1 font-normal !text-stone-300"
              >
                <span>
                  <span className="inline-flex font-medium w-6 !text-stone-300">
                    {index + 1}.
                  </span>
                  {item.name}
                </span>
                <MusicLinks {...item} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
