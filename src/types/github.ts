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

export interface TopLanguage {
    name: string
    size: number
    color: string
}

export interface ProfileStatsResult {
    name: string
    totalRepos: number
    privateRepos: number
    totalCommits: number
    stars: number
    openIssues: number
    closedIssues: number
    pullRequests: number
    closedPullRequests: number
    topLanguages: TopLanguage[]
}
