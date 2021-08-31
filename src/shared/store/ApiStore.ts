import { queries } from "@testing-library/dom";
import {ApiResponse, IApiStore, RequestParams, HTTPStatus } from "./types";

const qs = require("qs");

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

    async request<SuccessT, ErrorT = any, DataT = {}>(params: RequestParams<DataT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let url = this.baseUrl + params.endpoint + qs.stringify(params.data, { addQueryPrefix: true});
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