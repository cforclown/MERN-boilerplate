"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCodes = exports.RestApiException = void 0;
const _1 = require(".");
const constants_1 = require("../constants");
class RestApiException extends _1.BaseException {
    constructor(message, httpCode = 400) {
        super(constants_1.EXCEPTIONS.REST_API_EXCEPTION, message);
        this.httpCode = httpCode;
    }
}
exports.RestApiException = RestApiException;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["Ok"] = 200] = "Ok";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["Internal"] = 500] = "Internal";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
//# sourceMappingURL=rest-api-exception.js.map