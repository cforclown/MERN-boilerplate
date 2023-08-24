import { validateSchema } from '../../utils/validate-schema';
import { ValidationException } from '../../utils/exceptions/validation-exception';
import { CreateSchedulePayloadSchema, UpdateSchedulePayloadSchema } from './schedules.dto';
import { mockCreateSchedulePayload, mockUpdateSchedulePayload } from '../../test/mock-data';

describe('schedules-data-transfer-object', () => {
  describe('CreateSchedulePayloadSchema', () => {
    it('should return value when schema is valid', () => {
      const result = validateSchema({ schema: CreateSchedulePayloadSchema, payload: mockCreateSchedulePayload });
      expect(result).toEqual(mockCreateSchedulePayload);
    });

    it('should throw validation exception when required field not provided', () => {
      expect(() => validateSchema({
        schema: CreateSchedulePayloadSchema,
        payload: {
          ...mockCreateSchedulePayload,
          name: undefined
        }
      })).toThrow(ValidationException);
    });
  });

  describe('UpdateSchedulePayloadSchema', () => {
    it('should return value when schema is valid', () => {
      expect(validateSchema({
        schema: UpdateSchedulePayloadSchema,
        payload: mockUpdateSchedulePayload
      })).toEqual(mockUpdateSchedulePayload);
      expect(validateSchema({
        schema: UpdateSchedulePayloadSchema,
        payload: {
          _id: 'schedule-id',
          name: 'new name'
        }
      })).toEqual({
        _id: 'schedule-id',
        name: 'new name'
      });
    });

    it('should allow payload only contain _id', () => {
      const result = validateSchema({ schema: UpdateSchedulePayloadSchema, payload: { _id: 'schedule-id' } });
      expect(result).toEqual({ _id: 'schedule-id' });
    });

    it('should throw validation exception when payload is not object', () => {
      expect(() => validateSchema({ schema: UpdateSchedulePayloadSchema, payload: null })).toThrow(ValidationException);
    });
  });
});
