import { callMainAPI, getAPIEndpoint } from '@/Utils/call-api';
import { IExplorationPayload, IExplorationResponse } from '@/Utils/exploration/exploration';
import { ISchedule } from './Schedules.metadata';

export const getSchedulesWithPagination = (payload: IExplorationPayload): Promise<IExplorationResponse<ISchedule>> => callMainAPI(getAPIEndpoint('/schedules/explore', 'POST'), payload);

export const getSchedules = (): Promise<ISchedule[]> => callMainAPI(getAPIEndpoint('/schedules'));

export const createSchedule = (payload: Omit<ISchedule, 'id'>): Promise<ISchedule> => callMainAPI(getAPIEndpoint('/schedules', 'POST'), payload);

export const updateSchedule = (payload: ISchedule): Promise<ISchedule> => callMainAPI(getAPIEndpoint('/schedules', 'PUT'), payload);

export const deleteSchedule = (id: string): Promise<ISchedule> => callMainAPI(getAPIEndpoint(`/schedules/${id}`, 'DELETE'));
