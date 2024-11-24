"use client";
import { Social } from "./Social";

import { useState } from "react";

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header>
      <div className="flex items-center justify-between bg-black py-4 lg:py-6 px-8 lg:px-12 shadow-xl">
        <div className="text-center text-l md:text-xl lg:text-2xl tracking-[.3em] font-light">
          LEYLA ROMANOVA
        </div>
        <nav>
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
              <ul className="flex flex-col items-center justify-between min-h-[250px]">
                <li className="border-b border-gray-400 my-8 uppercase">
                  <a href="/press">Press</a>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <a href="/photo">Photo</a>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <a href="/contact">Contact</a>
                </li>
                <li className="flex items-center justify-end my-8 gap-3 text-2xl">
                  <Social />
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
            <li>
              <a href="/about">Press</a>
            </li>
            <li>
              <a href="/photo">Photo</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li className="flex items-center justify-end ml-2 gap-3 text-xl">
              <Social />
            </li>
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
