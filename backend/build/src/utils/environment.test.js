"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./environment");
describe('environment', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should successfully return environment variable value', () => {
        expect(environment_1.Environment.getNodeEnv()).toBeTruthy();
    });
    it('should throw an error when environment variable not found', () => {
        process.env.NODE_ENV = undefined;
        expect(environment_1.Environment.getNodeEnv).toThrowError();
    });
});
//# sourceMappingURL=environment.test.js.map