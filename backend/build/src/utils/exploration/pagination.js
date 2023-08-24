"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPayloadSwaggerSchemas = exports.PaginationDto = exports.IPaginationSortOrders = void 0;
const joi_1 = __importDefault(require("joi"));
var IPaginationSortOrders;
(function (IPaginationSortOrders) {
    IPaginationSortOrders[IPaginationSortOrders["ASC"] = -1] = "ASC";
    IPaginationSortOrders[IPaginationSortOrders["DESC"] = 1] = "DESC";
})(IPaginationSortOrders = exports.IPaginationSortOrders || (exports.IPaginationSortOrders = {}));
exports.PaginationDto = joi_1.default.object({
    page: joi_1.default.number().required(),
    limit: joi_1.default.number().required(),
    sort: joi_1.default.object({
        by: joi_1.default.string().required(),
        order: joi_1.default.number().valid(-1, 1).default(1)
    })
});
exports.PaginationPayloadSwaggerSchemas = {
    paginationPayload: {
        page: { type: 'number', required: true },
        limit: { type: 'number', required: true },
        sort: {
            type: 'object',
            properties: {
                by: { type: 'string', required: true },
                order: {
                    type: 'number',
                    enum: [-1, 1],
                    required: true
                }
            }
        }
    }
};
//# sourceMappingURL=pagination.js.map