"use client";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton, usePrevNextButtons } from "./Btns";
import { BaseMusicItem } from "@/constants/data";
import Image from "next/image";
import { MusicLinks } from "./MusicLinks";

export const Group = ({
  name,
  items,
  type = 'single'
}: {
  name: string
  items: BaseMusicItem[]
  type?: 'single' | 'album'
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="mb-10 lg:mb-16">
      <div className="flex flex-row gap-2 lg:gap-8 items-baseline mb-4 lg:mb-8">
        <h2 className="w-2/5 md:w-2/6 pb-2 tracking-tight lg:text-4xl font-semibold text-wrap">
          {name.toString().toUpperCase()}
        </h2>

        <hr className="w-3/5 md:w-4/6" />
      </div>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {items.map((item) => (
              <div key={item.name} className="embla__slide ">
                <div className="relative group inline-block">
                  <Image
                    className="border border-stone-900 rounded-xl mb-2"
                    src={"/personal-site/covers/" + item.image}
                    alt={item.name}
                    width={1200}
                    height={1200}
                    sizes="100vw"
                    style={{ width: "1200px", height: "auto" }} // optional
                  />

                  <div className="hidden group-hover:flex flex-col justify-center align-center absolute px-10 py-12 text-center border border-stone-900 rounded-xl bottom-0 left-0 top-0 right-0 transition ease-in duration-300 bg-black/[.85]">
                    <div className="text-2xl">{item.name}</div>
                    <ul>
                    {type === 'album' && item.items && item.items.map((item, index) => (
                      <li
                        key={item.name}
                        className="flex justify-between mb-1 font-normal"
                      >
                        <span>
                          <span className="inline-flex font-medium w-6">{index + 1}.</span>
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                    <div className="text-3xl mt-4">
                      <MusicLinks {...item} />
                    </div>

                    <div className="sm:mb-8 sm:flex sm:justify-center mt-4 absolute bottom-0 right-4">
                      <div className="relative rounded-full px-3 py-1 text-xl border border-gray-600 hover:border-gray-400">
                        <a href={'personal-site/music/' + item.href} className="font-semibold">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                          More →
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
