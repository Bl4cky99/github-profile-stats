const cache = new Map<string, { data: unknown; expires: number }>()

export const getOrSetCache = async <T>(
    key: string,
    ttl: number,
    fetcher: () => Promise<T>
): Promise<T> => {
    const cached = cache.get(key)
    if (cached && cached.expires > Date.now()) return cached.data as T

    const data = await fetcher()
    cache.set(key, { data, expires: Date.now() + ttl })
    return data
}
