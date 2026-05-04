import { validateSlugNoSpaces } from './validators.ts'

type CrossCollectionSlugValidatorArgs = {
  currentCollection: 'releases' | 'live-orchestral-chamber'
  otherCollection: 'releases' | 'live-orchestral-chamber'
}

export const createCrossCollectionSlugValidator =
  ({ currentCollection, otherCollection }: CrossCollectionSlugValidatorArgs) =>
  async (
    value: unknown,
    {
      id,
      req,
    }: {
      id?: number | string
      req?: any
    },
  ) => {
    const baseValidation = validateSlugNoSpaces(value)
    if (baseValidation !== true) return baseValidation

    if (!req?.payload || typeof value !== 'string') return true

    const slug = value.trim()
    if (!slug) return 'Slug обязателен'

    const [currentDocs, otherDocs] = await Promise.all([
      req.payload.find({
        collection: currentCollection,
        limit: 10,
        where: {
          href: {
            equals: slug,
          },
        },
      }),
      req.payload.find({
        collection: otherCollection,
        limit: 10,
        where: {
          href: {
            equals: slug,
          },
        },
      }),
    ])

    const currentId = id != null ? String(id) : null

    const hasConflictInCurrent = currentDocs.docs.some((doc: { id: number | string }) => {
      if (!currentId) return true
      return String(doc.id) !== currentId
    })

    if (hasConflictInCurrent || otherDocs.docs.length > 0) {
      return 'Этот slug уже используется в RELEASES или LIVE Orchestral & Chamber'
    }

    return true
  }
