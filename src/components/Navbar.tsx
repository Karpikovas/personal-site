"use client";
import { PUBLIC_PAGES } from "@/config/pages-url.config";
import { MusicLinks } from "./MusicLinks";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { withBasePath } from "@/constants/basePath";
import { SiApplemusic, SiSpotify, SiVk, SiYoutubemusic } from "react-icons/si";
import { TbBrandYandex } from "react-icons/tb";

const ZvukIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    role="img"
    viewBox="0 0 28 28"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1062 22.6231C11.1717 22.9396 11.2045 23.0978 11.1055 23.2088C11.0065 23.32 10.8414 23.3052 10.5114 23.2758C8.6634 23.1113 7.62992 22.7726 6.8216 22.4377C5.477 21.8807 4.40872 20.8125 3.85177 19.4678C3.51692 18.6594 3.17807 17.6259 3.01351 15.7779C2.98411 15.4478 2.96941 15.2828 3.08052 15.1838C3.19165 15.0848 3.34985 15.1175 3.66627 15.183C7.39644 15.9551 10.3342 18.8928 11.1062 22.6231ZM14.6781 23.3439C14.4214 23.356 14.293 23.3619 14.2048 23.2888C14.1166 23.2157 14.0978 23.0823 14.06 22.8154C13.2854 17.3375 8.95177 13.0039 3.47391 12.2292C3.20703 12.1914 3.07357 12.1726 3.00051 12.0844C2.92745 11.9962 2.93344 11.8678 2.94541 11.6111C2.99557 10.536 3.09725 9.69121 3.22793 9.0023C3.27092 8.77564 3.29242 8.66232 3.38205 8.5936C3.47169 8.52486 3.58778 8.53359 3.82 8.55105C11.2491 9.10954 17.1797 15.0402 17.7381 22.4694C17.7556 22.7017 17.7643 22.8177 17.6956 22.9073C17.6269 22.9969 17.5135 23.0185 17.2869 23.0614C16.5979 23.1922 15.7531 23.2938 14.6781 23.3439ZM21.3376 21.0702C21.0454 21.3898 20.8993 21.5496 20.7215 21.4965C20.5435 21.4434 20.5056 21.207 20.4293 20.7341C19.2006 13.1096 13.1799 7.08876 5.5555 5.85992C5.08263 5.78372 4.84619 5.7456 4.79304 5.5677C4.73987 5.38979 4.89973 5.24368 5.21946 4.95146C5.68583 4.52517 6.22666 4.17866 6.8216 3.93222C7.94769 3.46577 9.51076 2.99165 13.1043 2.99165C16.6978 2.99165 18.2611 3.46579 19.3872 3.93222C20.7318 4.48918 21.8002 5.55747 22.3571 6.90209C22.8234 8.02809 23.2975 9.59128 23.2975 13.185C23.2975 16.7787 22.8234 18.3419 22.3571 19.4678C22.1105 20.0627 21.764 20.6037 21.3376 21.0702ZM0.032959 13.185C0.032959 9.28702 0.555958 7.33807 1.19275 5.80068C2.04182 3.75084 3.67039 2.12226 5.7202 1.27319C7.25756 0.636382 9.20637 0.113525 13.1043 0.113525C17.0022 0.113525 18.9512 0.636382 20.4886 1.27319C22.5383 2.12226 24.167 3.75084 25.016 5.80068C25.6528 7.33807 26.1756 9.28702 26.1756 13.185C26.1756 17.0829 25.6528 19.0318 25.016 20.5693C24.167 22.619 22.5383 24.2477 20.4886 25.0967C18.9512 25.7335 17.0022 26.2565 13.1043 26.2565C9.20637 26.2565 7.25756 25.7335 5.7202 25.0967C3.67039 24.2477 2.04182 22.619 1.19275 20.5693C0.555958 19.0318 0.032959 17.0829 0.032959 13.185Z"
      fill="currentColor"
    />
  </svg>
);

export const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const withPreviewContext = (path: string) => {
    const previewCollection = searchParams.get("previewCollection");
    const previewId = searchParams.get("previewId");
    if (!previewCollection || !previewId) return path;

    const params = new URLSearchParams();
    params.set("previewCollection", previewCollection);
    params.set("previewId", previewId);
    return `${path}?${params.toString()}`;
  };

  const navItems = useMemo(
    () => [
      { label: "Press", href: withBasePath(PUBLIC_PAGES.PRESS) },
      { label: "Photo", href: withBasePath(PUBLIC_PAGES.PHOTO) },
      { label: "Contacts", href: withBasePath(PUBLIC_PAGES.CONTACTS) },
    ],
    []
  );

  const links = {
    spotify: "https://open.spotify.com/artist/57Urcz3Cz6tDGqr83lKlSO",
    apple: "https://music.apple.com/ru/artist/leyla-romanova/1537459980",
    vk: "https://vk.com/artist/leylaromanova_",
    yandex: "https://music.yandex.ru/artist/10232907",
    youtube: "https://www.youtube.com/leylaromanova",
    zvuk: "https://zvuk.com/artist/210264255",
  };
  const listenPlatforms = [
    { name: "Spotify", href: links.spotify, icon: <SiSpotify /> },
    { name: "YouTube Music", href: links.youtube, icon: <SiYoutubemusic /> },
    { name: "Apple Music", href: links.apple, icon: <SiApplemusic /> },
    { name: "Yandex Music", href: links.yandex, icon: <TbBrandYandex /> },
    { name: "VK Music", href: links.vk, icon: <SiVk /> },
    { name: "Zvuk", href: links.zvuk, icon: <ZvukIcon /> },
  ];

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavOpen]);

  return (
    <header className="sticky top-0 z-[90]">
      <div className="flex items-center relative justify-between bg-neutral-950/82 backdrop-blur-md py-4 lg:py-6 px-5 sm:px-6 lg:px-8 xl:px-12 border-b border-stone-800/70 shadow-[0_18px_35px_-30px_rgba(0,0,0,0.95)]">
        <div className="hidden text-2xl space-x-4 lg:flex lg:w-72 !text-stone-100">
          <MusicLinks {...links} />
        </div>
        <Link
          href={withPreviewContext(withBasePath(PUBLIC_PAGES.HOME))}
          className="font-display flex-1 text-left text-sm sm:text-base md:text-xl lg:flex-none lg:text-center lg:text-3xl tracking-[.08em] lg:tracking-[.14em] font-semibold !text-stone-100 transition-opacity duration-300 hover:opacity-90"
        >
          LEYLA ROMANOVA
        </Link>
        <div className="relative z-[95] ml-4 flex w-auto justify-end lg:w-72">
          <button
            type="button"
            aria-expanded={isNavOpen}
            aria-label={isNavOpen ? "Close menu" : "Open menu"}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              setIsNavOpen((prev) => !prev);
            }}
            className="group inline-flex min-h-9 min-w-[5.5rem] items-center justify-center gap-2 rounded-full border border-stone-600/90 bg-stone-900/80 px-3 py-1.5 transition-colors duration-300 hover:border-stone-400/95 hover:bg-stone-800/85 md:min-h-10 md:min-w-[6.2rem] md:px-3.5 md:py-2"
          >
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.17em] !text-stone-100 md:text-[13px] md:tracking-[0.2em]">
              Menu
            </span>
            <span className="relative h-4 w-4 md:h-5 md:w-5">
              <span
                className={`absolute left-0 top-[2px] h-[1.5px] w-4 bg-stone-200 transition-transform duration-300 md:top-[3px] md:w-5 ${
                  isNavOpen ? "translate-y-[4px] rotate-45 md:translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[1.5px] w-4 bg-stone-300 transition-opacity duration-200 md:top-[9px] md:w-5 ${
                  isNavOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-[1.5px] w-4 bg-stone-200 transition-transform duration-300 md:top-[15px] md:w-5 ${
                  isNavOpen ? "-translate-y-[4px] -rotate-45 md:-translate-y-[5px]" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {isNavOpen && (
        <div className="fixed inset-0 z-[120]">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/96 md:bg-black/76 md:backdrop-blur-sm"
            onClick={() => setIsNavOpen(false)}
          />
          <aside className="absolute inset-0 h-full w-full bg-black px-7 pb-10 pt-24 sm:px-10 md:inset-y-0 md:left-auto md:right-0 md:max-w-[420px] md:border-l md:border-stone-800/90 md:bg-neutral-950/95 md:shadow-[-24px_0_80px_-40px_rgba(0,0,0,0.95)]">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsNavOpen(false)}
              className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-700/90 bg-stone-900/80 text-lg font-semibold !text-stone-200 transition-colors duration-300 hover:border-stone-500/90 hover:bg-stone-800"
            >
              ×
            </button>
            <div className="mb-8">
              <p className="mb-2 text-[0.74rem] uppercase tracking-[0.2em] !text-stone-500">
                Navigation
              </p>
              <nav>
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={withPreviewContext(item.href)}
                        className="group inline-flex items-center gap-3 text-2xl tracking-tight !text-stone-200 transition-colors duration-300 hover:!text-stone-100"
                      >
                        <span className="h-[1px] w-0 bg-stone-400 transition-all duration-300 group-hover:w-8" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-12 border-t border-stone-800/85 pt-8">
              <p className="mb-4 text-[0.74rem] uppercase tracking-[0.2em] !text-stone-500">
                Listen
              </p>
              <ul className="grid grid-cols-3 gap-3 sm:gap-3.5">
                {listenPlatforms.map((platform) => (
                  <li key={platform.name} className="flex items-center justify-center">
                    <Link
                      href={platform.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex h-16 w-16 items-center justify-center rounded-full border border-stone-800/95 bg-stone-950/75 transition-colors duration-300 hover:border-stone-500/95 hover:bg-stone-900/90 sm:h-18 sm:w-18"
                      aria-label={`Open ${platform.name}`}
                    >
                      <span className="text-[1.7rem] !text-stone-200 transition-colors duration-300 group-hover:!text-stone-100 sm:text-[1.85rem]">
                        {platform.icon}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
