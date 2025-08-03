"use client";
import {BaseMusicItem} from "@/constants/data";
import Image from "next/image";
import {MusicLinks} from "./MusicLinks";
import {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

const useWidth = () => {
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
  const width = useWidth();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLeftEdge, setIsLeftEdge] = useState(true);
  const [isRightEdge, setIsRightEdge] = useState(false);

  const slidesToShow = width < 640 ? 1 : 3;
  const maxIndex = Math.max(0, items.length - slidesToShow);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (groupRef.current) observer.observe(groupRef.current);
    return () => {
      if (groupRef.current) observer.unobserve(groupRef.current);
    };
  }, []);

  const checkEdges = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setIsLeftEdge(scrollLeft <= 10);
    setIsRightEdge(scrollLeft >= scrollWidth - clientWidth - 10);
  };

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);

    const container = containerRef.current;
    const slide = container.children[0] as HTMLElement;
    const slideWidth = slide?.offsetWidth || 0;
    const gap = parseInt(window.getComputedStyle(container).gap) || 0;
    const scrollPosition = newIndex * (slideWidth + gap);

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkEdges);
      checkEdges(); // Initial check
      return () => container.removeEventListener('scroll', checkEdges);
    }
  }, []);

  const nextSlide = () => scrollToSlide(currentIndex + 1);
  const prevSlide = () => scrollToSlide(currentIndex - 1);

  return (
    <div className="mb-10 md:mb-16 xl:mb-20" ref={groupRef}>
      <div className="flex flex-row gap-4 lg:gap-10 items-baseline mb-4 lg:mb-8">
        <h2 className="w-auto pb-2 tracking-tight text-md md:text-2xl lg:text-4xl font-semibold text-nowrap !text-stone-300">
          {name.toString().toUpperCase()}
        </h2>
        <hr className="w-full"/>
      </div>

      <div className="relative">
        {/* Left Button */}
        {items.length > slidesToShow && width >= 1024 && isVisible && !isLeftEdge && (
          <button
            onClick={prevSlide}
            className="absolute -left-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-stone-600/30 hover:bg-stone-600/60 transition-all duration-300 shadow-lg border border-stone-500/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        )}

        {/* Slides Container */}
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="flex-shrink-0 snap-start w-[calc(100%-16px)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]"
            >
              <div
                className="relative group inline-block w-full aspect-square"
                onClick={() => width < 1024 && router.push("music/" + item.href)}
              >
                <Image
                  className="border border-stone-900 rounded-xl w-full h-full object-cover"
                  src={"/covers/" + item.image}
                  alt={item.name}
                  width={1200}
                  height={1200}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {width < 1024 && (
                  <div className="mt-2 !text-stone-300 text-sm md:text-base">
                    <MusicLinks {...item} />
                  </div>
                )}

                <div className="hidden lg:group-hover:flex flex-col justify-center items-center absolute inset-0 p-4 text-center border border-stone-900 rounded-xl transition ease-in duration-300 bg-black/[.9]">
                  <h3 className="!text-stone-100 font-semibold text-lg xl:text-xl mb-2">
                    {item.name}
                  </h3>
                  {type === "album" && item.items && (
                    <ul className="mt-1 max-h-[40%] overflow-y-auto w-full px-2">
                      {item.items.map((item, index) => (
                        <li key={item.name} className="flex justify-between mb-1 font-normal text-xs md:text-sm">
                          <span>
                            <span className="inline-flex font-medium w-6">{index + 1}.</span>
                            {item.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-2 !text-stone-300 text-2xl xl:text-3xl">
                    <MusicLinks {...item} />
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Link
                      href={"music/" + item.href}
                      className="rounded-full px-3 py-1 text-xs md:text-sm bg-stone-800 border-gray-600 hover:bg-stone-700 font-semibold !text-stone-200"
                    >
                      More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        {items.length > slidesToShow && width >= 1024 && isVisible && !isRightEdge && (
          <button
            onClick={nextSlide}
            className="absolute -right-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-stone-600/30 hover:bg-stone-600/60 transition-all duration-300 shadow-lg border border-stone-500/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        )}

        {/* Mobile Navigation */}
        {items.length > slidesToShow && width < 1024 && (
          <div className="flex justify-center mt-3">
            <div className="flex flex-row gap-4">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`rounded-full px-4 py-1 bg-stone-400/20 text-white ${currentIndex === 0 ? 'opacity-50 cursor-default' : 'cursor-pointer hover:bg-stone-500/90'}`}
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className={`rounded-full px-4 py-1 bg-stone-400/20 text-white ${currentIndex >= maxIndex ? 'opacity-50 cursor-default' : 'cursor-pointer hover:bg-stone-500/90'}`}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
