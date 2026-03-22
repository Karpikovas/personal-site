import { getPress } from "@/constants/data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press",
};

const ITEMS_PER_PAGE = 10;

const buildPagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

export default async function PressPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const press = getPress();

  const requestedPage = Number.parseInt(params.page || "1", 10);
  const safeRequestedPage = Number.isNaN(requestedPage) ? 1 : requestedPage;
  const totalPages = Math.max(1, Math.ceil(press.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(safeRequestedPage, 1), totalPages);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const visiblePress = press.slice(start, end);
  const paginationItems = buildPagination(currentPage, totalPages);

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
              <p className="text-sm sm:text-base md:text-lg text-stone-600 font-medium">
                {item.source}
              </p>
            </div>
            <div className="flex flex-col mb-2">
              <div className="relative">
                <Image
                  className="border border-stone-900 rounded-xl"
                  src={`/covers/${item.image}`}
                  alt={item.image || ""}
                  width={100}
                  height={100}
                  sizes="100vw"
                  style={{ width: "100px", height: "100%" }} // optional
                ></Image>
                <div className="lg:group-hover:flex flex-col justify-center align-center absolute px-10 py-12 text-center border border-stone-900 rounded-xl bottom-0 left-0 top-0 right-0 transition ease-in duration-300 bg-black/[.35]"></div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {totalPages > 1 && (
        <nav aria-label="Press pagination" className="inline-flex items-center gap-1 self-start">
          <Link
            href={`/press?page=${Math.max(1, currentPage - 1)}`}
            aria-disabled={currentPage === 1}
            className={`px-2 py-1 text-xs tracking-wide transition ${
              currentPage === 1
                ? "pointer-events-none opacity-35 !text-stone-500"
                : "!text-stone-500 hover:!text-stone-400"
            }`}
          >
            Prev
          </Link>

          {paginationItems.map((item, index) =>
            item === "..." ? (
              <span key={`dots-${index}`} className="px-1 text-xs !text-stone-700">
                ·
              </span>
            ) : (
              <Link
                key={item}
                href={`/press?page=${item}`}
                className={`px-2 py-1 text-xs tracking-wide transition ${
                  item === currentPage
                    ? "!text-stone-300 underline underline-offset-4"
                    : "!text-stone-600 hover:!text-stone-400"
                }`}
              >
                {item}
              </Link>
            )
          )}

          <Link
            href={`/press?page=${Math.min(totalPages, currentPage + 1)}`}
            aria-disabled={currentPage === totalPages}
            className={`px-2 py-1 text-xs tracking-wide transition ${
              currentPage === totalPages
                ? "pointer-events-none opacity-35 !text-stone-500"
                : "!text-stone-500 hover:!text-stone-400"
            }`}
          >
            Next
          </Link>
        </nav>
      )}
    </div>
  );
}
