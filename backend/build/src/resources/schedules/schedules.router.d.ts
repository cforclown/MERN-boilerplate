import { Router } from 'express';
import { SchedulesController } from './schedules.controller';
export declare const SCHEDULES_ROUTER_INSTANCE_NAME = "schedulesRouter";
export declare const SCHEDULES_BASE_API_PATH = "schedules";
export declare function SchedulesRouter({ schedulesController }: {
    schedulesController: SchedulesController;
}): Router;
