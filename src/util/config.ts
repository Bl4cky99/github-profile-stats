import { env } from 'bun'
import { z } from 'zod'

const envSchema = z.object({
    GITHUB_TOKEN: z.string().min(1, 'may not be empty'),
    GITHUB_USERNAME: z.string().min(1, 'may not be empty'),

    CACHE_TTL_SECONDS: z.coerce.number().int().positive().default(3600),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),

    PROFILE_NUMBER_LANGS: z.coerce.number().int().positive().default(3)
})

function loadConfig() {
    const result = envSchema.safeParse(env)
    if (!result.success) {
        throw new Error(
            `invalid env-configuration:\n${z.prettifyError(result.error)}`
        )
    }
    return result.data
}

export const config = loadConfig()
