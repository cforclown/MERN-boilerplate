"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isString = void 0;
const isString = (variable) => typeof variable === 'string';
exports.isString = isString;
const isArray = (variable) => Array.isArray(variable);
exports.isArray = isArray;
//# sourceMappingURL=type-checker.js.map