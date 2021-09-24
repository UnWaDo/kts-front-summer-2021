import ApiStore from '@shared/store';
import { ApiResponse, HTTPMethod } from '@shared/store'

import { IGitHubStore, RepoItem, ErrorMessage, RepoBranch } from "./types";
import { GetOrganizationReposListParams, GetRepoBranchesListParams } from './types'

// Служит для обращения к API Github
export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com");

    // Получает список репозиториев у заданной компании
    // @params: список параметров для запроса (фактически — название компании)
    // @return: Promise, содержащий ApiResponse со списком репозиториев (при успешном исходе) или сообщением об ошибке
    async getOrganizationReposList({ organizationName, per_page, page }: GetOrganizationReposListParams):
        Promise<ApiResponse<RepoItem[], ErrorMessage>> {
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
        return this.apiStore.request<RepoItem[], ErrorMessage>(requestParams);
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