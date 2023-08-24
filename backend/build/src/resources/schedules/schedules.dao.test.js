"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const _1 = require(".");
const exceptions_1 = require("../../utils/exceptions");
const mock_data_1 = require("../../test/mock-data");
const mock_db_1 = __importDefault(require("../../test/mock-db"));
const test_utils_1 = require("../../test/test-utils");
describe('schedules-dao', () => {
    const db = new mock_db_1.default();
    mongoose_1.default.model(_1.SchedulesDao.MODEL_NAME, _1.ScheduleModelSchema);
    const schedulesDao = new _1.SchedulesDao();
    beforeAll(async () => {
        await db.connect();
    });
    afterEach(async () => {
        await db.clearDB();
    });
    afterAll(async () => {
        await db.close();
    });
    it('create -> get => getAll', async () => {
        const doc = await schedulesDao.create(mock_data_1.mockCreateSchedulePayload);
        (0, test_utils_1.expectDocumentToEqual)(doc, {
            ...mock_data_1.mockCreateSchedulePayload,
            start: mock_data_1.mockCreateSchedulePayload.start.toISOString(),
            end: mock_data_1.mockCreateSchedulePayload.end?.toISOString()
        });
        const getResult = await schedulesDao.get(doc._id);
        (0, test_utils_1.expectDocumentToEqual)(getResult, doc);
        const getAllResult = await schedulesDao.getAll();
        expect(getAllResult.length).toEqual(1);
        (0, test_utils_1.expectDocumentToEqual)(getAllResult[0], doc);
    });
    it('create -> update -> get', async () => {
        const doc = await schedulesDao.create(mock_data_1.mockCreateSchedulePayload);
        (0, test_utils_1.expectDocumentToEqual)(doc, {
            ...mock_data_1.mockCreateSchedulePayload,
            start: mock_data_1.mockCreateSchedulePayload.start.toISOString(),
            end: mock_data_1.mockCreateSchedulePayload.end?.toISOString()
        });
        const updateResult = await schedulesDao.update({ _id: doc._id, name: 'new name' });
        (0, test_utils_1.expectDocumentToEqual)(updateResult, { ...(0, test_utils_1.docToJSON)(doc), name: 'new name' }, true);
        const getResult = await schedulesDao.get(doc._id);
        (0, test_utils_1.expectDocumentToEqual)(getResult, updateResult);
    });
    it('create -> update (fail) -> get (same as before)', async () => {
        const doc = await schedulesDao.create(mock_data_1.mockCreateSchedulePayload);
        (0, test_utils_1.expectDocumentToEqual)(doc, {
            ...mock_data_1.mockCreateSchedulePayload,
            start: mock_data_1.mockCreateSchedulePayload.start.toISOString(),
            end: mock_data_1.mockCreateSchedulePayload.end?.toISOString()
        });
        await expect(schedulesDao.update({ _id: new mongoose_1.Types.ObjectId().toHexString(), name: 'new name' })).rejects.toThrow(exceptions_1.RestApiException);
        const getResult = await schedulesDao.get(doc._id);
        (0, test_utils_1.expectDocumentToEqual)(getResult, doc);
    });
    it('create -> delete (success) -> get (null)', async () => {
        const doc = await schedulesDao.create(mock_data_1.mockCreateSchedulePayload);
        (0, test_utils_1.expectDocumentToEqual)(doc, {
            ...mock_data_1.mockCreateSchedulePayload,
            start: mock_data_1.mockCreateSchedulePayload.start.toISOString(),
            end: mock_data_1.mockCreateSchedulePayload.end?.toISOString()
        });
        const deletedExplorationId = await schedulesDao.delete(doc._id);
        expect(deletedExplorationId).toEqual(doc._id);
        const getResult = await schedulesDao.get(doc._id);
        expect(getResult).toEqual(null);
    });
});
//# sourceMappingURL=schedules.dao.test.js.map