import { ApiResponse, IApiStore, RequestParams, HTTPStatus } from "./types";

const qs = require("qs");

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
    }
}