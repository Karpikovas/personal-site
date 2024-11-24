import { Contacts } from "@/components/Contacts";
import { Music } from "@/components/Music";
import { Photo } from "@/components/Photo";

export default function Home() {
  return (
    <>
      <Photo/>
      <div className="overflow-x-hidden text-stone-300 font-[family-name:var(--font-default)]">
        <div className="fixed inset-0 -z-10">
          <div className="relative h-full w-full bg-black">
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
          </div>
        </div>

        <div className="container mt-16 mb-8 mx-auto px-8 xl:px-48">
          <Music />
          <Contacts />
        </div>
      </div>
    </>
  );
}
