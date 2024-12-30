import { MUSIC } from "@/constants/music";
import Image from "next/image";
import { MusicLinks } from "./MusicLinks";

export const Music = () => {
  const albums = MUSIC.albums;
  const groups = MUSIC.groups;
  const releaze = MUSIC.releaze;

  return (
    <>
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
            src={"/covers/" + releaze.image}
            alt={releaze.name}
            width={350}
            height={350}
            priority
          />
        </div>
        <p className="w-full lg:w-2/3 lg:text-xl hidden lg:block">
          {releaze.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:gap-8 pb-4 lg:mb-32 mb-8">
        <div className="mx-auto w-full lg:w-1/3 pb-2 text-3xl tracking-tight lg:text-5xl font-semibold text-wrap mb-2">
          <MusicLinks {...releaze} />
        </div>

        <p className="w-full lg:w-2/3 text-xl">
          RELIAZE DATE - {releaze.releazeDate}
        </p>
      </div>

      <div className="flex flex-row lg:gap-8 items-baseline mb-4">
        <h2 className="w-2/3 lg:w-1/3 pb-2 text-2xl tracking-tight lg:text-5xl font-semibold text-wrap">
          ALBUMS
        </h2>

        <hr className="w-2/3" />
      </div>

      {albums.map((album) => (
        <div
          key={album.name}
          className="flex flex-col lg:flex-row lg:gap-8 pb-4 lg:mb-32"
        >
          <div className="mx-auto w-full lg:w-1/3 pb-2 text-2xl tracking-tight lg:text-5xl font-semibold text-wrap">
            {/* <div className="text-2xl font-semibold mb-1">
              {album.group.toUpperCase()}
            </div> */}
            <Image
              className="border border-stone-900 rounded-xl"
              src={"/covers/" + album.image}
              alt={album.name}
              width={350}
              height={350}
              priority
            />
            <div className="mt-2 text-4xl font-semibold mb-1">{album.name}</div>
          </div>
          <div className="w-full lg:w-2/3 lg:text-xl lg:block">
            <ul className="mt-3">
              {album.items.map((item, index) => (
                <li
                  key={item.name}
                  className="flex justify-between mb-2 font-normal"
                >
                  <span>
                    <span className="inline-flex font-medium w-6">{index + 1}.</span>
                    {item.name}
                  </span>

                  <span>
                    <MusicLinks {...item} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="flex flex-row lg:gap-8 items-baseline mb-4">
        <h2 className="w-2/3 lg:w-1/3 pb-2 text-2xl tracking-tight lg:text-5xl font-semibold text-wrap">
          OTHER MUSIC
        </h2>

        <hr className="w-2/3" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:mb-32 mb-8 font-semibold">
        {groups.map((group) =>
          group.items.map((item) => (
            <div key={item.name}>
              <div className="mb-1">{group.name.toUpperCase()}</div>
              <Image
                className="border border-stone-900 rounded-xl mb-2"
                src={"/covers/" + item.image}
                alt={item.name}
                width={350}
                height={350}
              />
              <div className="text-xl">
                {item.name}
                <div className="text-xl lg:text-3xl mt-2">
                  <MusicLinks {...item} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* <div
        key={group.name}
        className="flex flex-row gap-4 pb-4 items-baseline lg:mb-32"
      >
        <h2 className="w-2/3 lg:w-1/3 pb-2 text-2xl tracking-tight lg:text-5xl font-semibold text-wrap">
          {group.name.toUpperCase()}
        </h2>
        <hr className="w-2/3" />
      </div> */}
    </>
  );
};
