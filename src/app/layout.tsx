import type { Metadata } from "next";
import { Contacts } from "../components/Contacts";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";

const font = Open_Sans({
  variable: "--font-default",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

const SITE_NAME = 'Leyla Romanova'
export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME ,
  },
  description: 'Leyla Romanova is a composer who creates music of different genres – from orchestral, chamber and neoclassical piano music to trance-techno',
};

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
