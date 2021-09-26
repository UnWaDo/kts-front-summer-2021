import { ApiResponse } from "@shared/store";
import { RepoBranch } from "@store/models/RepoBranch";
import { RepoItem } from "@store/models/RepoItem";

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
    organizationName: string,
    per_page?: number,
    page?: number
}

export type GetRepoBranchesListParams = {
    ownerName: string,
    repositoryName: string
}

export type ErrorMessage = {
    message: string
}