import { ISchedule } from './schedules.types';
import { BaseDataAccessObject } from '../../utils/base/base-dao';
import { model } from 'mongoose';

export class SchedulesDao extends BaseDataAccessObject<ISchedule> {
  public static readonly INSTANCE_NAME = 'schedulesDao';
  public static readonly MODEL_NAME = 'schedules';

  constructor () {
    super(model<ISchedule>(SchedulesDao.MODEL_NAME));
  }
}
