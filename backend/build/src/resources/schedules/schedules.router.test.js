"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const di_config_1 = require("../../di-config");
const app_1 = __importDefault(require("../../app"));
const mock_data_1 = require("../../test/mock-data");
const exceptions_1 = require("../../utils/exceptions");
const mockModel = jest.fn();
jest.mock('mongoose', () => ({
    ...jest.requireActual('mongoose'),
    model: jest.fn().mockImplementation((collection) => mockModel(collection))
}));
const mockSchedulesDaoGet = jest.fn();
const mockSchedulesDaoGetAll = jest.fn();
const mockSchedulesDaoExplore = jest.fn();
const mockSchedulesDaoCreate = jest.fn();
const mockSchedulesDaoUpdate = jest.fn();
const mockSchedulesDaoDelete = jest.fn();
jest.mock('./schedules.dao', () => ({
    SchedulesDao: jest.fn().mockImplementation(() => ({
        get: (payload) => mockSchedulesDaoGet(payload),
        getAll: (payload) => mockSchedulesDaoGetAll(payload),
        explore: (payload) => mockSchedulesDaoExplore(payload),
        create: (payload) => mockSchedulesDaoCreate(payload),
        update: (payload) => mockSchedulesDaoUpdate(payload),
        delete: (payload) => mockSchedulesDaoDelete(payload)
    }))
}));
describe('schedules-router', () => {
    mockSchedulesDaoGet.mockResolvedValue(mock_data_1.mockSchedule);
    mockSchedulesDaoGetAll.mockResolvedValue([mock_data_1.mockSchedule]);
    mockSchedulesDaoExplore.mockImplementation((payload) => ({
        data: [mock_data_1.mockSchedule],
        exploration: payload
    }));
    mockSchedulesDaoCreate.mockResolvedValue(mock_data_1.mockSchedule);
    mockSchedulesDaoUpdate.mockResolvedValue(mock_data_1.mockSchedule);
    mockSchedulesDaoDelete.mockImplementation((payload) => Promise.resolve(payload));
    let app;
    beforeAll(() => {
        (0, di_config_1.setup)();
        app = (0, app_1.default)();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('get', () => {
        it('should successfully return schedule', async () => {
            const response = await (0, supertest_1.default)(app)
                .get(`/api/schedules/${mock_data_1.mockSchedule._id}`)
                .expect(exceptions_1.HttpCodes.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual({
                ...mock_data_1.mockSchedule,
                start: mock_data_1.mockSchedule.start.toISOString(),
                end: mock_data_1.mockSchedule.end?.toISOString()
            });
        });
        it('should return 404 when schedule not found', async () => {
            mockSchedulesDaoGet.mockReturnValueOnce(Promise.resolve(null));
            await (0, supertest_1.default)(app)
                .get(`/api/schedules/${mock_data_1.mockSchedule._id}`)
                .expect(exceptions_1.HttpCodes.NotFound);
        });
    });
    describe('getAll', () => {
        it('should successfully get all schedules', async () => {
            const response = await (0, supertest_1.default)(app)
                .get('/api/schedules')
                .expect(exceptions_1.HttpCodes.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual([{
                    ...mock_data_1.mockSchedule,
                    start: mock_data_1.mockSchedule.start.toISOString(),
                    end: mock_data_1.mockSchedule.end?.toISOString()
                }]);
        });
        it('should return empty', async () => {
            mockSchedulesDaoGetAll.mockReturnValueOnce(Promise.resolve([]));
            const response = await (0, supertest_1.default)(app)
                .get('/api/schedules')
                .expect(exceptions_1.HttpCodes.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual([]);
        });
        it('should return internal server error', async () => {
            mockSchedulesDaoGetAll.mockRejectedValueOnce(new Error('error'));
            await (0, supertest_1.default)(app)
                .get('/api/schedules')
                .expect(exceptions_1.HttpCodes.Internal);
        });
    });
    describe('explore', () => {
        it('should successfully get schedules with correct exploration payload', async () => {
            const response = await (0, supertest_1.default)(app)
                .post('/api/schedules/explore')
                .send(mock_data_1.mockExplorationPayload)
                .expect(exceptions_1.HttpCodes.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual({
                data: [{
                        ...mock_data_1.mockSchedule,
                        start: mock_data_1.mockSchedule.start.toISOString(),
                        end: mock_data_1.mockSchedule.end?.toISOString()
                    }],
                exploration: {
                    ...mock_data_1.mockExplorationPayload,
                    pagination: {
                        ...mock_data_1.mockExplorationPayload.pagination,
                        sort: {
                            ...mock_data_1.mockExplorationPayload.pagination.sort,
                            order: mock_data_1.mockExplorationPayload.pagination.sort.order ?? 1
                        }
                    }
                }
            });
        });
        it('should return internal server error', async () => {
            mockSchedulesDaoGetAll.mockRejectedValueOnce(new Error('error'));
            await (0, supertest_1.default)(app)
                .get('/api/schedules')
                .expect(exceptions_1.HttpCodes.Internal);
        });
    });
    describe('update', () => {
        it('should successfully update schedule', async () => {
            const response = await (0, supertest_1.default)(app)
                .patch('/api/schedules')
                .send(mock_data_1.mockUpdateSchedulePayload)
                .expect(exceptions_1.HttpCodes.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual({
                ...mock_data_1.mockSchedule,
                start: mock_data_1.mockSchedule.start.toISOString(),
                end: mock_data_1.mockSchedule.end?.toISOString()
            });
        });
        it('should successfully update schedule when only some of the field is provided', async () => {
            const response = await (0, supertest_1.default)(app)
                .patch('/api/schedules')
                .send({
                _id: 'schedule-id',
                name: 'new-name'
            })
                .expect(exceptions_1.HttpCodes.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual({
                ...mock_data_1.mockSchedule,
                start: mock_data_1.mockSchedule.start.toISOString(),
                end: mock_data_1.mockSchedule.end?.toISOString()
            });
        });
        it('should fail update schedule when schedule not found', async () => {
            mockSchedulesDaoUpdate.mockResolvedValueOnce(null);
            await (0, supertest_1.default)(app)
                .patch('/api/schedules')
                .send(mock_data_1.mockUpdateSchedulePayload)
                .expect(exceptions_1.HttpCodes.NotFound);
        });
    });
    describe('delete', () => {
        it('should successfully delete a schedule', async () => {
            const response = await (0, supertest_1.default)(app)
                .delete('/api/schedules/' + mock_data_1.mockSchedule._id)
                .expect(exceptions_1.HttpCodes.Ok);
            expect(response).toHaveProperty('text');
            const body = JSON.parse(response.text);
            expect(body).toHaveProperty('data');
            expect(body.data).toEqual(mock_data_1.mockSchedule._id);
        });
        it('should throw an error when data access object throw an error', async () => {
            mockSchedulesDaoDelete.mockRejectedValueOnce(new exceptions_1.RestApiException('internal server error', 500));
            await (0, supertest_1.default)(app)
                .delete('/api/schedules/' + mock_data_1.mockSchedule._id)
                .expect(exceptions_1.HttpCodes.Internal);
        });
    });
});
//# sourceMappingURL=schedules.router.test.js.map