// import Image from "next/image"

import { MusicLinks } from "./MusicLinks"

export const Photo = () => {
  const links = {
    spotify: 'https://open.spotify.com/album/164XXOs8lERD7QBJei7VOn',
    apple: 'https://music.apple.com/ru/album/dreams-of-paris-single/1537459971',
    vk: 'https://vk.com/music/album/-2000205076_9205076_ccad3981b65f286e54',
    yandex: 'https://music.yandex.ru/album/12582186',
    youtube: 'https://www.youtube.com/watch?v=hpnklUgaUW0'
  }
  return (
    <div style={{
      minHeight: '150px',
      height: '50vh',
      backgroundImage: 'url(/personal-site/cover.jpg)',
      backgroundAttachment: 'scroll',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '45% 55%',
      position: 'relative'
    }}>
      <div className="text-xl absolute tracking-[.2em] bottom-5 right-10 fadeIn1">
        <div className="mb-2">Listen</div>
        <MusicLinks {...links}/>
      </div>
    </div>
  )
}