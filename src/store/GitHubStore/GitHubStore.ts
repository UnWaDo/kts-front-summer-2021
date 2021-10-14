import ApiStore from '@shared/store';
import { RepoBranch } from "@store/models/RepoBranch"
import { GitHubRepoItem } from '@store/models/RepoItem';
import { ApiResponse, HTTPMethod } from '@store/models/Requests'

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<GitHubRepoItem[], ErrorMessage>>,
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

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com");

    // Получает список репозиториев у заданной компании
    // @params: список параметров для запроса (фактически — название компании)
    // @return: Promise, содержащий ApiResponse со списком репозиториев (при успешном исходе) или сообщением об ошибке
    async getOrganizationReposList({ organizationName, per_page, page }: GetOrganizationReposListParams):
        Promise<ApiResponse<GitHubRepoItem[], ErrorMessage>> {
        let requestParams = {
            method: HTTPMethod.GET,
            endpoint: `/orgs/${organizationName}/repos`,
            headers: {},
            data: {
                orgs: organizationName,
                per_page: per_page,
                page: page
            }
        };
        return this.apiStore.request<GitHubRepoItem[], ErrorMessage>(requestParams);
    }

    async getRepoBranchesList({ ownerName, repositoryName }: GetRepoBranchesListParams):
        Promise<ApiResponse<RepoBranch[], ErrorMessage>> {
        let requestParams = {
            method: HTTPMethod.GET,
            endpoint: `/repos/${ownerName}/${repositoryName}/branches`,
            headers: {},
            data: {
                owner: ownerName,
                repo: repositoryName
            }
        };
        return this.apiStore.request<RepoBranch[], ErrorMessage>(requestParams);
    }
}