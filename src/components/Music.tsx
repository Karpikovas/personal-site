// @ts-nocheck
import { getGroups } from "@/constants/data";
import { Group } from "./Group";

export const Music = () => {
  const groups = getGroups();

  return (
    <>
      {Object.keys(groups).map((key) => (
        <Group key={key} name={key} items={groups[key].items} type="single" isMain={groups[key].isMain} />
      ))}
    </>
  );
};
