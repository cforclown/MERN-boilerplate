"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplorationSwaggerSchemas = exports.ExplorationDto = void 0;
const joi_1 = __importDefault(require("joi"));
const pagination_1 = require("./pagination");
exports.ExplorationDto = joi_1.default.object({
    query: joi_1.default.string().allow(null).default(null),
    pagination: pagination_1.PaginationDto.required()
});
exports.ExplorationSwaggerSchemas = {
    explorationPayload: {
        query: { type: 'string' },
        pagination: { ...pagination_1.PaginationPayloadSwaggerSchemas }
    }
};
//# sourceMappingURL=exploration.js.map