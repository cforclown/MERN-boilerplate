"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesSwaggerSchemas = void 0;
exports.SchedulesSwaggerSchemas = {
    createSchedule: {
        type: 'object',
        properties: {
            name: { type: 'string', required: true },
            start: { type: 'date', required: true },
            end: { type: 'date' },
            desc: { type: 'string' }
        }
    },
    updateSchedule: {
        type: 'object',
        properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            start: { type: 'date' },
            end: { type: 'date' },
            desc: { type: 'string' }
        }
    }
};
//# sourceMappingURL=schedules.swagger-schemas.js.map