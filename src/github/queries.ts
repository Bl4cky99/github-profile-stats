export const PROFILE_STATS_QUERY = `
    query($username: String!) {
        user(login: $username) {
            name
            login
            contributionsCollection {
                totalCommitContributions
                restrictedContributionsCount
            }
            repositories(first: 100, ownerAffiliations: OWNER) {
                totalCount
                nodes {
                    name
                    isPrivate
                    stargazerCount
                    issues(states: OPEN) { totalCount }
                    closedIssues: issues(states: CLOSED) { totalCount }
                    pullRequests(states: OPEN) { totalCount }
                    closedPullRequests: pullRequests(states: CLOSED) { totalCount }
                    languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                        edges {
                            size
                            node { name color }
                        }
                    }
                }
            }
        }
    }
`
