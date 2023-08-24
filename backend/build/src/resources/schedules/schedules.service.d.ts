import { ICreateSchedulePayload, ISchedule, IUpdateSchedulePayload, SchedulesDao } from '.';
import { IExplorationPayload, IExplorationResponse } from '../../utils/exploration/exploration';
export declare class SchedulesService {
    static readonly INSTANCE_NAME = "schedulesService";
    private readonly schedulesDao;
    constructor({ schedulesDao }: {
        schedulesDao: SchedulesDao;
    });
    get(scheduleId: string): Promise<ISchedule | null>;
    getAll(): Promise<ISchedule[]>;
    explore(payload: IExplorationPayload): Promise<IExplorationResponse<ISchedule[]>>;
    create(payload: ICreateSchedulePayload): Promise<ISchedule>;
    update(payload: IUpdateSchedulePayload): Promise<ISchedule>;
    delete(scheduleId: string): Promise<string>;
}
