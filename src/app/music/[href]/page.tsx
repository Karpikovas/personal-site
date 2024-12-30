import { MusicLinks } from "@/components/MusicLinks";
import { getByHref } from "@/constants/data";
import Image from "next/image";
import { notFound } from "next/navigation";

// or Dynamic metadata
export async function generateMetadata({ params }) {
  const { href } = await params;
  const item = getByHref(href);

  return {
    title: item?.name,
  }
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
    <div className="flex flex-col-reverse md:flex-row gap-16 mt-16 mb-8 px-8 xl:px-48">
      <ul className="md:hidden block">
        {item.type === "album" &&
          item.items &&
          item.items.map((item, index) => (
            <li
              key={item.name}
              className="text-xl flex justify-between mb-1 font-normal"
            >
              <span>
                <span className="inline-flex font-medium w-6">
                  {index + 1}.
                </span>
                {item.name}
              </span>
              <MusicLinks {...item} />
            </li>
          ))}
      </ul>
      <div className="md:basis-1/2">
        <Image
          className="border border-stone-900 rounded-xl mb-2"
          src={"/personal-site/covers/" + item.image}
          alt={item.name}
          width={1200}
          height={1200}
          sizes="100vw"
          priority
          style={{ width: "1200px", height: "auto" }} // optional
        />
        <div className="text-4xl mt-5">
          <MusicLinks {...item} />
        </div>
      </div>
      <div className="md:basis-1/2">
        <h2 className="pb-6 tracking-tight lg:text-3xl font-semibold text-wrap">
          {item.name}
        </h2>

        <h3 className="pb-2 tracking-tight lg:text-l font-semibold text-wrap">
          {item.group.toUpperCase()}
        </h3>

        <hr className="my-7" />
        {item.description && (
          <div className="pb-2 tracking-tight lg:text-l text-wrap">
            {item.description}
          </div>
        )}

        <ul className="hidden md:block">
          {item.type === "album" &&
            item.items &&
            item.items.map((item, index) => (
              <li
                key={item.name}
                className="text-xl flex justify-between mb-1 font-normal"
              >
                <span>
                  <span className="inline-flex font-medium w-6">
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
