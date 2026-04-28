import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { getPressFeedPage, PRESS_FEED_LIMIT } from '@/lib/press-feed'
import config from '@/payload.config'

export async function GET(req: NextRequest) {
  const pageParam = Number(req.nextUrl.searchParams.get('page') || '1')
  const limitParam = Number(req.nextUrl.searchParams.get('limit') || String(PRESS_FEED_LIMIT))

  const page = Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1
  const limit =
    Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 50
      ? Math.floor(limitParam)
      : PRESS_FEED_LIMIT

  const payload = await getPayload({ config })
  const data = await getPressFeedPage({ payload, page, limit })

  return NextResponse.json(data)
}
