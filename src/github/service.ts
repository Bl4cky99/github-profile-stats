import { env } from 'bun'
import { fetchGitHubData } from './client'
import { type RepositoryNode, type UserStats } from 'types/github'
import { PROFILE_STATS_QUERY } from './queries'

const aggregateRepoStats = (repos: RepositoryNode[]) => {
    return repos.reduce(
        (acc, repo) => ({
            stars: acc.stars + repo.stargazerCount,
            openIssues: acc.openIssues + repo.issues.totalCount,
            closedIssues: acc.closedIssues + repo.closedIssues.totalCount,
            pullRequests: acc.pullRequests + repo.pullRequests.totalCount,
            closedPullRequests:
                acc.closedPullRequests + repo.closedPullRequests.totalCount,
            privateRepos: acc.privateRepos + (repo.isPrivate ? 1 : 0)
        }),
        {
            stars: 0,
            openIssues: 0,
            closedIssues: 0,
            pullRequests: 0,
            closedPullRequests: 0,
            privateRepos: 0
        }
    )
}

const aggregateLanguages = (repos: RepositoryNode[]) => {
    const map: Record<string, { size: number; color: string }> = {}

    for (const repo of repos) {
        for (const { size, node } of repo.languages.edges) {
            if (!map[node.name]) map[node.name] = { size: 0, color: node.color }
            map[node.name]!.size += size
        }
    }

    return Object.entries(map)
        .sort((a, b) => b[1].size - a[1].size)
        .slice(0, env.PROFILE_NUMBER_OF_LANGS ?? 10)
        .map(([name, info]) => ({ name, ...info }))
}

export const getProfileStats = async () => {
    const username = env.GITHUB_USERNAME
    if (!username) throw new Error('GITHUB_USERNAME is not defined in .env')

    const data = await fetchGitHubData<UserStats>(PROFILE_STATS_QUERY, {
        username
    })
    const { user } = data
    const repos = user.repositories.nodes

    const stats = aggregateRepoStats(repos)
    const topLanguages = aggregateLanguages(repos)

    return {
        name: user.name,
        totalRepos: user.repositories.totalCount,
        privateRepos: stats.privateRepos,
        totalCommits:
            user.contributionsCollection.totalCommitContributions +
            user.contributionsCollection.restrictedContributionsCount,
        stars: stats.stars,
        openIssues: stats.openIssues,
        closedIssues: stats.closedIssues,
        pullRequests: stats.pullRequests,
        closedPullRequests: stats.closedPullRequests,
        topLanguages
    }
}
