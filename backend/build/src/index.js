"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const di_config_1 = require("./di-config");
const utils_1 = require("./utils");
(0, di_config_1.setup)();
(new server_1.default()).start().catch(err => utils_1.Logger.error(err.message));
//# sourceMappingURL=index.js.map