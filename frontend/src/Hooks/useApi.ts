import { IAPIEndpoint } from '../Utils/api-service';
import { useFetchAxios } from './useFetchAxios';

interface IUseApiArgs {
  endpoint: IAPIEndpoint;
  body?: any;
}

export interface IUseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: any;
  refetch: () => void;
}

export function useApi<T>({ endpoint, body }: IUseApiArgs): IUseApiResponse<T> {
  return useFetch<T>({
    fetchHandler: useFetchAxios,
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
