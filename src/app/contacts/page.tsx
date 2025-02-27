import { TbMailFilled } from "react-icons/tb";
import Link from "next/link";
import type { Metadata } from "next";
import { Social } from "@/components/Social";

export const metadata: Metadata = {
  title: "Contacts",
};

export default function ContactsPage() {
  return (
    <div className="contacts__layout before:bg-contain before:bg-right-top">
      <div className="overflow-x-hidden text-stone-300 font-[family-name:var(--font-default)]">
        <div className="fixed inset-0 -z-10">
          <div className="relative h-full w-full bg-black">
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
          </div>
        </div>

        <div className="container mt-16 mb-8 mx-auto px-8 xl:px-28">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-10">Contacts</h1>
            <div>
              <h2 className="text-xl xl:text-3xl">Leyla Romanova</h2>

              <div className="flex flex-col text-l xl:text-2xl mt-4">
                <Link
                  href="mailto:contact@leylaromanova.com"
                  className="inline-flex items-center gap-2 text-l xl:text-2xl"
                >
                  <TbMailFilled /> contact@leylaromanova.com
                </Link>
              </div>
            </div>
          </div>

          <hr className="xl:w-3/5 mt-4 mb-6" />
          {/* <h1 className="text-4xl mb-8 mt-4">Socials</h1> */}
          <div className="flex gap-4 text-2xl !text-stone-300">
            <Social onlySocials={true}/>
          </div>
        </div>
      </div>
    </div>
  );
}
