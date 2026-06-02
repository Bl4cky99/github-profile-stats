import { getProfileStats } from '@/github/service'
import { SVG_HEADERS } from '@/handlers'
import { renderProfileCard } from '@/renderer/profile'
import { getOrSetCache } from '@/util/cache'
import { getErrorMessage } from '@/util/error'
import { logger } from '@/util/logger'
import { config } from '@/util/config'

export const profileStatsHandler = async (req: Request): Promise<Response> => {
    try {
        const ttl = config.CACHE_TTL_SECONDS * 1000
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
