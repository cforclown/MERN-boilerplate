"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('password-utils', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('hash-password', () => {
        it('should successfully return hashed password', async () => {
            const hashed = await (0, _1.hashPassword)('password');
            expect(hashed).toBeTruthy();
            expect(typeof hashed).toEqual('string');
            expect(hashed).toEqual(expect.stringMatching(/^\w{128}$/));
        });
    });
    describe('encrypt-decryp', () => {
        it('should successfully encrypt and decrypt data', () => {
            const data = { message: 'this message should be encrypted' };
            const encryptedData = (0, _1.encrypt)(JSON.stringify(data));
            const decryptedData = JSON.parse((0, _1.decrypt)(encryptedData));
            expect(encryptedData).toBeTruthy();
            expect(decryptedData).toBeTruthy();
            expect(decryptedData).toEqual(data);
        });
    });
});
//# sourceMappingURL=password-utils.test.js.map