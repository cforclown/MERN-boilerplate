import { Express } from 'express';
import Database from '../database';
import { container } from '../di-config';
import { Environment, Logger } from '../utils';

export default class Server {
  private readonly database: Database;
  private readonly app: Express;

  constructor () {
    this.database = container.resolve('database');
    this.app = container.resolve('app');
  }

  async start (): Promise<void> {
    try {
      Logger.success('====================================================');
      Logger.success(`| ENV: ${Environment.getNodeEnv().toUpperCase()}`);
      await this.database.connect();
      Logger.success('| SUCCESSFULLY CONNECTED TO THE DATABASE');

      const port = Environment.getAppPort();
      await this.app.listen(port);

      Logger.success(`| SERVER STARTED SUCCESSFULLY [${port}]`);
      Logger.success('====================================================');
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
      }
    }
  }
}
