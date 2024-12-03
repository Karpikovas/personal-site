import { getAlbums, getGroups } from "@/constants/data";
import { Group } from "./Group";

export const Music = () => {
  const groups = getGroups();
  const albums = getAlbums();

  return (
    <>
      {Object.keys(groups).map((key) => (
        <Group key={key} name={key} items={groups[key].items} type="single" />
      ))}

      <Group name={"OTHER MUSIC"} items={albums} type="album" />

      {/* <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:mb-32 mb-8 font-semibold">
        {groups.map((group) =>
          group.items.map((item) => (
            <div key={item.name}>
              <div className="mb-1">{group.name.toUpperCase()}</div>
              <Image
                className="border border-stone-900 rounded-xl mb-2"
                src={"/personal-site/covers/" + item.image}
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
      </div> */}
    </>
  );
};
