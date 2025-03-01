"use client";
import { PUBLIC_PAGES } from "@/config/pages-url.config";
import { Social } from "./Social";
import { MusicLinks } from "./MusicLinks";

import { useState } from "react";
import { Contacts } from "./Contacts";

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
    <header>
      <div className="flex items-center relative justify-between bg-neutral-950 py-4 lg:py-6 px-8 lg:px-8 xl:px-12 shadow-[inset_0_4px_4px_-4px_rgba(255,255,255,0.2),0_8px_8px_-8px_rgba(255,255,255,0.2)] z-10">
        <div className="hidden text-2xl space-x-4 lg:flex lg:w-72 !text-stone-400">
          {/* <Social /> */}
          <MusicLinks {...links} />
        </div>
        <a
          href={PUBLIC_PAGES.HOME}
          className="text-center text-xl md:text-xl lg:text-3xl tracking-[.15em] font-semibold !text-stone-100"
        >
          LEYLA ROMANOVA
        </a>
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
                <li className="border-b border-gray-400 my-8 uppercase !text-stone-400">
                  <a href={PUBLIC_PAGES.PRESS}>Press</a>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase !text-stone-400">
                  <a href={PUBLIC_PAGES.PHOTO}>Photo</a>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase !text-stone-400">
                  <a href={PUBLIC_PAGES.CONTACTS}>Contacts</a>
                </li>

                <li className="flex items-center justify-end my-8   gap-3 text-xl !text-stone-400">
                  <Social />
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden lg:justify-end space-x-8 lg:flex font-semibold text-xl !text-stone-400">
            {/* <li>
              <MusicLinks {...links} />
            </li> */}
            <li>
              <a href={PUBLIC_PAGES.PRESS}>Press</a>
            </li>
            <li>
              <a href={PUBLIC_PAGES.PHOTO}>Photo</a>
            </li>
            <li>
              <a href={PUBLIC_PAGES.CONTACTS}>Contacts</a>
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
