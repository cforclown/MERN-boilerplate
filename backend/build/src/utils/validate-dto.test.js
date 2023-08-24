"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const jest_mock_req_res_1 = require("jest-mock-req-res");
const validate_dto_1 = require("./validate-dto");
const exceptions_1 = require("./exceptions");
const common_schema_1 = require("../schemas/common-schema");
describe('validate-dto', () => {
    const res = (0, jest_mock_req_res_1.mockResponse)({});
    const mockNext = { next: () => true };
    const spyNext = jest.spyOn(mockNext, 'next');
    const mockSchema = joi_1.default.object({
        field1: joi_1.default.string().required(),
        field2: joi_1.default.number().required(),
        field3: joi_1.default.string()
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('validate-body', () => {
        it('should successfully validate body', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({
                body: {
                    field1: 'field1',
                    field2: 123,
                    field3: 'field3'
                }
            });
            const event = (0, validate_dto_1.validateBody)(mockSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).toHaveBeenCalled();
        });
        it('should send error response with bad request code', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({
                body: {
                    field1: 'field1',
                    field2: 'wrong-value',
                    field3: 'field3'
                }
            });
            const event = (0, validate_dto_1.validateBody)(mockSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalled();
            expect(res.status.mock.calls[0][0]).toEqual(exceptions_1.HttpCodes.BadRequest);
            expect(res.send).toHaveBeenCalled();
        });
    });
    describe('validate-params', () => {
        it('should successfully validate params', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({
                params: {
                    objectId: 'objectId'
                }
            });
            const event = (0, validate_dto_1.validateParams)(common_schema_1.ObjectIdSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).toHaveBeenCalled();
        });
        it('should send error response with bad request code when validating request params', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({ params: {} });
            const event = (0, validate_dto_1.validateParams)(common_schema_1.ObjectIdSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalled();
            expect(res.status.mock.calls[0][0]).toEqual(exceptions_1.HttpCodes.BadRequest);
            expect(res.send).toHaveBeenCalled();
        });
    });
    describe('validate-query', () => {
        it('should successfully validate query', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({
                query: {
                    objectId: 'objectId'
                }
            });
            const event = (0, validate_dto_1.validateQuery)(common_schema_1.ObjectIdSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).toHaveBeenCalled();
        });
        it('should send error response with bad request code when validating request queries', () => {
            const req = (0, jest_mock_req_res_1.mockRequest)({ query: {} });
            const event = (0, validate_dto_1.validateQuery)(common_schema_1.ObjectIdSchema);
            expect(typeof event).toBe('function');
            event(req, res, mockNext.next);
            expect(spyNext).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalled();
            expect(res.status.mock.calls[0][0]).toEqual(exceptions_1.HttpCodes.BadRequest);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=validate-dto.test.js.map