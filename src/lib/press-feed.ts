import { withBasePath } from '@/constants/basePath'
import { resolveUploadRecord, resolveUploadURL } from '@/lib/media-url'

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

export const mapPressDocToListItem = (doc: any, fallbackDoc?: any): PressListItem => {
  const trackValue = typeof doc.relatedTrack?.value === 'object' ? doc.relatedTrack.value : null
  const fallbackTrackValue =
    typeof fallbackDoc?.relatedTrack?.value === 'object' ? fallbackDoc.relatedTrack.value : null
  const cover = resolveUploadRecord(trackValue?.cover)
  const fallbackCover = resolveUploadRecord(fallbackTrackValue?.cover)
  const imageURL =
    resolveUploadURL(trackValue?.cover) ||
    resolveUploadURL(fallbackTrackValue?.cover) ||
    withBasePath('/cover.jpg')

  return {
    id: doc.id,
    name: doc.name,
    href: doc.href,
    source: doc.source || undefined,
    createdDate: doc.createdDate || undefined,
    imageURL,
    imageAlt: cover?.alt || fallbackCover?.alt || doc.name,
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
    where: {
      isVisible: {
        not_equals: false,
      },
    },
  })

  return {
    hasNextPage: Boolean(result.hasNextPage),
    items: result.docs.map(mapPressDocToListItem),
    nextPage: typeof result.nextPage === 'number' ? result.nextPage : null,
    page: result.page,
  }
}
