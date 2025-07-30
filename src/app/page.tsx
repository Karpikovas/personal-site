import { Music } from "@/components/Music";
import { Photo } from "@/components/Photo";

export default function Home() {
  return (
    <div className="fadeIn">
      <Photo />

      <div className="container mt-8 xl:mt-16 mb-4 xl:mb-8 mx-auto px-8 lg:px-20 fadeIn1">
        <div className="flex flex-col items-center mb-8 md:mb-10 xl:mb-16">
          <p className="text-sm md:text-lg xl:text-2xl  !text-stone-300">
            <b>Leyla Romanova</b> is a composer who creates music of different genres – from orchestral, chamber and neoclassical piano music to trance-techno.
          </p>
        </div>
        <Music />
      </div>
    </div>
  );
}
