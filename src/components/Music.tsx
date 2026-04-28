import config from "@/payload.config";
import { getPayload } from "payload";
import { getMusicGroups } from "@/lib/music-feed";
import { Group } from "./Group";
import { Reveal } from "./Reveal";

export const Music = async () => {
  const payload = await getPayload({ config });
  const groups = await getMusicGroups(payload);
  const sections: Array<keyof typeof groups> = ["RELEASES", "LIVE Orchestral & Chamber"];

  return (
    <>
      {sections.map((key, index) => (
        <Reveal key={key} delay={index * 120}>
          <Group name={key} items={groups[key].items} type="single" />
        </Reveal>
      ))}
    </>
  );
};
