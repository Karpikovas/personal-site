import { getPress } from "@/constants/data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Press",
};

export default function PressPage() {
  const press = getPress();

  return (
    <div className="flex flex-col gap-8 container mt-16 mb-8 px-8 md:px-16 xl:px-48">
      <h1 className="text-4xl font-bold !text-stone-300">Press</h1>
      {press.map((item) => (
        <Link
          href={item.href}
          target="_blank"
          className="fadeIn1 block w-100 p-3 sm:p-4 bg-white rounded-lg shadow hover:bg-stone-850 !bg-neutral-950 !border-stone-850 !hover:bg-stone-850"
        >
          <div className="flex align-items justify-between gap-8">
            <div className="flex flex-col w-2/3">
              <h5 className="mb-2 text-m sm:text-l md:text-xl font-bold tracking-tight !text-stone-300 dark:text-white trunc">
                {item.name}
              </h5>
              <p className="text-sm sm:text-m md:text-xl text-stone-600 font-semibold">
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
    </div>
  );
}
