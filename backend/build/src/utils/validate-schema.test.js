"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validate_schema_1 = require("./validate-schema");
const exceptions_1 = require("./exceptions");
describe('validateSchema', () => {
    const schema1 = joi_1.default.object({
        code: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        message: joi_1.default.string().optional()
    });
    const schema2 = joi_1.default.object({
        code: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        message: joi_1.default.string().default('message')
    });
    it('should return value when schema is valid', () => {
        const payload = {
            code: '000',
            name: 'example'
        };
        const result = (0, validate_schema_1.validateSchema)({ schema: schema1, payload });
        expect(result).toEqual(payload);
    });
    it('should return value when schema is valid with replaceSource option is true', () => {
        const payload = {
            code: '000',
            name: 'example'
        };
        const result = (0, validate_schema_1.validateSchema)({ schema: schema2, payload, replaceSource: true });
        expect(result).toEqual({
            ...payload,
            message: 'message'
        });
    });
    it('should throw ValidationException when schema is invalid', () => {
        expect(() => (0, validate_schema_1.validateSchema)({ schema: schema1, payload: {} })).toThrow(exceptions_1.ValidationException);
    });
});
//# sourceMappingURL=validate-schema.test.js.map