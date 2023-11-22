import mongoose, { model, Types } from 'mongoose';
import { ISchedule, SchedulesDao, SchedulesSchema } from '.';
import { RestApiException } from '../../utils/exceptions';
import { mockCreateSchedulePayload } from '../../test/mock-data';
import MockDB from '../../test/mock-db';
import { docToJSON, expectDocumentToEqual } from '../../test/test-utils';

describe('schedules-dao', () => {
  const db = new MockDB();
  mongoose.model<ISchedule>(SchedulesDao.MODEL_NAME, SchedulesSchema);
  const schedulesDao = new SchedulesDao(model<ISchedule>(SchedulesDao.MODEL_NAME));

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
    const doc = await schedulesDao.create(mockCreateSchedulePayload);
    expectDocumentToEqual(doc, {
      ...mockCreateSchedulePayload,
      start: mockCreateSchedulePayload.start.toISOString(),
      end: mockCreateSchedulePayload.end?.toISOString()
    });

    const getResult = await schedulesDao.get(doc._id);
    expectDocumentToEqual(getResult, doc);

    const getAllResult = await schedulesDao.getAll();
    expect(getAllResult.length).toEqual(1);
    expectDocumentToEqual(getAllResult[0], doc);
  });

  it('create -> update -> get', async () => {
    const doc = await schedulesDao.create(mockCreateSchedulePayload);
    expectDocumentToEqual(doc, {
      ...mockCreateSchedulePayload,
      start: mockCreateSchedulePayload.start.toISOString(),
      end: mockCreateSchedulePayload.end?.toISOString()
    });

    const updateResult = await schedulesDao.update({ _id: doc._id, name: 'new name' });
    expectDocumentToEqual(updateResult, { ...docToJSON(doc), name: 'new name' }, true);

    const getResult = await schedulesDao.get(doc._id);
    expectDocumentToEqual(getResult, updateResult);
  });

  it('create -> update (fail) -> get (same as before)', async () => {
    const doc = await schedulesDao.create(mockCreateSchedulePayload);
    expectDocumentToEqual(doc, {
      ...mockCreateSchedulePayload,
      start: mockCreateSchedulePayload.start.toISOString(),
      end: mockCreateSchedulePayload.end?.toISOString()
    });

    await expect(schedulesDao.update({ _id: new Types.ObjectId().toHexString(), name: 'new name' })).rejects.toThrow(RestApiException);

    const getResult = await schedulesDao.get(doc._id);
    expectDocumentToEqual(getResult, doc);
  });

  it('create -> delete (success) -> get (null)', async () => {
    const doc = await schedulesDao.create(mockCreateSchedulePayload);
    expectDocumentToEqual(doc, {
      ...mockCreateSchedulePayload,
      start: mockCreateSchedulePayload.start.toISOString(),
      end: mockCreateSchedulePayload.end?.toISOString()
    });

    const deletedExplorationId = await schedulesDao.delete(doc._id);
    expect(deletedExplorationId).toEqual(doc._id);

    const getResult = await schedulesDao.get(doc._id);
    expect(getResult).toEqual(null);
  });
});
