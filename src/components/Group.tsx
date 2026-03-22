"use client";
import { BaseMusicItem } from "@/constants/data";
import Image from "next/image";
import { MusicLinks } from "./MusicLinks";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Group = ({
  name,
  items,
}: {
  name: string;
  items: BaseMusicItem[];
  isMain: boolean;
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

          return (
            <div key={item.name} className="w-full">
              <div
                className="inline-block w-full p-1 md:p-2 cursor-pointer"
                onClick={() => router.push("music/" + item.href)}
              >
                <h3 className="truncate !text-stone-100 font-[550] text-xl md:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-0.5 truncate !text-stone-400 text-lg md:text-xl">
                  {item.cardSubtitle || item.group.trim()}
                </p>

                <div className="relative mt-2 aspect-square overflow-hidden rounded-xl border border-stone-900 group/image">
                  <Image
                    className="w-full h-full object-cover"
                    src={"/covers/" + item.image}
                    alt={item.name}
                    width={1200}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="hidden lg:group-hover/image:flex flex-col justify-center items-center absolute inset-0 p-4 text-center transition ease-in duration-300 bg-black/[.9]">
                    <div className="mt-2 !text-stone-300 text-2xl xl:text-3xl">
                      <MusicLinks {...item} />
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Link
                        href={"music/" + item.href}
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
