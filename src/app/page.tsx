import { Music } from "@/components/Music";
import { Photo } from "@/components/Photo";
import { MusicLinks } from "@/components/MusicLinks";

export default function Home() {
  const links = {
    spotify: "https://open.spotify.com/album/164XXOs8lERD7QBJei7VOn",
    apple: "https://music.apple.com/ru/album/dreams-of-paris-single/1537459971",
    vk: "https://vk.com/music/album/-2000205076_9205076_ccad3981b65f286e54",
    yandex: "https://music.yandex.ru/album/12582186",
    youtube: "https://www.youtube.com/watch?v=hpnklUgaUW0",
  };
  return (
    <div className="fadeIn">
      <Photo />

      <div className="container mt-16 mb-8 mx-auto px-8 xl:px-24 fadeIn1">
        <div className="flex flex-col items-center mb-16">
          <p className="text-3xl mb-16">
            <b>Leyla Romanova</b> is a <i>composer</i> who creates music of
            different genres — from orchestral and neoclassical piano music to
            techno
          </p>
          <div className="text-3xl font-semibold mb-4">Listen on</div>
          <div className="text-4xl">
            <MusicLinks {...links} />
          </div>
        </div>
        <Music />
      </div>
    </div>
  );
}
