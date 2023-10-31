import { IException } from './types';

export const EXCEPTIONS: { [key: string]: IException; } = {
  VALIDATION_EXCEPTION: {
    code: 'EVE001',
    name: 'Validation Exception'
  },
  REST_API_EXCEPTION: {
    code: 'ERAE',
    name: 'Rest API Exception'
  }
};
