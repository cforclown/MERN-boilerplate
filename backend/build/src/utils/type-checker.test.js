"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('type-checker', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return true when checking string variable', () => {
        expect((0, _1.isString)('string')).toEqual(true);
    });
    it('should return false when checking non-string variable', () => {
        expect((0, _1.isString)(2)).toEqual(false);
    });
    it('should return false when checking non-array variable', () => {
        expect((0, _1.isString)(() => 1)).toEqual(false);
    });
    it('should return false when checking non-array variable', () => {
        expect((0, _1.isString)(async () => Promise.resolve(1))).toEqual(false);
    });
    it('should return true when checking array variable', () => {
        expect((0, _1.isArray)(['string'])).toEqual(true);
    });
    it('should return false when checking non-array variable', () => {
        expect((0, _1.isArray)(2)).toEqual(false);
    });
    it('should return false when checking non-array variable', () => {
        expect((0, _1.isArray)(() => 1)).toEqual(false);
    });
    it('should return false when checking non-array variable', () => {
        expect((0, _1.isArray)(async () => Promise.resolve(1))).toEqual(false);
    });
});
//# sourceMappingURL=type-checker.test.js.map