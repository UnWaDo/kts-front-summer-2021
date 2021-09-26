export enum HTTPMethod {
    GET = "GET",
    POST = "POST"
}

export enum HTTPStatus {
    OK = 200,
    NotFound = 404,
    UnknownError = 0
}

export type RequestParams<DataT> = {
    method: HTTPMethod;
    endpoint: string;
    headers: Record<string, string>;

    data: DataT;
}

export type ApiResponse<SuccessT, ErrorT> =
    | {
        success: true;
        data: SuccessT;
        status: HTTPStatus;
    }
    | {
        success: false;
        data: ErrorT;
        status: HTTPStatus;
    };