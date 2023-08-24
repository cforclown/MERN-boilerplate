import { IException } from '../types';
export declare abstract class BaseException extends Error {
    constructor(exception: IException, message?: string);
}
