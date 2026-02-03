import { env } from 'bun'
import { getProfileStats } from 'github/service'
import { SVG_HEADERS } from 'handlers'
import { renderProfileCard } from 'renderer/profile'
import { getOrSetCache } from 'util/cache'
import { getErrorMessage } from 'util/error'
import { logger } from 'util/logger'

export const profileStatsHandler = async (req: Request): Promise<Response> => {
    try {
        const ttl = (env.CACHE_TTL_SECONDS ?? 3600) * 1000
        const stats = await getOrSetCache('profile-stats', ttl, getProfileStats)
        const svg = await renderProfileCard(stats)

        return new Response(svg, {
            headers: SVG_HEADERS
        })
    } catch (error: unknown) {
        logger.error('profile handler failed', {
            error: getErrorMessage(error)
        })
        return new Response('Internal Server Error', { status: 500 })
    }
}
