import { ISchedule, SchedulesDao } from '.';
import { BaseService } from '../../utils/base/base-service';

export class SchedulesService extends BaseService<ISchedule> {
  public static readonly INSTANCE_NAME = 'schedulesService';

  constructor (schedulesDao: SchedulesDao) {
    super(schedulesDao);
  }
}
