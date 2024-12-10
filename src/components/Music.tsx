// @ts-nocheck
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
    </>
  );
};
