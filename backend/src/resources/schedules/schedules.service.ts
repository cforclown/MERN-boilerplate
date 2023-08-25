import { ICreateSchedulePayload, ISchedule, IUpdateSchedulePayload, SchedulesDao } from '.';
import { IExplorationPayload, IExplorationResponse } from '../../utils/exploration/exploration';

export class SchedulesService {
  public static readonly INSTANCE_NAME = 'schedulesService';

  private readonly schedulesDao: SchedulesDao;

  constructor ({ schedulesDao }: { schedulesDao: SchedulesDao;}) {
    this.schedulesDao = schedulesDao;
  }

  get (scheduleId: string): Promise<ISchedule | null> {
    return this.schedulesDao.get(scheduleId);
  }

  getAll (): Promise<ISchedule[]> {
    return this.schedulesDao.getAll();
  }

  async explore (payload: IExplorationPayload): Promise<IExplorationResponse<ISchedule>> {
    return this.schedulesDao.explore(payload);
  }

  async create (payload: ICreateSchedulePayload): Promise<ISchedule> {
    return this.schedulesDao.create(payload);
  }

  async update (payload: IUpdateSchedulePayload): Promise<ISchedule> {
    return this.schedulesDao.update(payload);
  }

  delete (scheduleId: string): Promise<string> {
    return this.schedulesDao.delete(scheduleId);
  }
}
