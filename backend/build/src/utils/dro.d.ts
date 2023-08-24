import { Response } from './types';
/**
 * DATA RESPONSE OBJECT
 */
export declare class dro {
    static response<T>(data: T): Response<T>;
    static error(error: any): Response<any>;
}
