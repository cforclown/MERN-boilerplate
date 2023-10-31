import { asClass, asFunction, asValue, createContainer, InjectionMode } from 'awilix';
import Database from './database';
import App from './app';
import {
  SCHEDULES_ROUTER_INSTANCE_NAME,
  SchedulesController,
  SchedulesDao,
  SchedulesRouter,
  SchedulesSchema,
  SchedulesService
} from './resources';

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

export function setup (): void {
  container.register({
    schedulesSchema: asValue(SchedulesSchema),
    database: asClass(Database),
    app: asFunction(App),
    [SCHEDULES_ROUTER_INSTANCE_NAME]: asFunction(SchedulesRouter),
    [SchedulesController.INSTANCE_NAME]: asClass(SchedulesController),
    [SchedulesService.INSTANCE_NAME]: asClass(SchedulesService),
    [SchedulesDao.INSTANCE_NAME]: asClass(SchedulesDao)
  });
}
