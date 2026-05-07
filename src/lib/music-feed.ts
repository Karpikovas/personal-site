import { withBasePath } from '@/constants/basePath'
import { resolveUploadURL } from '@/lib/media-url'

export type MusicCardItem = {
  amazon?: string
  apple?: string
  cardSubtitle?: string
  cardType?: string
  href: string
  id?: number
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

export const mapDocToMusicCard = (doc: any, fallbackDoc?: any): MusicCardItem => {
  const imageURL =
    resolveUploadURL(doc?.cover) ||
    resolveUploadURL(fallbackDoc?.cover) ||
    withBasePath('/cover.jpg')

  return {
    amazon: doc.amazon ?? undefined,
    apple: doc.apple ?? undefined,
    cardSubtitle: doc.cardSubtitle ?? undefined,
    cardType: doc.cardType ?? undefined,
    href: doc.href,
    id: doc.id,
    imageURL,
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
      where: {
        isVisible: {
          not_equals: false,
        },
      },
    }),
    payload.find({
      collection: 'live-orchestral-chamber',
      depth: 1,
      limit: 1000,
      sort: '_order',
      where: {
        isVisible: {
          not_equals: false,
        },
      },
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
