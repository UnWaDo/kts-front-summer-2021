export type RepoItem = {
    id: number,
    name: string,
    owner: {
        login: string,
        avatar_url: string
    },
    updated_at: Date,
    stargazers_count: number
}