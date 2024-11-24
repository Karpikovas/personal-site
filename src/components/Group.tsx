"use client";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton, usePrevNextButtons } from "./Btns";
import { BaseMusicItem } from "@/constants/data";
import Image from "next/image";
import { MusicLinks } from "./MusicLinks";

export const Group = ({
  name,
  items,
}: {
  name: string;
  items: BaseMusicItem[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="flex flex-row lg:gap-8 items-baseline mb-4">
        <h2 className="w-2/3 lg:w-1/3 pb-2  tracking-tight lg:text-5xl font-semibold text-wrap">
          {name.toString().toUpperCase()}
        </h2>

        <hr className="w-2/3" />
      </div>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {items.map((item, index) => (
              <div key={item.name} className="embla__slide ">
                <div className="relative group">
                  <Image
                    className="border border-stone-900 rounded-xl mb-2"
                    src={"/personal-site/covers/" + item.image}
                    alt={item.name}
                    width={350}
                    height={350}
                  />
                  <div className="hidden group-hover:flex flex-col justify-center align-center gap-8 absolute px-10 py-12 text-center border border-stone-900 rounded-xl bottom-0 left-0 top-0 right-0 transition ease-in duration-300 bg-black/[.8]">
                    <div className="text-2xl">{item.name}</div>
                    <div className="text-3xl">
                      <MusicLinks {...item} />
                    </div>

                    <div className="sm:mb-8 sm:flex sm:justify-center">
                      <div className="relative rounded-full px-3 py-1 text-xl border border-gray-600 hover:border-gray-400">
                        <a href="#" className="font-semibold">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                          More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="text-xl">{item.name.toUpperCase()}</div> */}
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls">
          <div className="embla__buttons">
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
      </div>
    </>
  );
};
