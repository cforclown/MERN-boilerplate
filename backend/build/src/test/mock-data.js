"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockExplorationPayload = exports.mockUpdateSchedulePayload = exports.mockCreateSchedulePayload = exports.mockSchedule = void 0;
exports.mockSchedule = {
    _id: 'schedule-id',
    name: 'schedule name',
    start: new Date('01-01-2000'),
    end: new Date('01-02-2000'),
    desc: 'schedule description'
};
exports.mockCreateSchedulePayload = {
    name: 'name',
    start: new Date('01-01-2000'),
    end: new Date('01-02-2000'),
    desc: 'schedule description'
};
exports.mockUpdateSchedulePayload = {
    _id: 'schedule-id',
    name: 'schedule name',
    start: new Date('01-01-2000'),
    end: new Date('01-02-2000'),
    desc: 'schedule description'
};
exports.mockExplorationPayload = {
    query: 'query',
    pagination: {
        page: 1,
        limit: 10,
        sort: {
            by: 'name'
        }
    }
};
//# sourceMappingURL=mock-data.js.map