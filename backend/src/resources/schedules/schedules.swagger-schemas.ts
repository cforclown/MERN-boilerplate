export const SchedulesSwaggerSchemas = {
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
