import axios, { AxiosRequestConfig } from 'axios';
import { API_ENDPOINT } from './environment';

export enum HTTPStatusCodes {
  Ok = 200,
  BadRequest = 400,
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  Internal = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export class RestAPIException extends Error {
  status: number;

  headers?: any;

  constructor(message: string, status = HTTPStatusCodes.BadRequest, headers = undefined) {
    super(message);
    this.status = status;
    this.headers = headers;
  }
}

export type IAPIEndpointMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'

export interface IAPIEndpoint {
  url: string;
  method?: IAPIEndpointMethod;
  headers?: Record<string, any>;
}

export const getAPIEndpoint = (path: string, method?: IAPIEndpointMethod, header?: Record<string, any>): IAPIEndpoint => ({
  url: API_ENDPOINT + path,
  method,
  headers: header,
});

export interface IAxiosFetchArgs {
  url: string;
  body?: any;
  config?: AxiosRequestConfig;
}

export const AxiosFetch = {
  GET: (args: IAxiosFetchArgs): Promise<any> => axios.get(args.url, args.config),
  POST: (args: IAxiosFetchArgs): Promise<any> => axios.post(args.url, args.body, args.config),
  PUT: (args: IAxiosFetchArgs): Promise<any> => axios.put(args.url, args.body, args.config),
  PATCH: (args: IAxiosFetchArgs): Promise<any> => axios.patch(args.url, args.body, args.config),
  DELETE: (args: IAxiosFetchArgs): Promise<any> => axios.delete(args.url, args.config),
  OPTIONS: (args: IAxiosFetchArgs): Promise<any> => axios.options(args.url, args.config)
};

export const axiosFetch = (endpoint: IAPIEndpoint, body: any): Promise<any> => {
  const config = endpoint.headers ? { headers: endpoint.headers } : undefined;
  return AxiosFetch[endpoint.method ?? 'GET']({
    url: endpoint.url,
    body,
    config
  });
};

export interface ICallApiResponse<T> {
  data?: T;
  error?: Error | RestAPIException | undefined;
}

// there will be multiple api fetch handler
export const axiosFetchHandler = async (endpoint: IAPIEndpoint, body?: any): Promise<any> => {
  try {
    const response = await axiosFetch(endpoint, body);
    return response.data;
  } catch (err: any) {
    // Request made and server responded
    if (err.response) {
      const { error } = err.response.data;
      throw new RestAPIException(error, err.response.status, err.response.headers);
    }
    // The request was made but no response was received
    else if (err.request) {
      throw new RestAPIException('Server is not responding', HTTPStatusCodes.BadGateway);
    }
    // Something happened in setting up the request that triggered an Error
    throw err;
  }
};

export const callApi = async <T>(endpoint: IAPIEndpoint, body?: any, fetchHandler?: (endpoint: IAPIEndpoint, body?: any) => Promise<any>): Promise<T> => {
  const data = fetchHandler ? await fetchHandler(endpoint, body) : await axiosFetchHandler(endpoint, body);
  return data as T;
};

export interface IMainAPIResponseWrapper<T> {
  data?: T;
  error?: string;
}

export const callMainAPI = async <T>(endpoint: IAPIEndpoint, body?: any): Promise<T> => {
  const { data: responseBody, error } = await callApi<IMainAPIResponseWrapper<T>>(endpoint, body);
  if (error) {
    throw new Error(error);
  }

  return responseBody as T;
};
