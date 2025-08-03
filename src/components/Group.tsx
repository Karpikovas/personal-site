"use client";
import {BaseMusicItem} from "@/constants/data";
import Image from "next/image";
import {MusicLinks} from "./MusicLinks";
import {useState, useEffect, useRef, useCallback} from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLeftEdge, setIsLeftEdge] = useState(true);
  const [isRightEdge, setIsRightEdge] = useState(false);

  // Определяем количество видимых слайдов
  const getSlidesToShow = useCallback(() => {
    if (width < 768) return 1;    // Мобильные - 1 слайд
    if (width < 1024) return 2;   // Планшеты - 2 слайда
    return 3;                     // Десктоп - 3 слайда
  }, [width]);

  const slidesToShow = getSlidesToShow();
  const maxIndex = Math.max(0, items.length - slidesToShow);

  // Проверка границ скролла
  const checkEdges = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setIsLeftEdge(scrollLeft <= 10);
    setIsRightEdge(scrollLeft >= scrollWidth - clientWidth - 10);

    // Обновляем текущий индекс
    const slideWidth = containerRef.current.children[0]?.clientWidth || 0;
    const gap = parseInt(window.getComputedStyle(containerRef.current).gap) || 0;
    const newIndex = Math.round(scrollLeft / (slideWidth + gap));
    setCurrentIndex(Math.max(0, Math.min(newIndex, maxIndex)));
  }, [maxIndex]);

  // Прокрутка к конкретному слайду
  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);

    const container = containerRef.current;
    const slideWidth = container.children[0]?.clientWidth || 0;
    const gap = parseInt(window.getComputedStyle(container).gap) || 0;
    const scrollPosition = newIndex * (slideWidth + gap);

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [maxIndex]);

  // Инициализация событий
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkEdges);
      checkEdges(); // Начальная проверка
      return () => container.removeEventListener('scroll', checkEdges);
    }
  }, [checkEdges]);

  const nextSlide = () => scrollToSlide(currentIndex + 1);
  const prevSlide = () => scrollToSlide(currentIndex - 1);

  // Рассчитываем ширину слайдов
  const getSlideWidth = () => {
    if (width < 768) return 'w-full'; // На мобильных - полная ширина
    if (width < 1024) return 'w-1/2'; // На планшетах - половина
    return 'w-1/3'; // На десктопе - треть
  };

  return (
    <div
      className="mb-10 md:mb-16 xl:mb-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row gap-4 lg:gap-10 items-baseline mb-4 lg:mb-8">
        <h2 className="w-auto pb-2 tracking-tight text-md md:text-2xl lg:text-4xl font-semibold text-nowrap !text-stone-300">
          {name.toString().toUpperCase()}
        </h2>
        <hr className="w-full"/>
      </div>

      <div className="relative">
        {/* Кнопки навигации для десктопа */}
        {items.length > slidesToShow && width >= 1024 && (
          <>
            {!isLeftEdge && (
              <button
                onClick={prevSlide}
                className={`absolute -left-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-stone-600/80 hover:bg-stone-600/90 transition-all duration-300 shadow-lg border border-stone-500/30 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
            )}
            {!isRightEdge && (
              <button
                onClick={nextSlide}
                className={`absolute -right-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-stone-600/80 hover:bg-stone-600/90 transition-all duration-300 shadow-lg border border-stone-500/30 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            )}
          </>
        )}

        {/* Контейнер слайдов */}
        <div
          ref={containerRef}
          className="flex lg:gap-1 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              className={`flex-shrink-0 snap-start ${getSlideWidth()} px-2`}
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {width < 1024 && (
                  <div className="mt-2 !text-stone-300 text-xl">
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

        {/* Кнопки навигации для мобильных и планшетов */}
        {items.length > slidesToShow && width < 1024 && (
          <div className="flex justify-center mt-3">
            <div className="flex flex-row gap-5">
              <button
                onClick={prevSlide}
                disabled={isLeftEdge}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg border ${
                  isLeftEdge
                    ? 'bg-stone-600/20 border-stone-500/10 cursor-default opacity-50'
                    : 'bg-stone-600/30 hover:bg-stone-600/60 border-stone-500/30 cursor-pointer'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={isRightEdge}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg border ${
                  isRightEdge
                    ? 'bg-stone-600/20 border-stone-500/10 cursor-default opacity-50'
                    : 'bg-stone-600/30 hover:bg-stone-600/60 border-stone-500/30 cursor-pointer'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
