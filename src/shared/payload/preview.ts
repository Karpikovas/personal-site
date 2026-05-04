export const getMusicPreviewPath = ({
  collection,
  href,
  id,
}: {
  collection: 'live-orchestral-chamber' | 'releases'
  href: unknown
  id?: unknown
}): null | string => {
  if (typeof href !== 'string') return null

  const normalizedHref = href.trim()
  if (!normalizedHref) return null

  const params = new URLSearchParams()
  params.set('previewCollection', collection)

  const normalizedId =
    typeof id === 'string' || typeof id === 'number' ? String(id).trim() : ''
  if (normalizedId) {
    params.set('previewId', normalizedId)
  }

  return `/music/${encodeURIComponent(normalizedHref)}?${params.toString()}`
}

export const getPressPreviewPath = (id: unknown): string => {
  const normalizedId = typeof id === 'string' || typeof id === 'number' ? String(id).trim() : ''
  if (!normalizedId) return '/press'

  return `/press?previewCollection=press&previewId=${encodeURIComponent(normalizedId)}`
}
