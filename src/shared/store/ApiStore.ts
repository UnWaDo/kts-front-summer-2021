import {ApiResponse, IApiStore, RequestParams, HTTPStatus } from "./types";

class HTTPError extends Error {
    status: HTTPStatus;

    constructor(status: number) {
        super()
        if (status in HTTPStatus && status !== HTTPStatus.UnknownError) {
            this.status = status
        }
        else {
            this.status = HTTPStatus.UnknownError
        }
    }
}

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
        return fetch(url, requestInput).then(result => {
            if (result.ok)
                return result.json();
            else
                throw new HTTPError(result.status);
        }).then((result): ApiResponse<SuccessT, ErrorT> => {
            return {
                success: true,
                data: result as SuccessT,
                status: HTTPStatus.OK
            };
        }).catch((error: HTTPError): ApiResponse<SuccessT, ErrorT> => {
            return {
                success: false,
                data: {} as ErrorT,
                status: error.status
            };
        });
    }
}