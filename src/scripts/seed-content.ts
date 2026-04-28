import config from '../payload.config.ts'
import { getGroups, getPress } from '../constants/data.ts'
import { getPayload } from 'payload'

const toNumber = (value: number | null | undefined): number | null => {
  if (typeof value !== 'number' || Number.isNaN(value)) return null
  return value
}

const toDateOrNull = (value?: string): string | null => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

const upsertByHref = async ({
  payload,
  collection,
  href,
  data,
}: {
  payload: any
  collection: 'releases' | 'live-orchestral-chamber'
  href: string
  data: Record<string, unknown>
}) => {
  const existing = await payload.find({
    collection,
    limit: 1,
    where: {
      href: {
        equals: href,
      },
    },
  })

  if (existing.docs[0]?.id) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
    })
  }

  return payload.create({
    collection,
    data,
  })
}

const upsertPressByHref = async ({
  payload,
  href,
  data,
}: {
  payload: any
  href: string
  data: Record<string, unknown>
}) => {
  const existing = await payload.find({
    collection: 'press',
    limit: 1,
    where: {
      href: {
        equals: href,
      },
    },
  })

  if (existing.docs[0]?.id) {
    return payload.update({
      collection: 'press',
      id: existing.docs[0].id,
      data,
    })
  }

  return payload.create({
    collection: 'press',
    data,
  })
}

const main = async () => {
  const payload = await getPayload({ config })
  const p: any = payload

  const groups = getGroups()
  const releases = groups.RELEASES.items.filter(Boolean) as any[]
  const live = groups['LIVE Orchestral & Chamber'].items.filter(Boolean) as any[]

  const releaseByImage = new Map<string, { relationTo: 'releases'; value: number }>()
  const liveByImage = new Map<string, { relationTo: 'live-orchestral-chamber'; value: number }>()

  let index = 0
  for (const item of releases) {
    index += 1

    const doc = await upsertByHref({
      payload: p,
      collection: 'releases',
      href: item.href,
      data: {
        displayOrder: index,
        name: item.name,
        type: item.type,
        href: item.href,
        group: item.group,
        cardSubtitle: item.cardSubtitle,
        cardType: item.cardType,
        releaseYear: toNumber(item.releaseYear),
        description: item.description,
        image: item.image,
        youtube: item.youtube,
        video: item.video,
        spotify: item.spotify,
        apple: item.apple,
        vk: item.vk,
        yandex: item.yandex,
        zvuk: item.zvuk,
        amazon: item.amazon,
        items: item.items?.map((track: any) => ({
          name: track.name,
          youtube: track.youtube,
          youtube_music: track.youtube_music,
          spotify: track.spotify,
          apple: track.apple,
          vk: track.vk,
          yandex: track.yandex,
          zvuk: track.zvuk,
          amazon: track.amazon,
          video: track.video,
        })),
      },
    })

    if (item.image && typeof doc.id === 'number') {
      releaseByImage.set(item.image, {
        relationTo: 'releases',
        value: doc.id,
      })
    }
  }

  index = 0
  for (const item of live) {
    index += 1

    const doc = await upsertByHref({
      payload: p,
      collection: 'live-orchestral-chamber',
      href: item.href,
      data: {
        displayOrder: index,
        name: item.name,
        href: item.href,
        type: item.type,
        group: item.group,
        cardSubtitle: item.cardSubtitle,
        image: item.image,
        youtube: item.youtube,
        video: item.video,
        spotify: item.spotify,
        apple: item.apple,
        vk: item.vk,
        yandex: item.yandex,
        zvuk: item.zvuk,
        amazon: item.amazon,
      },
    })

    if (item.image && typeof doc.id === 'number') {
      liveByImage.set(item.image, {
        relationTo: 'live-orchestral-chamber',
        value: doc.id,
      })
    }
  }

  const pressItems = getPress()

  for (const item of pressItems) {
    let relatedTrack = null

    if (item.image && releaseByImage.has(item.image)) {
      relatedTrack = releaseByImage.get(item.image)
    } else if (item.image && liveByImage.has(item.image)) {
      relatedTrack = liveByImage.get(item.image)
    }

    await upsertPressByHref({
      payload: p,
      href: item.href,
      data: {
        order: item.order ?? 0,
        name: item.name,
        href: item.href,
        source: item.source,
        createdDate: toDateOrNull(item.created_date),
        image: item.image,
        relatedTrack,
      },
    })
  }

  const summary = {
    releases: releases.length,
    live: live.length,
    press: pressItems.length,
  }

  payload.logger.info(`Seed completed: ${JSON.stringify(summary)}`)
  await payload.destroy()
}

void main()
