export interface GitHubResponse<T> {
    data: T
    errors?: Array<{ message: string }>
}
