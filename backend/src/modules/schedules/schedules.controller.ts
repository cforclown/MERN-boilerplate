import { ISchedule } from './schedules.types';
import { BaseController } from '../../utils/base/base-controller';
import { SchedulesService } from './schedules.service';

export class SchedulesController extends BaseController<ISchedule> {
  public static readonly INSTANCE_NAME = 'schedulesController';

  constructor (schedulesService: SchedulesService) {
    super(schedulesService);
  }
}
