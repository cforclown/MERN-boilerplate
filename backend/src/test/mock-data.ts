import { ICreateSchedulePayload, ISchedule, IUpdateSchedulePayload } from '../resources';
import { IExplorationPayload } from '../utils/exploration/exploration';

export const mockSchedule: ISchedule = {
  _id: 'schedule-id',
  name: 'schedule name',
  start: new Date('01-01-2000'),
  end: new Date('01-02-2000'),
  desc: 'schedule description'
};

export const mockCreateSchedulePayload: ICreateSchedulePayload = {
  name: 'name',
  start: new Date('01-01-2000'),
  end: new Date('01-02-2000'),
  desc: 'schedule description'
};

export const mockUpdateSchedulePayload: IUpdateSchedulePayload = {
  _id: 'schedule-id',
  name: 'schedule name',
  start: new Date('01-01-2000'),
  end: new Date('01-02-2000'),
  desc: 'schedule description'
};

export const mockExplorationPayload: IExplorationPayload = {
  query: 'query',
  pagination: {
    page: 1,
    limit: 10,
    sort: {
      by: 'name'
    }
  }
};
