import { Schema } from 'mongoose';
import { ISchedule } from './schedules.types';

export const SchedulesSchema = new Schema<ISchedule>({
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: false, default: null },
  desc: { type: String, required: false, default: null }
});
