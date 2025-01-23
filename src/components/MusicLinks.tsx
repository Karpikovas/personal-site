import Link from "next/link";
import { SiApplemusic, SiSpotify, SiYoutubemusic, SiVk } from "react-icons/si";

import { TbBrandYandex } from "react-icons/tb";
import { AiFillAmazonCircle } from "react-icons/ai";
import { PiVideoFill } from "react-icons/pi";

interface IMusicLinksProps {
  youtube?: string;
  video?: string;
  spotify?: string;
  apple?: string;
  vk?: string;
  yandex?: string;
  zvuk?: string;
  amazon?: string;
}
export const MusicLinks = ({
  youtube,
  video,
  spotify,
  apple,
  amazon,
  yandex,
  vk,
  zvuk,
}: IMusicLinksProps) => {
  const linkClass = "hover:text-stone-400 cursor-pointer";

  return (
    <div className="flex flex-row justify-center gap-2">
      {spotify && (
        <Link href={spotify} target="_blank" className={linkClass}>
          <SiSpotify />
        </Link>
      )}

      {youtube && (
        <Link href={youtube} target="_blank" className={linkClass}>
          <SiYoutubemusic />
        </Link>
      )}

      {apple && (
        <Link href={apple} target="_blank" className={linkClass}>
          <SiApplemusic />
        </Link>
      )}

      {vk && (
        <Link href={vk} target="_blank" className={linkClass}>
          <SiVk />
        </Link>
      )}

      {amazon && (
        <Link href={amazon} target="_blank" className={linkClass}>
          <AiFillAmazonCircle />
        </Link>
      )}

      {zvuk && (
        <Link href={zvuk} target="_blank" className={linkClass}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            role="img"
            viewBox="0 0 28 28"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector_13"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.1062 22.6231C11.1717 22.9396 11.2045 23.0978 11.1055 23.2088C11.0065 23.32 10.8414 23.3052 10.5114 23.2758C8.6634 23.1113 7.62992 22.7726 6.8216 22.4377C5.477 21.8807 4.40872 20.8125 3.85177 19.4678C3.51692 18.6594 3.17807 17.6259 3.01351 15.7779C2.98411 15.4478 2.96941 15.2828 3.08052 15.1838C3.19165 15.0848 3.34985 15.1175 3.66627 15.183C7.39644 15.9551 10.3342 18.8928 11.1062 22.6231ZM14.6781 23.3439C14.4214 23.356 14.293 23.3619 14.2048 23.2888C14.1166 23.2157 14.0978 23.0823 14.06 22.8154C13.2854 17.3375 8.95177 13.0039 3.47391 12.2292C3.20703 12.1914 3.07357 12.1726 3.00051 12.0844C2.92745 11.9962 2.93344 11.8678 2.94541 11.6111C2.99557 10.536 3.09725 9.69121 3.22793 9.0023C3.27092 8.77564 3.29242 8.66232 3.38205 8.5936C3.47169 8.52486 3.58778 8.53359 3.82 8.55105C11.2491 9.10954 17.1797 15.0402 17.7381 22.4694C17.7556 22.7017 17.7643 22.8177 17.6956 22.9073C17.6269 22.9969 17.5135 23.0185 17.2869 23.0614C16.5979 23.1922 15.7531 23.2938 14.6781 23.3439ZM21.3376 21.0702C21.0454 21.3898 20.8993 21.5496 20.7215 21.4965C20.5435 21.4434 20.5056 21.207 20.4293 20.7341C19.2006 13.1096 13.1799 7.08876 5.5555 5.85992C5.08263 5.78372 4.84619 5.7456 4.79304 5.5677C4.73987 5.38979 4.89973 5.24368 5.21946 4.95146C5.68583 4.52517 6.22666 4.17866 6.8216 3.93222C7.94769 3.46577 9.51076 2.99165 13.1043 2.99165C16.6978 2.99165 18.2611 3.46579 19.3872 3.93222C20.7318 4.48918 21.8002 5.55747 22.3571 6.90209C22.8234 8.02809 23.2975 9.59128 23.2975 13.185C23.2975 16.7787 22.8234 18.3419 22.3571 19.4678C22.1105 20.0627 21.764 20.6037 21.3376 21.0702ZM0.032959 13.185C0.032959 9.28702 0.555958 7.33807 1.19275 5.80068C2.04182 3.75084 3.67039 2.12226 5.7202 1.27319C7.25756 0.636382 9.20637 0.113525 13.1043 0.113525C17.0022 0.113525 18.9512 0.636382 20.4886 1.27319C22.5383 2.12226 24.167 3.75084 25.016 5.80068C25.6528 7.33807 26.1756 9.28702 26.1756 13.185C26.1756 17.0829 25.6528 19.0318 25.016 20.5693C24.167 22.619 22.5383 24.2477 20.4886 25.0967C18.9512 25.7335 17.0022 26.2565 13.1043 26.2565C9.20637 26.2565 7.25756 25.7335 5.7202 25.0967C3.67039 24.2477 2.04182 22.619 1.19275 20.5693C0.555958 19.0318 0.032959 17.0829 0.032959 13.185Z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>
      )}

      {yandex && (
        <Link href={yandex} target="_blank" className={linkClass}>
          <TbBrandYandex />
        </Link>
      )}

      {video && (
         <Link href={video} target="_blank" className={linkClass}>
         <PiVideoFill/>
       </Link>
      )}
    </div>
  );
};
