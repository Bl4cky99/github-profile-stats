import { profileStatsHandler } from './profile'

export const handleRoute = async (req: Request): Promise<Response> => {
    const url = new URL(req.url)

    switch (url.pathname) {
        case '/profile.svg':
            return profileStatsHandler(req)
        default:
            return new Response('Not found', { status: 404 })
    }
}
