import { getProfileStats } from 'github/service'
import { getErrorMessage } from 'util/error'
import { logger } from 'util/logger'

export const profileStatsHandler = async (req: Request): Promise<Response> => {
    try {
        const stats = await getProfileStats()
        return new Response(JSON.stringify(stats))
    } catch (error: unknown) {
        logger.error('profile handler failed', {
            error: getErrorMessage(error)
        })
        return new Response('Internal Server Error', { status: 500 })
    }
}
