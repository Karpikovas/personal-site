"use client";
import { BaseMusicItem } from "@/constants/data";
import Image from "next/image";
import { MusicLinks } from "./MusicLinks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Reveal } from "./Reveal";

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
    <section className="mb-14 md:mb-20 xl:mb-24">
      <div className="flex flex-row gap-4 lg:gap-10 items-baseline mb-7 lg:mb-11">
        <h2 className="font-display w-auto pb-2 tracking-tight text-xl md:text-3xl lg:text-4xl font-semibold text-nowrap !text-stone-200">
          {name}
        </h2>
        <hr className="w-full border-stone-700/60" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 md:gap-x-14 xl:gap-x-20 gap-y-14 md:gap-y-16">
        {items.map((item, index) => {
          const metaType = item.cardType || (item.releaseYear ? item.type : "");
          const hasMeta = Boolean(item.releaseYear || metaType);

          return (
            <Reveal key={item.href || item.name} className="w-full" delay={(index % 3) * 90}>
              <div
                className="group/card inline-block w-full p-1 md:p-2 cursor-pointer"
                onClick={() => router.push("music/" + item.href)}
              >
                <h3 className="truncate !text-stone-100 font-[550] text-xl md:text-2xl tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-0.5 truncate !text-stone-500 text-lg md:text-xl">
                  {item.cardSubtitle || item.group.trim()}
                </p>

                <div className="relative mt-2 aspect-square overflow-hidden rounded-xl border border-stone-800/80 shadow-[0_22px_40px_-28px_rgba(0,0,0,0.92)] group/image transition-transform duration-500 ease-out lg:group-hover/card:-translate-y-1">
                  <Image
                    className="w-full h-full object-cover transition-transform duration-700 ease-out lg:group-hover/image:scale-[1.04]"
                    src={"/covers/" + item.image}
                    alt={item.name}
                    width={1200}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="hidden lg:group-hover/image:flex flex-col justify-center items-center absolute inset-0 p-4 text-center transition ease-in duration-300 bg-black/[.82] backdrop-blur-[2px]">
                    <div className="mt-2 !text-stone-300 text-2xl xl:text-3xl">
                      <MusicLinks {...item} />
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Link
                        href={"music/" + item.href}
                        className="rounded-full px-3 py-1 text-xs md:text-sm bg-stone-800/90 border border-stone-600/70 hover:bg-stone-700 font-semibold !text-stone-200 transition-colors duration-300"
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
                    <span className="!text-stone-500 text-lg md:text-xl font-medium lowercase tracking-wide">
                      {metaType}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
