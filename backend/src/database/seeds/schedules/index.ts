import { Types } from 'mongoose';
import mockData from '../../../../mock-data/mock-data.json';
import { container, setup } from '../../../di-config';
import { ICreateSchedulePayload, SchedulesDao } from '../../../modules';
import Database from '../..';
import { Logger } from '../../../utils';

const runSeed = async (): Promise<void> => {
  setup();
  await (new Database()).connect();
  const schedulesDao: SchedulesDao = container.resolve(SchedulesDao.INSTANCE_NAME);
  await Promise.all((mockData as unknown as ICreateSchedulePayload[]).map((schedule) => schedulesDao.create({
    _id: new Types.ObjectId().toHexString(),
    ...schedule
  })));
};

runSeed()
  .then(() => Logger.success('Seeded: ' + mockData.length))
  .catch((err) => Logger.success(err))
  .finally(() => process.exit());
