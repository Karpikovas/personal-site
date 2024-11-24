const MUSIC: BaseMusicItem[] = [
  // Cinematic
  {
    type: 'single',
    group: 'Cinematic',
    name: 'CYBERSYMPHONY',
    image: 'Cybersymphony.jpg',
    youtube: 'https://youtu.be/xN-X9HNMK88',
    spotify: 'https://open.spotify.com/album/4ZQUY1aGHiJQHYKkIGsPI9',
    apple: 'https://music.apple.com/ru/album/cybersymphony-dedicated-to-christopher-nolan-single/1740963781',
    vk: 'https://vk.com/music/album/-2000569517_20569517_9e5f4a23b3024b1ac5',
    yandex: 'https://music.yandex.ru/album/30705190'
  },
  {
    type: 'single',
    group: 'Cinematic',
    name: 'Fairy Tale',
    image: 'Cybersymphony.jpg',
  },
  // Electronic
  {
    type: 'single',
    group: 'Electronic',
    name: 'Are You Waiting For Me?',
    image: 'Are you waiting for me.jpg',
  },
  {
    type: 'single',
    group: 'Electronic',
    name: 'Diptych',
    image: 'Diptych.jpg',
    spotify: 'https://open.spotify.com/album/2FilJmUXcBZ42RbAGv7BUH',
    apple: 'https://music.apple.com/ru/album/diptych/1703612185?i=1703612186',
    vk: 'https://vk.com/music/album/-2000714094_18714094_957737b64b38673c8d',
    yandex: 'https://music.yandex.ru/album/27061554',
    youtube: 'https://www.youtube.com/watch?v=a0a6gzY6Qrw'
  },
  {
    type: 'single',
    group: 'Electronic',
    name: 'Back to Life',
    image: 'Back to life.jpg',
    spotify: 'https://open.spotify.com/album/7C9yHilQmy4M34naKsDcXz',
    apple: 'https://music.apple.com/ru/album/back-to-life-feat-elnarə-xəlilova/1697207806?i=1697207807',
    vk: 'https://vk.com/music/album/-2000418125_18418125_e7a30053d59c84479c',
    yandex: 'https://music.yandex.ru/album/26601339',
    youtube: 'https://www.youtube.com/watch?v=mBEcXxA9LsE'
  },
  // {
  //   type: 'album',
  //   group: 'Songs (rock | alternative)'
  // },
  // {
  //   type: 'EP',
  //   group: 'Piano'
  // },
  // Live video
  {
    type: 'single',
    group: 'Orchestral (live)',
    name: 'Reverie'
  },
  {
    type: 'single',
    group: 'Orchestral (live)',
    name: 'Dedication'
  },
  // Chamber
  {
    type: 'single',
    group: 'Chamber',
    name: 'Dreams of Paris',
    image: 'Dreams of Paris.jpg',
    spotify: 'https://open.spotify.com/album/164XXOs8lERD7QBJei7VOn',
    apple: 'https://music.apple.com/ru/album/dreams-of-paris-single/1537459971',
    vk: 'https://vk.com/music/album/-2000205076_9205076_ccad3981b65f286e54',
    yandex: 'https://music.yandex.ru/album/12582186',
    youtube: 'https://www.youtube.com/watch?v=hpnklUgaUW0'
  }
]

export type BaseMusicItem = {
  type: string
  group: string
  name: string
  image?: string
  youtube?: string
  spotify?: string
  apple?: string
  vk?: string
  yandex?: string
}

export function getGroups() {
  const single = MUSIC.filter(item => item.type === 'single')
  let result = {}

  single.forEach(item => {
    if (!result.hasOwnProperty(item.group)) {
      result[item.group] = { items: [] }
    }

    result[item.group].items.push(item)
  })

  return result
}