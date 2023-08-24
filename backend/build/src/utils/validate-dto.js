"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateParams = exports.validateBody = exports.validateDto = void 0;
const dro_1 = require("./dro");
const exceptions_1 = require("./exceptions");
function validateDto({ source, schema, validateOptions, replaceSource }) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[source], validateOptions);
        if (error) {
            res.status(exceptions_1.HttpCodes.BadRequest).send(dro_1.dro.error(error.message));
            return;
        }
        if (replaceSource) {
            req[source] = value;
        }
        return next();
    };
}
exports.validateDto = validateDto;
const validateBody = (schema, validateOptions) => validateDto({
    source: 'body',
    schema,
    validateOptions,
    replaceSource: true
});
exports.validateBody = validateBody;
const validateParams = (schema) => validateDto({
    source: 'params',
    schema
});
exports.validateParams = validateParams;
const validateQuery = (schema) => validateDto({
    source: 'query',
    schema
});
exports.validateQuery = validateQuery;
//# sourceMappingURL=validate-dto.js.map