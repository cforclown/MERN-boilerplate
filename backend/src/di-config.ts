import { asClass, asFunction, createContainer, InjectionMode } from 'awilix';
import {
  SCHEDULES_ROUTER_INSTANCE_NAME,
  SchedulesController,
  SchedulesDao,
  SchedulesRouter,
  SchedulesService
} from './resources';

export const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

export function setup (): void {
  container.register({
    [SCHEDULES_ROUTER_INSTANCE_NAME]: asFunction(SchedulesRouter),
    [SchedulesController.INSTANCE_NAME]: asClass(SchedulesController),
    [SchedulesService.INSTANCE_NAME]: asClass(SchedulesService),
    schedulesDao: asClass(SchedulesDao)
  });
}
