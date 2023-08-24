"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
const environment_1 = require("../environment");
const logger_1 = require("../logger");
class BaseException extends Error {
    constructor(exception, message) {
        super(message);
        this.name = `[${exception.code}] ${exception.name}`;
        if (environment_1.Environment.getNodeEnv() === 'test') {
            return;
        }
        logger_1.Logger[exception.level](`${this.name}: ${this.message}`);
    }
}
exports.BaseException = BaseException;
//# sourceMappingURL=base-exception.js.map