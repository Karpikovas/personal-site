import type { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Press",
};

export default function PressPage() {
  return (
    <div className="flex flex-col gap-8 container mt-16 mb-8 px-8 xl:px-48">
      <h1 className="text-4xl font-bold">Press</h1>
      <a
        href="#"
        className="block w-100 p-4 bg-white rounded-lg shadow hover:bg-stone-850 dark:bg-neutral-950 dark:border-stone-850 dark:hover:bg-stone-850"
      >
        <div className="flex align-items justify-between gap-8">
          <div className="flex flex-col">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-stone-200 dark:text-white">
            'Are You Waiting for Me?' by Leyla Romanova: "Electrifying Energy and Ethereal Sounds that Transcend Time and Space".
            </h5>
            <p className="text-stone-600 font-semibold">Badwolfrecords</p>
          </div>
          <div className="relative">
            <Image
              className="border border-stone-900 rounded-xl mb-2"
              src={"/covers/Are you waiting for me.jpg"}
              alt="Are you waiting for me.jpg"
              width={100}
              height={100}
              sizes="100vw"
              priority
              style={{ width: "100px", height: "auto" }} // optional
            />
            <div className="lg:group-hover:flex flex-col justify-center align-center absolute px-10 py-12 text-center border border-stone-900 rounded-xl bottom-0 left-0 top-0 right-0 transition ease-in duration-300 bg-black/[.35]">
            </div>
          </div>
        </div>
      </a>

      <a
        href="#"
        className="block w-100 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </a>
    </div>
  );
}
