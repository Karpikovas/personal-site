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
      <div className="overflow-x-hidden text-stone-300 font-[family-name:var(--font-body)]">
        <div className="fixed inset-0 -z-10">
          <div className="relative h-full w-full bg-black">
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
          </div>
        </div>

        <div className="container mt-16 mb-8 mx-auto px-8 xl:px-28">
          <div className="mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-10">Contacts</h1>
            <div>
              <h2 className="font-display text-2xl xl:text-4xl font-semibold tracking-tight">Leyla Romanova</h2>

              <div className="flex flex-col text-base xl:text-2xl mt-4">
                <Link
                  href="mailto:contact@leylaromanova.com"
                  className="inline-flex items-center gap-2 text-base xl:text-2xl"
                >
                  <TbMailFilled /> contact@leylaromanova.com
                </Link>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <p className="text-sm xl:text-lg uppercase tracking-[0.08em] !text-stone-400">Manager:</p>
                <p className="font-display text-xl xl:text-3xl font-semibold tracking-tight">Valeria Simon</p>
                <Link
                  href="mailto:contact@leylaromanova.com"
                  className="inline-flex items-center gap-2 text-base xl:text-2xl"
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
