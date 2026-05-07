import { generateKeyBetween } from 'payload/shared'

type TopOrderHookArgs = {
  collection: 'live-orchestral-chamber' | 'press' | 'releases'
}

export const setOrderableToTopOnCreate = ({ collection }: TopOrderHookArgs) => {
  return async ({
    data,
    operation,
    req,
  }: {
    data?: any
    operation: 'create' | 'update'
    req: any
  }) => {
    if (!data || operation !== 'create') return data
    if (typeof data._order === 'string' && data._order.length > 0) return data

    const firstDoc = await req.payload.find({
      collection,
      depth: 0,
      limit: 1,
      pagination: false,
      select: {
        _order: true,
      },
      sort: '_order',
    })

    const firstOrder = firstDoc?.docs?.[0]?._order
    data._order = generateKeyBetween(null, typeof firstOrder === 'string' ? firstOrder : null)

    return data
  }
}
