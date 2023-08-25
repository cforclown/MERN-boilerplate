import { callMainAPI, getAPIEndpoint } from '@/Utils/call-api';
import { IExplorationPayload, IExplorationResponse } from '@/Utils/exploration/exploration';
import { ISchedule } from '.';

export const getSchedulesWithPagination = (payload: IExplorationPayload): Promise<IExplorationResponse<ISchedule>> => {
  return callMainAPI(getAPIEndpoint('/schedules/explore', 'POST'), payload);
};
