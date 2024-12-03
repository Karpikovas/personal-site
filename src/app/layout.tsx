import type { Metadata } from "next";
import { Contacts } from "@/components/Contacts";
import { Open_Sans } from "next/font/google"
import "./globals.css";
import { Navbar } from "@/components/Navbar";


const font  = Open_Sans({
  variable: "--font-default",
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
})

export const metadata: Metadata = {
  title: "LEYLA ROMANOVA",
  description: "Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.variable} antialiased`}
      >
        <Navbar/>
        {children}

        <div className="container mt-16 mb-8 mx-auto px-8 xl:px-48">
          <Contacts />
        </div>
      </body>
    </html>
  );
}
