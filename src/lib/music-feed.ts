import { withBasePath } from '@/constants/basePath'

export type MusicCardItem = {
  amazon?: string
  apple?: string
  cardSubtitle?: string
  cardType?: string
  group?: string
  href: string
  imageURL: string
  name: string
  releaseYear?: number
  spotify?: string
  type?: string
  video?: string
  vk?: string
  yandex?: string
  youtube?: string
  zvuk?: string
}

export type MusicGroups = {
  'LIVE Orchestral & Chamber': {
    items: MusicCardItem[]
  }
  RELEASES: {
    items: MusicCardItem[]
  }
}

const mapDocToMusicCard = (doc: any): MusicCardItem => {
  const cover = typeof doc.cover === 'object' ? doc.cover : null

  return {
    amazon: doc.amazon ?? undefined,
    apple: doc.apple ?? undefined,
    cardSubtitle: doc.cardSubtitle ?? undefined,
    cardType: doc.cardType ?? undefined,
    group: doc.group ?? undefined,
    href: doc.href,
    imageURL: cover?.url || cover?.thumbnailURL,
    name: doc.name,
    releaseYear: doc.releaseYear ?? undefined,
    spotify: doc.spotify ?? undefined,
    type: doc.type ?? undefined,
    video: doc.video ?? undefined,
    vk: doc.vk ?? undefined,
    yandex: doc.yandex ?? undefined,
    youtube: doc.youtube ?? undefined,
    zvuk: doc.zvuk ?? undefined,
  }
}

export const getMusicGroups = async (payload: any): Promise<MusicGroups> => {
  const [releases, live] = await Promise.all([
    payload.find({
      collection: 'releases',
      depth: 1,
      limit: 1000,
      sort: '_order',
    }),
    payload.find({
      collection: 'live-orchestral-chamber',
      depth: 1,
      limit: 1000,
      sort: '_order',
    }),
  ])

  return {
    RELEASES: {
      items: releases.docs.map(mapDocToMusicCard),
    },
    'LIVE Orchestral & Chamber': {
      items: live.docs.map(mapDocToMusicCard),
    },
  }
}
