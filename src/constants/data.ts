const MUSIC: BaseMusicItem[] = [
  // Cinematic
  {
    type: 'single',
    group: 'Cinematic',
    name: 'CYBERSYMPHONY (dedicated to Christopher Nolan)',
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

  {
    type: 'single',
    group: 'Electronic',
    name: 'Diptych (copy)',
    image: 'Diptych.jpg',
    spotify: 'https://open.spotify.com/album/2FilJmUXcBZ42RbAGv7BUH',
    apple: 'https://music.apple.com/ru/album/diptych/1703612185?i=1703612186',
    vk: 'https://vk.com/music/album/-2000714094_18714094_957737b64b38673c8d',
    yandex: 'https://music.yandex.ru/album/27061554',
    youtube: 'https://www.youtube.com/watch?v=a0a6gzY6Qrw'
  },
  {
    type: 'album',
    group: 'Songs (rock | alternative)',
    name: 'LR album',
    image: 'LR альбом.jpg',
    spotify: 'https://open.spotify.com/album/5ovsKLRsWiiqEwg4nYykN3',
    apple: 'https://music.apple.com/ru/album/lr/1761763816',
    vk: 'https://vk.com/music/album/-2000887854_17887854_9d4b6e697241660587',
    yandex: 'https://music.yandex.ru/album/25675223',
    youtube: 'https://www.youtube.com/watch?v=DaGAILITo4Q&list=OLAK5uy_ki1nGaSoxmNYMxgg3_5VackJ2wuQ9FLPE',
    items: [
      {
        name: "Вернусь",
      },
      { name: "Embrace me " },
      { name: "Город" },
      { name: "Сбежим?" },
      { name: "Lonely night", youtube: "https://music.youtube.com/watch?v=SfmN-pGZaZY", spotify: "https://open.spotify.com/track/3K2YdJrstzuUb28OfAuua0?si=9a88eed764af4a3b", apple: "https://music.apple.com/ru/album/lonely-night/1684942408?i=1684942414", amazon: "https://amazon.com/music/player/tracks/B0C3MMVR56?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_PJCoJADGxMuRTMAkkwelIEYfg" },
      { name: "Влюбленные" },
      { name: "Ночь" },
      { name: "Кино" },
      { name: "Сонный город" },
      { name: " Ре" },
    ]
  },
  {
    type: 'album',
    group: 'Piano',
    name: 'EP',
    image: 'Piano.png',
    items: [
      { name: 'Fantasia' },
      { name: 'Capriccio' },
      { name: 'Melody (A. Petrov)' },
      { name: 'Caravan' }
    ]
  },
  // Live video
  {
    type: 'single',
    group: 'Orchestral (live)',
    name: 'Reverie',
    image: 'Reverie.png',
    youtube: 'https://youtu.be/j2RQo0AcVO0?si=JCoMi3i3QmhuggVK'
  },
  {
    type: 'single',
    group: 'Orchestral (live)',
    name: 'Dedication',
    image: 'Reverie.png',
  },
  // Chamber
  {
    type: 'single',
    group: 'Chamber',
    name: 'Dreams of Paris',
    image: 'Dreams of Paris.png',
    spotify: 'https://open.spotify.com/album/164XXOs8lERD7QBJei7VOn',
    apple: 'https://music.apple.com/ru/album/dreams-of-paris-single/1537459971',
    vk: 'https://vk.com/music/album/-2000205076_9205076_ccad3981b65f286e54',
    yandex: 'https://music.yandex.ru/album/12582186',
    youtube: 'https://www.youtube.com/watch?v=hpnklUgaUW0'
  },

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
  items?: any[]
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

export function getAlbums() {
  const album = MUSIC.filter(item => item.type === 'album')
  let albums = []

  album.forEach(item => {
    albums.push(item)
  })

  return albums
}