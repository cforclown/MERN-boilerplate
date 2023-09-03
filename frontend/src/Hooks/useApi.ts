import { IAPIEndpoint } from '@/Utils/call-api';
import { useFetchMainAPI } from './useFetchMainAPI';

export interface IUseApiArgs {
  endpoint: IAPIEndpoint;
  body?: any;
}

export interface IUseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: any;
  refetch: () => void;
}

export function useAPI<T>({ endpoint, body }: IUseApiArgs): IUseApiResponse<T> {
  return useFetch<T>({
    fetchHandler: useFetchMainAPI,
    endpoint,
    body,
  });
}

export interface IUseFetchArgs {
  fetchHandler: any,
  endpoint: IAPIEndpoint;
  body?: any;
}

export function useFetch<T>({ fetchHandler, endpoint, body }: IUseFetchArgs): IUseApiResponse<T> {
  return fetchHandler({ endpoint, body });
}
