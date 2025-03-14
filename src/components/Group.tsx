"use client";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton, usePrevNextButtons } from "./Btns";
import { BaseMusicItem } from "@/constants/data";
import Image from "next/image";
import { MusicLinks } from "./MusicLinks";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const useWidth = () => {
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return width;
};

export const Group = ({
  name,
  items,
  isMain,
  type = "single",
}: {
  name: string;
  items: BaseMusicItem[];
  isMain: boolean;
  type?: "single" | "album";
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const width = useWidth();
  const router = useRouter();

  const onItemClick = (item: any) => {
    if (width < 1024) {
      router.push("music/" + item.href);
    }
  };

  return (
    <div className="mb-10 md:mb-16 xl:mb-20">
      <div className="flex flex-row gap-4 lg:gap-10 items-baseline mb-4 lg:mb-8">
        <h2 className="w-auto pb-2 tracking-tight text-md md:text-2xl lg:text-4xl font-semibold text-nowrap !text-stone-300">
          {name.toString().toUpperCase()}
        </h2>

        <hr className="w-full" />
      </div>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8">
            {items.map((item) => (
              <div
                key={item.name}
                className={`sm:max-w-1/2 embla__slide ${
                  !isMain && "sm:w-1/3"
                } ${items.length === 1 && "pr-3 sm:pr-4 md:pr-8"}`}
              >
                <div
                  className="relative group inline-block h-full"
                  onClick={() => onItemClick(item)}
                >
                  <Image
                    className="border border-stone-900 rounded-xl"
                    src={"/covers/" + item.image}
                    alt={item.name}
                    width={1200}
                    height={1200}
                    sizes="100vw"
                    style={{
                      width: "1200px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    className={`mt-4 mb-6 !text-stone-300 text-xl sm:hidden`}
                  >
                    <MusicLinks {...item} />
                  </div>

                  <div className="hidden lg:group-hover:flex flex-col justify-center align-center absolute px-10 py-12 text-center border border-stone-900 rounded-xl bottom-0 left-0 top-0 right-0 transition ease-in duration-300 bg-black/[.9]">
                    <h3
                      className={`!text-stone-100 font-semibold ${
                        isMain
                          ? "lg:text-2xl xl:text-3xl"
                          : "lg:text-xl xl:text-2xl"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <ul>
                      {type === "album" &&
                        item.items &&
                        item.items.map((item, index) => (
                          <li
                            key={item.name}
                            className="flex justify-between mb-1 font-normal"
                          >
                            <span>
                              <span className="inline-flex font-medium w-6">
                                {index + 1}.
                              </span>
                              {item.name}
                            </span>
                          </li>
                        ))}
                    </ul>
                    <div
                      className={`mt-6 !text-stone-300 ${
                        isMain
                          ? "lg:text-4xl xl:text-5xl"
                          : "lg:text-3xl xl:text-4xl"
                      }`}
                    >
                      <MusicLinks {...item} />
                    </div>

                    <div className="sm:mb-8 sm:flex sm:justify-center mt-4 absolute bottom-0 right-4">
                      <Link
                        href={"music/" + item.href}
                        className="relative rounded-full px-4 py-1 text-xl bg-stone-800 border-gray-600 hover:bg-stone-700 font-semibold !text-stone-200"
                      >
                        More →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* <div className="text-xl">{item.name.toUpperCase()}</div> */}
              </div>
            ))}
          </div>
        </div>

        {items.length > 3 && (
          <div className="flex justify-center mt-2">
            <div className="flex flex-row">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
