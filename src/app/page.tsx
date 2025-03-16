import { Music } from "@/components/Music";
import { Photo } from "@/components/Photo";
import { MusicLinks } from "@/components/MusicLinks";
import { siteConfig } from "@/constants/siteMetaData";

export default function Home() {
  const links = {
    spotify: "https://open.spotify.com/album/164XXOs8lERD7QBJei7VOn",
    apple: "https://music.apple.com/ru/album/dreams-of-paris-single/1537459971",
    vk: "https://vk.com/music/album/-2000205076_9205076_ccad3981b65f286e54",
    yandex: "https://music.yandex.ru/album/12582186",
    youtube: "https://www.youtube.com/watch?v=hpnklUgaUW0",
    zvuk: "https://zvuk.com/artist/210264255",
  };
  return (
    <div className="fadeIn">
      <Photo />

      <div className="container mt-8 xl:mt-16 mb-4 xl:mb-8 mx-auto px-8 lg:px-20 fadeIn1">
        <div className="flex flex-col items-center mb-8 md:mb-10 xl:mb-16">
          <p className="text-sm md:text-lg xl:text-2xl  !text-stone-300">
            <b>Leyla Romanova</b> is a composer who creates music of different genres – from orchestral, chamber and neoclassical piano music to trance-techno.
          </p>
        </div>
        <Music />
      </div>
    </div>
  );
}
