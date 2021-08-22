import { ApiResponse } from "../shared/store/types";

/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */
 export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], ErrorMessage>>;
}

export type GetOrganizationReposListParams = {
    organizationName: string;
}

export type RepoItem = {
    name: string;
    owner: {
        login: string,
        avatar_url: string
    };
    updated_at: Date;
    stargazers_count: number;
}

export type ErrorMessage = {
    message: string;
}