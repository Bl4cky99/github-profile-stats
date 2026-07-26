import { profileStatsHandler } from '@/handlers/profile'
import { config } from '@/util/config'

export const SVG_HEADERS = {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': `public, max-age=${config.CACHE_TTL_SECONDS}`
}

export const handleRoute = async (req: Request): Promise<Response> => {
    const url = new URL(req.url)

    switch (url.pathname) {
        case '/profile.svg':
            return profileStatsHandler(req)
        case '/health':
            return new Response(
                JSON.stringify({
                    status: 'ok'
                }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        default:
            return new Response('Not found', { status: 404 })
    }
}
