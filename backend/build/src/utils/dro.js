"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dro = void 0;
/**
 * DATA RESPONSE OBJECT
 */
class dro {
    static response(data) {
        return ({ data, error: null });
    }
    static error(error) {
        return { data: null, error };
    }
}
exports.dro = dro;
//# sourceMappingURL=dro.js.map