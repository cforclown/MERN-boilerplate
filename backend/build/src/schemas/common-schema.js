"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ObjectIdSchema = joi_1.default.object({
    objectId: joi_1.default.string().required()
});
//# sourceMappingURL=common-schema.js.map