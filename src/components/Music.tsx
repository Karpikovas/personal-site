// @ts-nocheck
import { getGroups } from "@/constants/data";
import { Group } from "./Group";
import { Reveal } from "./Reveal";

export const Music = () => {
  const groups = getGroups();

  return (
    <>
      {Object.keys(groups).map((key, index) => (
        <Reveal key={key} delay={index * 120}>
          <Group name={key} items={groups[key].items} type="single" isMain={groups[key].isMain} />
        </Reveal>
      ))}
    </>
  );
};
