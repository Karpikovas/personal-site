import { MUSIC } from "@/constants/music";
import Image from "next/image";
import { MusicLinks } from "./MusicLinks";

export const Music = () => {
  //const groups = MUSIC.groups;
  const releaze = MUSIC.releaze;
  return (
    <>
      {/* {groups.map((group) => (
        <div
          key={group.name}
          className="flex flex-row gap-4 pb-4 items-baseline lg:mb-36"
        >
          <h2 className="w-2/3 lg:w-1/3 pb-2 text-2xl tracking-tight lg:text-5xl font-semibold text-wrap">
            {group.name.toUpperCase()}
          </h2>
          <hr className="w-2/3" />


        </div>
      ))} */}

      <div className="flex flex-row lg:gap-8 items-baseline mb-4">
        <h2 className="w-2/3 lg:w-1/3 pb-2 text-2xl tracking-tight lg:text-5xl font-semibold text-wrap">
          {releaze.group.toUpperCase()}
        </h2>
        <hr className="w-2/3" />
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8 pb-4">
        <div className="mx-auto w-full lg:w-1/3 pb-2 text-2xl tracking-tight lg:text-5xl font-semibold text-wrap">
          <Image
            className="border border-stone-900 rounded-xl"
            src={"/personal-site/covers/" + releaze.image}
            alt={releaze.name}
            width={350}
            height={350}
            priority
          />
        </div>
        <p className="w-full lg:w-2/3 lg:text-xl hidden lg:block">{releaze.description}</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:gap-8 pb-4 lg:mb-36 mb-8">
        <div className="mx-auto w-full lg:w-1/3 pb-2 text-3xl tracking-tight lg:text-5xl font-semibold text-wrap mb-2">
        <MusicLinks {...releaze}/>
        </div>
        
        <p className="w-full lg:w-2/3 text-xl">RELIAZE DATE - {releaze.releazeDate}</p>
      </div>

      <div className="flex flex-row lg:gap-8 items-baseline lg:mb-36">
        <h2 className="w-2/3 lg:w-1/3 pb-2 text-2xl tracking-tight lg:text-5xl font-semibold text-wrap">
          OTHER MUSIC
        </h2>
        
        <hr className="w-2/3" />
      </div>

      {/* <div
        key={group.name}
        className="flex flex-row gap-4 pb-4 items-baseline lg:mb-36"
      >
        <h2 className="w-2/3 lg:w-1/3 pb-2 text-2xl tracking-tight lg:text-5xl font-semibold text-wrap">
          {group.name.toUpperCase()}
        </h2>
        <hr className="w-2/3" />
      </div> */}
    </>
  );
};
