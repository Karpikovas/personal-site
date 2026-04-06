"use client";

import type { PressItem } from "@/constants/data";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { withBasePath } from "@/constants/basePath";

const ITEMS_PER_PAGE = 10;

export const PressList = ({ press }: { press: PressItem[] }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const sentinelInView = useInView(sentinelRef, { margin: "0px 0px 320px 0px", amount: 0 });
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = visibleCount < press.length;
  const visiblePress = press.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    setIsLoading(false);
  }, [press.length]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    window.setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, press.length));
      setIsLoading(false);
    }, 180);
  }, [hasMore, isLoading, press.length]);

  useEffect(() => {
    if (!sentinelInView || !hasMore || isLoading) return;
    handleLoadMore();
  }, [sentinelInView, hasMore, isLoading, handleLoadMore]);

  return (
    <div className="container mt-16 mb-12 px-8 md:px-16 xl:px-48">
      <div className="mb-7 md:mb-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight !text-stone-100 md:text-5xl">Press</h1>
        <p className="mt-2 max-w-2xl text-sm !text-stone-400 md:text-base">
          Features, reviews, and interviews across international media.
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {visiblePress.map((item, index) => (
          <Link
            key={item.created_date + item.name}
            href={item.href}
            target="_blank"
            className="press-card-enter group relative block overflow-hidden rounded-2xl border border-stone-800/85 bg-black/70 px-4 py-4 transition-all duration-300 hover:border-stone-600/90 hover:bg-stone-950/82 md:px-6 md:py-5"
            style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 65}ms` }}
          >
            <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="min-w-0 flex-1">
                <h5 className="text-[1.03rem] font-semibold leading-snug tracking-tight !text-stone-100 md:text-[1.22rem]">
                  {item.name}
                </h5>
                {item.source && (
                  <p className="mt-2 whitespace-normal break-words text-[0.88rem] font-medium !text-stone-500/85 transition-colors duration-300 group-hover:!text-stone-300 md:text-[0.97rem]">
                    {item.source}
                  </p>
                )}
              </div>

              <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-xl border border-stone-800/90 md:h-[96px] md:w-[96px]">
                <Image
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={withBasePath(`/covers/${item.image}`)}
                  alt={item.image || ""}
                  width={192}
                  height={192}
                  sizes="(max-width: 768px) 84px, 96px"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/25" />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition duration-300 group-hover:ring-white/8" />
          </Link>
        ))}
      </div>

      <div ref={sentinelRef} className="h-10 w-full" aria-hidden />

      {hasMore && isLoading && <p className="text-sm !text-stone-500">Loading...</p>}
    </div>
  );
};
