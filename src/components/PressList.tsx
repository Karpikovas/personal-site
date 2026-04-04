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
    <div className="flex flex-col gap-8 container mt-16 mb-8 px-8 md:px-16 xl:px-48">
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight !text-stone-300">Press</h1>
      </div>
      {visiblePress.map((item) => (
        <Link
          key={item.created_date + item.name}
          href={item.href}
          target="_blank"
          className="fadeIn1 block w-100 p-3 sm:p-4 bg-white rounded-lg shadow hover:bg-stone-850 !bg-neutral-950 !border-stone-850 !hover:bg-stone-850"
        >
          <div className="flex align-items justify-between gap-8">
            <div className="flex flex-col w-2/3">
              <h5 className="mb-2 text-base sm:text-lg md:text-xl font-semibold tracking-tight !text-stone-300 dark:text-white trunc">
                {item.name}
              </h5>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 font-medium">{item.source}</p>
            </div>
            <div className="flex flex-col mb-2">
              <div className="relative">
                <Image
                  className="border border-stone-900 rounded-xl"
                  src={withBasePath(`/covers/${item.image}`)}
                  alt={item.image || ""}
                  width={100}
                  height={100}
                  sizes="100vw"
                  style={{ width: "100px", height: "100%" }}
                />
                <div className="lg:group-hover:flex flex-col justify-center align-center absolute px-10 py-12 text-center border border-stone-900 rounded-xl bottom-0 left-0 top-0 right-0 transition ease-in duration-300 bg-black/[.35]"></div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      <div ref={sentinelRef} className="h-10 w-full" aria-hidden />

      {hasMore && isLoading && <p className="text-sm !text-stone-500">Loading...</p>}
    </div>
  );
};
