declare module 'bun' {
    interface Env {
        GITHUB_TOKEN: string
        GITHUB_USERNAME: string

        CACHE_TTL_SECONDS: number
        LOG_LEVEL: string

        PROFILE_NUMBER_OF_LANGS: number
    }
}
