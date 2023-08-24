"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const mock_data_1 = require("../../test/mock-data");
const schedules_service_1 = require("./schedules.service");
const mockSchedulesDaoGet = jest.fn();
const mockSchedulesDaoGetAll = jest.fn();
const mockSchedulesDaoGetCreate = jest.fn();
const mockSchedulesDaoGetUpdate = jest.fn();
const mockSchedulesDaoGetDelete = jest.fn();
jest.mock('./schedules.dao', () => ({
    SchedulesDao: jest.fn().mockImplementation(() => ({
        get: (payload) => mockSchedulesDaoGet(payload),
        getAll: (payload) => mockSchedulesDaoGetAll(payload),
        create: (payload) => mockSchedulesDaoGetCreate(payload),
        update: (payload) => mockSchedulesDaoGetUpdate(payload),
        delete: (payload) => mockSchedulesDaoGetDelete(payload)
    }))
}));
jest.mock('mongoose', () => ({
    ...jest.requireActual('mongoose'),
    model: jest.fn().mockImplementation(() => ({}))
}));
describe('schedules-service', () => {
    mockSchedulesDaoGet.mockReturnValue(Promise.resolve(mock_data_1.mockSchedule));
    mockSchedulesDaoGetAll.mockReturnValue(Promise.resolve([mock_data_1.mockSchedule]));
    mockSchedulesDaoGetCreate.mockReturnValue(Promise.resolve(mock_data_1.mockSchedule));
    mockSchedulesDaoGetUpdate.mockReturnValue(Promise.resolve(mock_data_1.mockSchedule));
    mockSchedulesDaoGetDelete.mockImplementation((payload) => Promise.resolve(payload));
    const schedulesService = new schedules_service_1.SchedulesService({
        schedulesDao: new _1.SchedulesDao()
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('get getAll', () => {
        it('should successfully return schedule', async () => {
            expect(await schedulesService.get(mock_data_1.mockSchedule._id)).toEqual(mock_data_1.mockSchedule);
            expect(await schedulesService.getAll()).toEqual([mock_data_1.mockSchedule]);
        });
        it('should return null when schedule not found', async () => {
            mockSchedulesDaoGet.mockReturnValueOnce(null);
            expect(await schedulesService.get(mock_data_1.mockSchedule._id)).toEqual(null);
        });
    });
    describe('create', () => {
        it('should successfully create a schedule', async () => {
            expect(await schedulesService.create(mock_data_1.mockCreateSchedulePayload)).toEqual(mock_data_1.mockSchedule);
        });
    });
    describe('update', () => {
        it('should successfully update a schedule', async () => {
            expect(await schedulesService.update(mock_data_1.mockUpdateSchedulePayload)).toEqual(mock_data_1.mockSchedule);
        });
    });
    describe('delete', () => {
        it('should successfully delete a schedule', async () => {
            expect(await schedulesService.delete('schedule-id')).toEqual('schedule-id');
        });
    });
});
//# sourceMappingURL=schedules.service.test.js.map