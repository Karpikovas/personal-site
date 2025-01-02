import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaVk,
  FaYoutube,
} from "react-icons/fa";

export const Social = ({ onlySocials = false }: { onlySocials?: boolean }) => {
  const socials = {
    vk: "https://vk.com/leylaromanova",
    telegram: "https://t.me/leylaromanovamusic",
    instagram: "https://www.instagram.com/leyla.e.romanova/",
    facebook: "https://www.facebook.com/romanova.leyla/",
    youtube: "https://www.youtube.com/@LeylaRomanova",
  };
  return (
    <>
      <a
        className="hover:text-stone-400 cursor-pointer !text-stone-300"
        target="_blank"
        href={socials.instagram}
      >
        <FaInstagram />
      </a>
      <a
        className="hover:text-stone-400 cursor-pointer !text-stone-300"
        target="_blank"
        href={socials.facebook}
      >
        <FaFacebook />
      </a>
      <a
        className="hover:text-stone-400 cursor-pointer !text-stone-300"
        target="_blank"
        href={socials.telegram}
      >
        <FaTelegram />
      </a>

      {!onlySocials && (
        <a
          className="hover:text-stone-400 cursor-pointer !text-stone-300"
          target="_blank"
          href={socials.youtube}
        >
          <FaYoutube />
        </a>
      )}

      <a
        className="hover:text-stone-400 cursor-pointer !text-stone-300"
        target="_blank"
        href={socials.vk}
      >
        <FaVk />
      </a>
    </>
  );
};
