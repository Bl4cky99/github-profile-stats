import { serve } from 'bun'
import { handleRoute } from '@/handlers'
import { logger } from '@/util/logger'

const server = serve({
    port: 3000,

    async fetch(req) {
        const start = performance.now()
        const url = new URL(req.url)

        const response = await handleRoute(req)

        const duration = Math.round(performance.now() - start)

        logger.info(`${req.method} ${url.pathname}`, {
            status: response.status,
            duration: `${duration}ms`,
            userAgent: req.headers.get('user-agent')
        })

        return response
    }
})

logger.info(`Server running on  port "${server.port}"`)
