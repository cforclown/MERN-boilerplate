"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const validation_exception_1 = require("./validation-exception");
const mockLoggerError = jest.fn();
jest.mock('../logger', () => ({
    Logger: {
        error: (message) => mockLoggerError(message)
    }
}));
describe('validation-exception', () => {
    it('should throw ValidationException with the correct code and message', () => {
        const message = 'exception message';
        const { VALIDATION_EXCEPTION: { code, name } } = constants_1.EXCEPTIONS;
        const exception = new validation_exception_1.ValidationException(message);
        expect(exception.message).toEqual(message);
        expect(exception.name).toEqual(`[${code}] ${name}`);
    });
});
//# sourceMappingURL=validation-exception.test.js.map