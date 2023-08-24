"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_api_exception_1 = require("./rest-api-exception");
describe('request-error', () => {
    const errorMessage = 'error message';
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should contain default httpCode (400/bad request)', () => {
        const error = new rest_api_exception_1.RestApiException(errorMessage);
        expect(error).toHaveProperty('httpCode');
        expect(error.httpCode).toEqual(rest_api_exception_1.HttpCodes.BadRequest);
        expect(error.message).toEqual(errorMessage);
    });
    it('should contain defined httpCode', () => {
        const error = new rest_api_exception_1.RestApiException(errorMessage, rest_api_exception_1.HttpCodes.Internal);
        expect(error).toHaveProperty('httpCode');
        expect(error.httpCode).toEqual(rest_api_exception_1.HttpCodes.Internal);
        expect(error.message).toEqual(errorMessage);
    });
});
//# sourceMappingURL=rest-api-exception.test.js.map