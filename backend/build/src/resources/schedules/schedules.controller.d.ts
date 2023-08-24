import { Request } from 'express';
import { SchedulesService } from './schedules.service';
import { ISchedule } from './schedules.types';
import { IExplorationResponse } from '../../utils/exploration/exploration';
export declare class SchedulesController {
    static readonly INSTANCE_NAME = "schedulesController";
    private readonly schedulesService;
    constructor({ schedulesService }: {
        schedulesService: SchedulesService;
    });
    get({ params }: Request): Promise<ISchedule>;
    getAll(): Promise<ISchedule[]>;
    explore({ body }: Request): Promise<IExplorationResponse<ISchedule[]>>;
    create({ body }: Request): Promise<ISchedule>;
    update({ body }: Request): Promise<ISchedule>;
    delete({ params }: Request): Promise<string>;
}
