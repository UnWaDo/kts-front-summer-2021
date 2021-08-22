import {ApiResponse, IApiStore, RequestParams} from "./types";

export default class ApiStore implements IApiStore {
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    baseUrl: string;

    request<SuccessT, ErrorT = any, DataT = {}>(params: RequestParams<DataT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let url = this.baseUrl + params.endpoint + "?";
        for (let i in params.data) {
            url += i + "=" + String(params.data[i]) + "&";
        }
        let requestInput = {
            method: params.method.valueOf()
        };
        return fetch(url, requestInput).then(result => result.json());
    }
}