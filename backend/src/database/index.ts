import mongoose from 'mongoose';
import { Environment } from '../utils';
import { SchedulesDao, SchedulesSchema } from '../modules';

class Database {
  constructor () {
    this.connect = this.connect.bind(this);
    mongoose.model(SchedulesDao.MODEL_NAME, SchedulesSchema);
  }

  async connect (): Promise<void> {
    await mongoose.connect(Environment.getDBConnectionStr(), { dbName: 'test' });
  }

  close (): void {
    mongoose.disconnect();
  }
}

export default Database;
