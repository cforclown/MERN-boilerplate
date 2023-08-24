"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const exceptions_1 = require("./exceptions");
const validateSchema = ({ schema, payload, validationOptions: validateOptions, replaceSource }) => {
    const { error, value } = schema.validate(payload, validateOptions);
    if (error) {
        throw new exceptions_1.ValidationException(error.message);
    }
    if (replaceSource) {
        payload = value;
    }
    return payload;
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validate-schema.js.map