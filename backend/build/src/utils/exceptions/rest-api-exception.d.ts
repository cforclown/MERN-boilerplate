import { BaseException } from '.';
export declare class RestApiException extends BaseException {
    httpCode: number;
    constructor(message: string, httpCode?: number);
}
export declare enum HttpCodes {
    Ok = 200,
    BadRequest = 400,
    NotFound = 404,
    Unauthorized = 401,
    Forbidden = 403,
    Internal = 500,
    BadGateway = 502,
    ServiceUnavailable = 503
}
