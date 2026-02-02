export const routes = {
    '/profile-stats.svg': new Response('OK'),
    '/*': new Response('Not Found', { status: 404 })
}
