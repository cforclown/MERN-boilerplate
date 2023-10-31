export interface Response<T> {
  data: T,
  error: string | object | [] | null | undefined;
}

export interface IException {
  code: string;
  name: string;
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
