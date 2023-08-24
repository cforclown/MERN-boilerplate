import { ICreateSchedulePayload, ISchedule, IUpdateSchedulePayload } from './schedules.types';
import { IExplorationPayload, IExplorationResponse } from '../../utils/exploration/exploration';
export declare class SchedulesDao {
    static readonly INSTANCE_NAME = "schedulesDao";
    static readonly MODEL_NAME = "schedules";
    private readonly model;
    constructor();
    get(scheduleId: string): Promise<ISchedule | null>;
    getAll(): Promise<ISchedule[]>;
    explore({ query, pagination }: IExplorationPayload): Promise<IExplorationResponse<ISchedule[]>>;
    create(payload: ICreateSchedulePayload & {
        _id?: string;
    }): Promise<ISchedule>;
    update(payload: IUpdateSchedulePayload): Promise<ISchedule>;
    delete(scheduleId: string): Promise<string>;
}
