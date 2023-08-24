"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_handler_1 = require("./request-handler");
const exceptions_1 = require("./exceptions");
const jest_mock_req_res_1 = require("jest-mock-req-res");
describe('request-handler', () => {
    const data = {
        message: 'message'
    };
    const event = jest.fn().mockImplementation(async () => data);
    const req = (0, jest_mock_req_res_1.mockRequest)({});
    const res = (0, jest_mock_req_res_1.mockResponse)({});
    const next = () => ({});
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should send data successfully', async () => {
        const result = (0, request_handler_1.RequestHandler)(event);
        expect(typeof result).toBe('function');
        await result(req, res, next);
        expect(res.send).toHaveBeenCalled();
    });
    it('should should send error response with given http code', async () => {
        event.mockRejectedValueOnce(new exceptions_1.RestApiException('not found', exceptions_1.HttpCodes.NotFound));
        const result = (0, request_handler_1.RequestHandler)(event);
        expect(typeof result).toBe('function');
        await result(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status.mock.calls[0][0]).toEqual(exceptions_1.HttpCodes.NotFound);
        expect(res.send).toHaveBeenCalled();
        expect(res.send.mock.calls[0][0]).toEqual({
            data: null, error: 'not found'
        });
    });
    it('should should send error response with http code internal server error', async () => {
        event.mockRejectedValueOnce(new Error('undefined'));
        const result = (0, request_handler_1.RequestHandler)(event);
        expect(typeof result).toBe('function');
        await result(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status.mock.calls[0][0]).toEqual(exceptions_1.HttpCodes.Internal);
        expect(res.send).toHaveBeenCalled();
        expect(res.send.mock.calls[0][0]).toEqual({
            data: null, error: 'undefined'
        });
    });
});
//# sourceMappingURL=request-handler.test.js.map