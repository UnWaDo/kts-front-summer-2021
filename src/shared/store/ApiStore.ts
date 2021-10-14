import { ApiResponse, HTTPStatus, RequestParams } from "@store/models/Requests";
import qs from "qs";


export interface IApiStore {
    // базовый url для выполнения запросов. TODO: указать url GitHub API в классе ApiStore
    readonly baseUrl: string;

    // Метод, с помощью которого делается запрос. TODO: реализовать в классе ApiStore
    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>
}

export default class ApiStore implements IApiStore {
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    baseUrl: string;

    async request<SuccessT, ErrorT = any, DataT = {}>(params: RequestParams<DataT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let url = this.baseUrl + params.endpoint + qs.stringify(params.data, { addQueryPrefix: true });
        let requestInput = {
            method: params.method.valueOf()
        };
        try {
            let response = await fetch(url, requestInput);
            if (response.ok) {
                let result = await response.json();
                return {
                    success: true,
                    data: result as SuccessT,
                    status: HTTPStatus.OK
                };
            }
            else {
                return {
                    success: false,
                    data: {} as ErrorT,
                    status: response.status
                };
            }
        } catch {
            return {
                success: false,
                data: {} as ErrorT,
                status: HTTPStatus.UnknownError
            };
        }
    }
}