"use client";
import type { MusicCardItem } from "@/lib/music-feed";
import { MusicLinks } from "./MusicLinks";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Group = ({
  name,
  items,
}: {
  name: string;
  items: MusicCardItem[];
  type?: "single" | "album";
}) => {
  const router = useRouter();

  return (
    <div className="mb-14 md:mb-20 xl:mb-24">
      <div className="flex flex-row gap-4 lg:gap-10 items-baseline mb-6 lg:mb-10">
        <h2 className="w-auto pb-2 tracking-tight text-lg md:text-2xl lg:text-3xl font-semibold text-nowrap !text-stone-300">
          {name}
        </h2>
        <hr className="w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 md:gap-x-14 xl:gap-x-20 gap-y-14 md:gap-y-16">
        {items.map((item) => {
          const metaType = item.cardType || (item.releaseYear ? item.type : "");
          const hasMeta = Boolean(item.releaseYear || metaType);
          const releaseHref = `/music/${item.href}`;
          const openRelease = () => router.push(releaseHref);
          const subtitle = item.cardSubtitle || (item.group ? item.group.trim() : "");
          const imageSrc = item.imageURL;

          return (
            <div key={item.name} className="w-full">
              <div
                className="inline-block w-full p-1 md:p-2 cursor-pointer"
                onClick={openRelease}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openRelease();
                  }
                }}
                role="link"
                tabIndex={0}
              >
                <h3 className="truncate !text-stone-100 font-[550] text-xl md:text-2xl">
                  {item.name}
                </h3>
                {subtitle && (
                  <p className="mt-0.5 truncate !text-stone-400 text-lg md:text-xl">
                    {subtitle}
                  </p>
                )}

                <div
                  className="relative mt-2 aspect-square overflow-hidden rounded-xl border border-stone-900 group/image"
                  onClick={openRelease}
                >
                  <Link
                    href={releaseHref}
                    className="absolute inset-0 z-10"
                    aria-label={`Open ${item.name}`}
                  />
                  <img
                    className="h-full w-full object-cover"
                    src={imageSrc}
                    alt={item.name}
                    width={1200}
                    height={1200}
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 hidden bg-black/[.9] p-4 text-center transition ease-in duration-300 lg:group-hover/image:flex lg:flex-col lg:items-center lg:justify-center"
                  >
                    <div className="pointer-events-auto z-20 mt-2 text-2xl !text-stone-300 xl:text-3xl">
                      <MusicLinks {...item} />
                    </div>
                    <div className="pointer-events-auto absolute bottom-2 right-2 z-20">
                      <Link
                        href={releaseHref}
                        className="rounded-full px-3 py-1 text-xs md:text-sm bg-stone-800 border-gray-600 hover:bg-stone-700 font-semibold !text-stone-200"
                        onClick={(event) => event.stopPropagation()}
                      >
                        More →
                      </Link>
                    </div>
                  </div>
                </div>

                {hasMeta && (
                  <div className="mt-1 flex items-end justify-between">
                    <span className="!text-stone-100 font-[550] text-xl md:text-2xl">
                      {item.releaseYear || ""}
                    </span>
                    <span className="!text-stone-400 text-lg md:text-xl font-medium lowercase tracking-wide">
                      {metaType}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
