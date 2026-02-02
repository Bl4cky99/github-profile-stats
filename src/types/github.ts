export interface GitHubResponse<T> {
    data: T
    errors?: Array<{ message: string }>
}

export interface RepositoryNode {
    name: string
    isPrivate: boolean
    stargazerCount: number

    issues: { totalCount: number }
    closedIssues: { totalCount: number }
    pullRequests: { totalCount: number }
    closedPullRequests: { totalCount: number }

    languages: {
        edges: Array<{
            size: number
            node: { name: string; color: string }
        }>
    }
}

export interface UserStats {
    user: {
        name: string
        contributionsCollection: {
            totalCommitContributions: number
            restrictedContributionsCount: number
        }
        repositories: {
            totalCount: number
            nodes: RepositoryNode[]
        }
    }
}
