import { env } from 'bun'
import { getProfileStats } from 'github/service'
import { getOrSetCache } from 'util/cache'
import { getErrorMessage } from 'util/error'
import { logger } from 'util/logger'

export const profileStatsHandler = async (req: Request): Promise<Response> => {
    try {
        const ttl = (env.CACHE_TTL_SECONDS ?? 3600) * 1000

        const stats = await getOrSetCache('profile-stats', ttl, getProfileStats)
        return new Response(JSON.stringify(stats))
    } catch (error: unknown) {
        logger.error('profile handler failed', {
            error: getErrorMessage(error)
        })
        return new Response('Internal Server Error', { status: 500 })
    }
}
