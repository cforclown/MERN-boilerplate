"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dro_1 = require("./dro");
describe('data-response-object', () => {
    const data = { message: 'message' };
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('data-response-object should contain data', () => {
        const response = dro_1.dro.response(data);
        expect(response).toHaveProperty('data');
        expect(response.data).toEqual(data);
        expect(response).toHaveProperty('error');
        expect(response.error).toEqual(null);
    });
    it('data-response-object should contain error message', () => {
        const response = dro_1.dro.error('error message');
        expect(response).toHaveProperty('data');
        expect(response.data).toEqual(null);
        expect(response).toHaveProperty('error');
        expect(response.error).toEqual('error message');
    });
});
//# sourceMappingURL=dro.test.js.map