import { callMainAPI, getAPIEndpoint } from '@/Utils/call-api';
import { IExplorationPayload, IExplorationResponse } from '@/Utils/exploration/exploration';
import { ISchedule } from './Schedules.metadata';

export const getSchedulesWithPagination = (payload: IExplorationPayload): Promise<IExplorationResponse<ISchedule>> => callMainAPI(getAPIEndpoint('/schedules/explore', 'POST'), payload);

export const getSchedules = (): Promise<ISchedule[]> => callMainAPI(getAPIEndpoint('/schedules'));
