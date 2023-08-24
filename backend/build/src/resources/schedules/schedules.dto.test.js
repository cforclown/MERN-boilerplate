"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_schema_1 = require("../../utils/validate-schema");
const validation_exception_1 = require("../../utils/exceptions/validation-exception");
const schedules_dto_1 = require("./schedules.dto");
const mock_data_1 = require("../../test/mock-data");
describe('schedules-data-transfer-object', () => {
    describe('CreateSchedulePayloadSchema', () => {
        it('should return value when schema is valid', () => {
            const result = (0, validate_schema_1.validateSchema)({ schema: schedules_dto_1.CreateSchedulePayloadSchema, payload: mock_data_1.mockCreateSchedulePayload });
            expect(result).toEqual(mock_data_1.mockCreateSchedulePayload);
        });
        it('should throw validation exception when required field not provided', () => {
            expect(() => (0, validate_schema_1.validateSchema)({
                schema: schedules_dto_1.CreateSchedulePayloadSchema,
                payload: {
                    ...mock_data_1.mockCreateSchedulePayload,
                    name: undefined
                }
            })).toThrow(validation_exception_1.ValidationException);
        });
    });
    describe('UpdateSchedulePayloadSchema', () => {
        it('should return value when schema is valid', () => {
            expect((0, validate_schema_1.validateSchema)({
                schema: schedules_dto_1.UpdateSchedulePayloadSchema,
                payload: mock_data_1.mockUpdateSchedulePayload
            })).toEqual(mock_data_1.mockUpdateSchedulePayload);
            expect((0, validate_schema_1.validateSchema)({
                schema: schedules_dto_1.UpdateSchedulePayloadSchema,
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
            const result = (0, validate_schema_1.validateSchema)({ schema: schedules_dto_1.UpdateSchedulePayloadSchema, payload: { _id: 'schedule-id' } });
            expect(result).toEqual({ _id: 'schedule-id' });
        });
        it('should throw validation exception when payload is not object', () => {
            expect(() => (0, validate_schema_1.validateSchema)({ schema: schedules_dto_1.UpdateSchedulePayloadSchema, payload: null })).toThrow(validation_exception_1.ValidationException);
        });
    });
});
//# sourceMappingURL=schedules.dto.test.js.map