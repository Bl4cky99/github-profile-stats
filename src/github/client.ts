import { env, fetch } from 'bun'
import type { GitHubResponse } from '@/types/github'

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

export const fetchGitHubData = async <T>(
    query: string,
    variables: object = {}
): Promise<T> => {
    const token = env.GITHUB_TOKEN
    if (!token) throw new Error('GITHUB_TOKEN is not defined in .env')

    const response = await fetch(GITHUB_GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query, variables })
    })

    const result = (await response.json()) as GitHubResponse<T>

    if (result.errors) {
        throw new Error(`GitHub API Error: ${result.errors[0]?.message}`)
    }

    return result.data
}
