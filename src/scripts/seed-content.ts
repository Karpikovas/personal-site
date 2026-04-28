import { getGroups, getPress } from '../constants/data.ts'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

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

const getLegacyCoverPath = (filename: string) =>
  path.resolve(process.cwd(), 'public', 'covers', filename)

const ensureMediaFromLegacyImage = async ({
  payload,
  imageFilename,
  cache,
}: {
  payload: any
  imageFilename?: string
  cache: Map<string, number>
}): Promise<number | null> => {
  if (!imageFilename) return null
  if (cache.has(imageFilename)) return cache.get(imageFilename) ?? null

  const existing = await payload.find({
    collection: 'media',
    limit: 1,
    where: {
      filename: {
        equals: imageFilename,
      },
    },
  })

  if (existing.docs[0]?.id) {
    cache.set(imageFilename, existing.docs[0].id)
    return existing.docs[0].id
  }

  const filePath = getLegacyCoverPath(imageFilename)
  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`[seed] Cover not found: ${filePath}`)
    return null
  }

  const created = await payload.create({
    collection: 'media',
    filePath,
    data: {
      alt: imageFilename,
    },
  })

  if (typeof created.id === 'number') {
    cache.set(imageFilename, created.id)
    return created.id
  }

  return null
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

export async function script(config: any) {
  const payload = await getPayload({ config })
  const p: any = payload

  const groups = getGroups()
  const releases = groups.RELEASES.items.filter(Boolean) as any[]
  const live = groups['LIVE Orchestral & Chamber'].items.filter(Boolean) as any[]

  const releaseByImage = new Map<string, { relationTo: 'releases'; value: number }>()
  const liveByImage = new Map<string, { relationTo: 'live-orchestral-chamber'; value: number }>()
  const mediaByFilename = new Map<string, number>()

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
        cover: await ensureMediaFromLegacyImage({
          payload: p,
          imageFilename: item.image,
          cache: mediaByFilename,
        }),
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
        cover: await ensureMediaFromLegacyImage({
          payload: p,
          imageFilename: item.image,
          cache: mediaByFilename,
        }),
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

    if (!relatedTrack) {
      p.logger.warn(`[seed] Press item has no related track by image: ${item.href} (${item.image ?? 'no-image'})`)
      continue
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
        relatedTrack,
      },
    })
  }

  const summary = {
    releases: releases.length,
    live: live.length,
    press: pressItems.length,
    media: mediaByFilename.size,
  }

  payload.logger.info(`Seed completed: ${JSON.stringify(summary)}`)
  await payload.destroy()
}
