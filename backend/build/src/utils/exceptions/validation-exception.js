"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const _1 = require(".");
const constants_1 = require("../constants");
class ValidationException extends _1.BaseException {
    constructor(message) {
        super(constants_1.EXCEPTIONS.VALIDATION_EXCEPTION, message);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation-exception.js.map