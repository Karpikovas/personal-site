"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const totalSlides = 3;

export const BioSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const safeIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    const targetSlide = slideRefs.current[safeIndex];
    if (!targetSlide) return;

    slider.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: "smooth",
    });
    setActiveSlide(safeIndex);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateActiveSlide = () => {
      const left = slider.scrollLeft;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;
        const distance = Math.abs(slide.offsetLeft - left);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveSlide(nearestIndex);
    };

    updateActiveSlide();
    slider.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide);

    return () => {
      slider.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, []);

  const handleNext = () => {
    const nextSlide = activeSlide === totalSlides - 1 ? 0 : activeSlide + 1;
    goToSlide(nextSlide);
  };

  return (
    <section id="bio" className="bio-shell rounded-[1.65rem] px-5 py-6 md:px-8 md:py-8 xl:px-10 xl:py-10">
      <div className="bio-content hidden md:grid gap-8 md:gap-9 xl:grid-cols-[0.9fr_1.1fr] xl:gap-12">
        <div className="space-y-5 md:space-y-6">
          <p className="bio-kicker">About composer</p>
          <p className="bio-intro text-base md:text-lg xl:text-xl !text-stone-200/95">
            <span className="font-display font-semibold !text-stone-100 md:text-xl xl:text-3xl">Leyla Romanova</span> is a
            <span className="whitespace-nowrap">multi-genre composer</span> whose work spans nearly the entire musical spectrum, from{" "}
            <span className="whitespace-nowrap">symphonic grandeur</span>
            to <span className="whitespace-nowrap">cutting-edge</span> electronic soundscapes.
          </p>
          <div className="bio-tags xl:pt-4">
            <span className="bio-tag">Cinematic</span>
            <span className="bio-tag">Electronic</span>
            <span className="bio-tag">Chamber</span>
            <span className="bio-tag">Orchestral</span>
          </div>
        </div>

        <div className="pt-4 md:pt-10 xl:pt-12 space-y-5 md:space-y-6 text-base md:text-lg xl:text-xl !text-stone-300/95">
          <p>
            Her portfolio includes orchestral, chamber, and piano works, as well as experimental electronica,
            progressive techno, pop-jazz, and pop-rock.
          </p>
          <p>
            Rooted in the academic tradition of concert halls and handwritten scores, yet constantly evolving, she now fuses orchestral textures with electronic pulses to craft cinematic worlds that evoke vivid imagery through powerful dramaturgy and atmosphere — a vision that has earned her numerous international awards.
          </p>
        </div>
      </div>

      <div className="bio-content relative z-20 md:hidden">
        <div
          ref={sliderRef}
          className="no-scrollbar flex gap-4 snap-x snap-mandatory overflow-x-auto scroll-smooth touch-pan-x pointer-events-auto"
          aria-label="Biography slides"
        >
          <article
            ref={(node) => {
              slideRefs.current[0] = node;
            }}
            className="w-full min-w-full flex-none snap-start"
          >
            <div className="space-y-4">
              <p className="bio-kicker">About composer</p>
              <p className="bio-intro text-base !text-stone-200/95 leading-relaxed whitespace-normal break-words">
                <span className="font-display font-semibold !text-stone-100">Leyla Romanova</span> is a{" "}
                <span className="whitespace-nowrap">multi-genre composer</span> whose work spans nearly the entire
                <span className="whitespace-nowrap">musical spectrum</span>, from{" "}
                <span className="whitespace-nowrap">symphonic grandeur</span>
                to <span className="whitespace-nowrap">cutting-edge</span> electronic soundscapes.
              </p>
              <div className="bio-tags">
                <span className="bio-tag">Cinematic</span>
                <span className="bio-tag">Electronic</span>
                <span className="bio-tag">Chamber</span>
                <span className="bio-tag">Orchestral</span>
              </div>
            </div>
          </article>

          <article
            ref={(node) => {
              slideRefs.current[1] = node;
            }}
            className="w-full min-w-full flex-none snap-start"
          >
            <p className="text-base !text-stone-300/95 leading-relaxed whitespace-normal break-words">
              Her portfolio includes orchestral, chamber, and piano works, as well as experimental electronica,
              progressive techno, pop-jazz, and pop-rock.
            </p>
          </article>

          <article
            ref={(node) => {
              slideRefs.current[2] = node;
            }}
            className="w-full min-w-full flex-none snap-start"
          >
            <p className="text-base !text-stone-300/95 leading-relaxed whitespace-normal break-words">
              Rooted in the academic tradition of concert halls and handwritten scores, yet constantly evolving, she now
              fuses orchestral textures with electronic pulses to craft cinematic worlds that evoke vivid imagery through
              powerful dramaturgy and atmosphere — a vision that has earned her numerous international awards.
            </p>
          </article>
        </div>

        <div className="relative z-30 mt-6 flex items-center justify-between gap-4 pointer-events-auto">
          <div className="flex items-center gap-2.5">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to bio slide ${index + 1}`}
                aria-current={activeSlide === index}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  activeSlide === index ? "w-6 bg-stone-200" : "w-3 bg-stone-500/70"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex cursor-pointer items-center rounded-full bg-stone-800/45 px-4 py-2 text-[11px] uppercase tracking-[0.14em] !text-stone-100 transition-colors duration-300 hover:bg-stone-700/55"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
