import { WithRequired } from '../../utils';
export interface ISchedule {
    _id: string;
    name: string;
    start: Date;
    end?: Date;
    desc?: string;
}
export declare type ICreateSchedulePayload = Omit<ISchedule, '_id'>;
export declare type IUpdateSchedulePayload = WithRequired<Partial<ISchedule>, '_id'>;
