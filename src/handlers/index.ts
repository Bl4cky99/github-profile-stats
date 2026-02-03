import { env } from 'bun'
import { profileStatsHandler } from './profile'

export const SVG_HEADERS = {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': `public, max-age=${env.CACHE_TTL_SECONDS ?? 3600}`
}

export const handleRoute = async (req: Request): Promise<Response> => {
    const url = new URL(req.url)

    switch (url.pathname) {
        case '/profile.svg':
            return profileStatsHandler(req)
        default:
            return new Response('Not found', { status: 404 })
    }
}
