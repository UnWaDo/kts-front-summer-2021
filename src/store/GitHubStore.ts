import ApiStore from '../shared/store/ApiStore';
import { ApiResponse, HTTPMethod } from '../shared/store/types'
import {IGitHubStore, GetOrganizationReposListParams, RepoItem, ErrorMessage } from "./types";

// Служит для обращения к API Github
export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com");

    // Получает список репозиториев у заданной компании
    // @params: список параметров для запроса (фактически — название компании)
    // @return: Promise, содержащий ApiResponse со списком репозиториев (при успешном исходе) или сообщением об ошибке
    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], ErrorMessage>> {
        let requestParams = {
            method: HTTPMethod.GET,
            endpoint: `/orgs/${params.organizationName}/repos`,
            headers: {},
            data: {
                orgs: params.organizationName
            }
        };
        return this.apiStore.request<RepoItem[], ErrorMessage>(requestParams);
    }
}