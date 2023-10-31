import { ELogLevel, Logger } from '../logger';
import { IException } from '../types';

export abstract class BaseException extends Error {
  constructor (exception: IException, message?: string) {
    super(message);
    this.name = `[${exception.code}] ${exception.name}`;

    Logger.error(`${this.name}: ${this.message}`, ELogLevel.ERROR);
  }
}
