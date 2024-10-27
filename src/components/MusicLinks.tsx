import Link from "next/link";
import { FaAmazon, FaYandex } from "react-icons/fa";
import {
  SiAmazonmusic,
  SiApplemusic,
  SiSpotify,
  SiYoutubemusic,
  SiVk,
  SiAmazon,
} from "react-icons/si";
import { AmazonMusic } from "./AmazonMusic";
import { TbBrandAmazon, TbBrandYandex } from "react-icons/tb";
import { BsAmazon } from "react-icons/bs";
import { ImAmazon } from "react-icons/im";
import { PiAmazonLogo } from "react-icons/pi";
import { GrAmazon } from "react-icons/gr";
import { AiFillAmazonCircle, AiFillAmazonSquare } from "react-icons/ai";

interface IMusicLinksProps {
  youtube?: string;
  spotify?: string;
  apple?: string;
  amazon?: string;
  yandex?: string;
  vk?: string;
}
export const MusicLinks = ({
  youtube,
  spotify,
  apple,
  amazon,
  yandex,
  vk,
}: IMusicLinksProps) => {
  const linkClass = "text-white hover:text-stone-400 cursor-pointer";
  //const linkClassCustom = 'bg-white hover:bg-stone-400 p-2 rounded-xl text-black flex items-center justify-center';
  return (
    <div className="flex flex-row gap-2">
      {youtube && (
        <Link href={youtube} target="_blank" className={linkClass}>
          <SiYoutubemusic />
        </Link>
      )}

      {spotify && (
        <Link href={spotify} target="_blank" className={linkClass}>
          <SiSpotify />
        </Link>
      )}

      {apple && (
        <Link href={apple} target="_blank" className={linkClass}>
          <SiApplemusic />
        </Link>
      )}

      <Link href={vk || ""} className={linkClass}>
        <SiVk />
      </Link>

      <Link href={amazon || ""} target="_blank" className={linkClass}>
        <AiFillAmazonCircle/>
      </Link>

      <Link href={yandex || ""} className={linkClass}>
        <TbBrandYandex/>
      </Link>
    </div>
  );
};
