import { withBasePath } from '@/constants/basePath'

export type PressListItem = {
  id: number
  name: string
  href: string
  source?: string
  createdDate?: string
  imageURL: string
  imageAlt: string
}

export type PressFeedPage = {
  hasNextPage: boolean
  items: PressListItem[]
  nextPage: number | null
  page: number
}

export const PRESS_FEED_LIMIT = 10

export const mapPressDocToListItem = (doc: any): PressListItem => {
  const trackValue = typeof doc.relatedTrack?.value === 'object' ? doc.relatedTrack.value : null
  const cover = trackValue && typeof trackValue.cover === 'object' ? trackValue.cover : null

  return {
    id: doc.id,
    name: doc.name,
    href: doc.href,
    source: doc.source || undefined,
    createdDate: doc.createdDate || undefined,
    imageURL: cover?.url || cover?.thumbnailURL || withBasePath('/cover.jpg'),
    imageAlt: cover?.alt || doc.name,
  }
}

export const getPressFeedPage = async ({
  limit = PRESS_FEED_LIMIT,
  page = 1,
  payload,
}: {
  limit?: number
  page?: number
  payload: any
}): Promise<PressFeedPage> => {
  const result = await payload.find({
    collection: 'press',
    depth: 2,
    limit,
    page,
    sort: '_order',
  })

  return {
    hasNextPage: Boolean(result.hasNextPage),
    items: result.docs.map(mapPressDocToListItem),
    nextPage: typeof result.nextPage === 'number' ? result.nextPage : null,
    page: result.page,
  }
}
