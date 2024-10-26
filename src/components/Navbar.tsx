import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaVk,
  FaYoutube,
} from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="flex items-center lg:justify-between justify-center py-6">
      <div className="flex flex-shrink-0 items-center">
        {/* <a href="/personal-site" aria-label="Home">
          <span className="text-2xl font-semibold mx-2">LEYLA ROMANOVA</span>
        </a> */}
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a>
          <FaInstagram />
        </a>
        <a>
          <FaTelegram />
        </a>
        <a>
          <FaFacebook />
        </a>
        <a>
          <FaYoutube />
        </a>
        <a>
          <FaVk />
        </a>
      </div>
    </nav>
  );
};
