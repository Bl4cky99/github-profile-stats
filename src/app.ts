import { serve } from 'bun'
import { routes } from 'routes'

const server = serve({
    port: 3000,
    routes
})

console.log(`Server running on  port "${server.port}"`)
