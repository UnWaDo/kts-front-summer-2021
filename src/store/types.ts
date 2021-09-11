import { ApiResponse } from "@shared/store";

/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */
export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], ErrorMessage>>,
    getRepoBranchesList(params: GetRepoBranchesListParams): Promise<ApiResponse<RepoBranch[], ErrorMessage>>
}

export type GetOrganizationReposListParams = {
    organizationName: string
}

export type GetRepoBranchesListParams = {
    ownerName: string,
    repositoryName: string
}

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

export type RepoBranch = {
    name: string,
    commit: {
        sha: string,
        url: string
    };
    protected: boolean
}

export type ErrorMessage = {
    message: string
}