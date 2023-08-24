import Joi from 'joi';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { validateBody, validateParams, validateQuery } from './validate-dto';
import { HttpCodes } from './exceptions';
import { ObjectIdSchema } from '../schemas/common-schema';

describe('validate-dto', () => {
  const res = mockResponse({});
  const mockNext = { next: (): boolean => true };
  const spyNext = jest.spyOn(mockNext, 'next');

  const mockSchema = Joi.object({
    field1: Joi.string().required(),
    field2: Joi.number().required(),
    field3: Joi.string()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate-body', () => {
    it('should successfully validate body', () => {
      const req = mockRequest({
        body: {
          field1: 'field1',
          field2: 123,
          field3: 'field3'
        }
      });

      const event = validateBody(mockSchema);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).toHaveBeenCalled();
    });

    it('should send error response with bad request code', () => {
      const req = mockRequest({
        body: {
          field1: 'field1',
          field2: 'wrong-value',
          field3: 'field3'
        }
      });

      const event = validateBody(mockSchema);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status.mock.calls[0][0]).toEqual(HttpCodes.BadRequest);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('validate-params', () => {
    it('should successfully validate params', () => {
      const req = mockRequest({
        params: {
          objectId: 'objectId'
        }
      });

      const event = validateParams(ObjectIdSchema);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).toHaveBeenCalled();
    });

    it('should send error response with bad request code when validating request params', () => {
      const req = mockRequest({ params: {} });

      const event = validateParams(ObjectIdSchema);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status.mock.calls[0][0]).toEqual(HttpCodes.BadRequest);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('validate-query', () => {
    it('should successfully validate query', () => {
      const req = mockRequest({
        query: {
          objectId: 'objectId'
        }
      });

      const event = validateQuery(ObjectIdSchema);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).toHaveBeenCalled();
    });

    it('should send error response with bad request code when validating request queries', () => {
      const req = mockRequest({ query: {} });

      const event = validateQuery(ObjectIdSchema);
      expect(typeof event).toBe('function');
      event(req, res, mockNext.next);
      expect(spyNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.status.mock.calls[0][0]).toEqual(HttpCodes.BadRequest);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
