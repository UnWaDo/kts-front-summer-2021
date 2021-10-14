export type GitHubRepoItem = {
    id: number,
    name: string,
    owner: {
        login: string,
        avatar_url: string
    },
    updated_at: Date,
    stargazers_count: number
}

export type RepoItem = {
    id: number,
    name: string,
    owner_login: string,
    owner_avatar: string
    updated_at: Date,
    stargazers_count: number
}

export const repoItemNormalizer = (gitHubRepoItem: GitHubRepoItem): RepoItem => {
    return {
        id: gitHubRepoItem.id,
        name: gitHubRepoItem.name,
        owner_login: gitHubRepoItem.owner.login,
        owner_avatar: gitHubRepoItem.owner.avatar_url,
        updated_at: gitHubRepoItem.updated_at,
        stargazers_count: gitHubRepoItem.stargazers_count
    }
}