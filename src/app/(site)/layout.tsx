import { Contacts } from "@/components/Contacts";
import { PreviewContextKeeper } from "@/components/PreviewContextKeeper";
import { PreviewLiveStateCache } from "@/components/PreviewLiveStateCache";
import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat, PT_Serif } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { buildSiteMetadata } from "@/constants/siteMetaData";
import { getSiteConfig } from "@/lib/site-seo";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/rows.css";

const fontBody = PT_Serif({
  variable: "--font-body",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  weight: ["400", "700"],
});

const fontDisplay = Montserrat({
  variable: "--font-display",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return buildSiteMetadata(siteConfig);
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${fontBody.variable} ${fontDisplay.variable} antialiased`}>
        <main>
          <div className="overflow-x-hidden text-stone-300 font-[family-name:var(--font-body)]">
            <div className="fixed inset-0 -z-10">
              <div className="relative h-full w-full bg-black">
                <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
              </div>
            </div>
          </div>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <Suspense fallback={null}>
            <PreviewContextKeeper />
            <PreviewLiveStateCache />
          </Suspense>
          {children}

          <div className="container mt-16 mb-8 mx-auto px-8 xl:px-38"></div>
        </main>

        <Contacts />
      </body>
    </html>
  );
}
