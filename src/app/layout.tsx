import type { Metadata } from "next";
import { Contacts } from "../components/Contacts";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { siteConfig, metadata } from "@/constants/siteMetaData";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/rows.css";

const font = Open_Sans({
  variable: "--font-default",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        <main>
          <div className="overflow-x-hidden text-stone-300 font-[family-name:var(--font-default)]">
            <div className="fixed inset-0 -z-10">
              <div className="relative h-full w-full bg-black">
                <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
              </div>
            </div>
          </div>
          <Navbar />
          {children}

          <div className="container mt-16 mb-8 mx-auto px-8 xl:px-38"></div>
        </main>

        <Contacts />
      </body>
    </html>
  );
}
