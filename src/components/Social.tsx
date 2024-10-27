import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaVk,
  FaYoutube,
} from "react-icons/fa";


export const Social = () => {
  return (
    <>
      <a className="hover:text-stone-400 cursor-pointer">
        <FaInstagram />
      </a>
      <a className="hover:text-stone-400 cursor-pointer">
        <FaTelegram />
      </a>
      <a className="hover:text-stone-400 cursor-pointer">
        <FaFacebook />
      </a>
      <a className="hover:text-stone-400 cursor-pointer">
        <FaYoutube />
      </a>
      <a className="hover:text-stone-400 cursor-pointer">
        <FaVk />
      </a>
    </>
  );
};
