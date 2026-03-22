import {Music} from "@/components/Music";
import {Photo} from "@/components/Photo";

export default function Home() {
  return (
    <div className="fadeIn">
      <Photo/>

      <div className="container mt-8 xl:mt-16 mb-4 xl:mb-8 mx-auto px-8 lg:px-20 fadeIn1">
        <div className="flex flex-col items-center mb-8 md:mb-10 xl:mb-16">
          <p className="text-sm md:text-lg xl:text-2xl  !text-stone-300">
            <b>Leyla Romanova</b> Leyla Romanova is a multi-genre composer whose work spans nearly the entire musical
            spectrum — from symphonic grandeur to cutting-edge electronic soundscapes.
            <br/><br/>
            Her portfolio includes orchestral, chamber, and piano works, as well as experimental electronica,
            progressive techno, pop-jazz, and pop-rock. Rooted in the academic tradition of concert halls and
            handwritten scores, yet constantly evolving, she now fuses orchestral textures with electronic pulses to
            craft cinematic worlds that evoke vivid imagery through powerful dramaturgy and atmosphere — a vision that
            has earned her numerous international awards.
          </p>
        </div>
        <Music/>
      </div>
    </div>
  );
}
