// Перечисление методов HTTP-запроса
export enum HTTPMethod {
    GET = "GET",
    POST = "POST"
}

// Параметры запроса
export type RequestParams<DataT> = {
    method: HTTPMethod; // Метод запроса, GET или POST
    endpoint: string; // API-endpoint, на который делается запрос
    headers: Record<string, string>; // Объект с передаваемыми HTTP-заголовками

    /**
     * Объект с данными запроса.
     * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
     * - Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса (необязательное требование)
     */
    data: DataT;
}

// Перечисление статусов ответа
export enum HTTPStatus {
    OK = 200,
    NotFound = 404,
    UnknownError = 0
}

// Ответ API
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

// Интерфейс для класса, с помощью которого можно делать запросы к API
export interface IApiStore {
    // базовый url для выполнения запросов. TODO: указать url GitHub API в классе ApiStore
    readonly baseUrl: string;

    // Метод, с помощью которого делается запрос. TODO: реализовать в классе ApiStore
    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>
}