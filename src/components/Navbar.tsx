"use client";
import { PUBLIC_PAGES } from "@/config/pages-url.config";
import { Social } from "./Social";
import { MusicLinks } from "./MusicLinks";
import Link from "next/link";

import { useState } from "react";

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const links = {
    spotify: "https://open.spotify.com/artist/57Urcz3Cz6tDGqr83lKlSO",
    apple: "https://music.apple.com/ru/artist/leyla-romanova/1537459980",
    vk: "https://vk.com/artist/leylaromanova_",
    yandex: "https://music.yandex.ru/artist/10232907",
    youtube: "https://www.youtube.com/leylaromanova",
    zvuk: "https://zvuk.com/artist/210264255",
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center relative justify-between bg-neutral-950/82 backdrop-blur-md py-4 lg:py-6 px-8 lg:px-8 xl:px-12 border-b border-stone-800/70 shadow-[0_18px_35px_-30px_rgba(0,0,0,0.95)]">
        <div className="hidden text-2xl space-x-4 lg:flex lg:w-72 !text-stone-500">
          {/* <Social /> */}
          <MusicLinks {...links} />
        </div>
        <Link
          href={PUBLIC_PAGES.HOME}
          className="font-display text-center text-sm sm:text-base md:text-xl lg:text-3xl tracking-[.08em] lg:tracking-[.14em] font-semibold !text-stone-100 transition-opacity duration-300 hover:opacity-90"
        >
          LEYLA ROMANOVA
        </Link>
        <nav className="lg:w-72">
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="flex flex-col items-center justify-between min-h-[250px] !text-stone-400">
                <li className="flex flex-col items-center justify-end my-8 gap-4 text-2xl !text-stone-200">
                  Listen
                  <MusicLinks {...links} />
                </li>
                <li className="border-b border-gray-400 my-8 uppercase !text-stone-400 transition-colors duration-300 hover:!text-stone-200">
                  <Link href={PUBLIC_PAGES.PRESS}>Press</Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase !text-stone-400 transition-colors duration-300 hover:!text-stone-200">
                  <Link href={PUBLIC_PAGES.PHOTO}>Photo</Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase !text-stone-400 transition-colors duration-300 hover:!text-stone-200">
                  <Link href={PUBLIC_PAGES.CONTACTS}>Contacts</Link>
                </li>

                <li className="flex items-center justify-end my-8   gap-3 text-xl !text-stone-400">
                  <Social />
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden lg:justify-end space-x-8 lg:flex font-medium text-xl !text-stone-500">
            {/* <li>
              <MusicLinks {...links} />
            </li> */}
            <li>
              <Link href={PUBLIC_PAGES.PRESS} className="transition-colors duration-300 hover:!text-stone-200">Press</Link>
            </li>
            <li>
              <Link href={PUBLIC_PAGES.PHOTO} className="transition-colors duration-300 hover:!text-stone-200">Photo</Link>
            </li>
            <li>
              <Link href={PUBLIC_PAGES.CONTACTS} className="transition-colors duration-300 hover:!text-stone-200">Contacts</Link>
            </li>
            {/* <li>
              <Contacts/>
            </li> */}
          </ul>
        </nav>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: black;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      </div>
    </header>
  );
};
