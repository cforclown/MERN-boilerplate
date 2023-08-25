import { Request } from 'express';
import { SchedulesService } from './schedules.service';
import { ISchedule } from './schedules.types';
import { HttpCodes, RestApiException } from '../../utils/exceptions';
import { IExplorationResponse } from '../../utils/exploration/exploration';

export class SchedulesController {
  public static readonly INSTANCE_NAME = 'schedulesController';

  private readonly schedulesService: SchedulesService;

  constructor ({ schedulesService }: { schedulesService: SchedulesService; }) {
    this.schedulesService = schedulesService;

    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.explore = this.explore.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get ({ params }: Request): Promise<ISchedule> {
    const schedule = await this.schedulesService.get(params.objectId);
    if (!schedule) {
      throw new RestApiException('Schedule not found', HttpCodes.NotFound);
    }

    return schedule;
  }

  async getAll (): Promise<ISchedule[]> {
    return this.schedulesService.getAll();
  }

  async explore ({ body }: Request): Promise<IExplorationResponse<ISchedule>> {
    return this.schedulesService.explore(body);
  }

  async create ({ body }: Request): Promise<ISchedule> {
    return this.schedulesService.create(body);
  }

  async update ({ body }: Request): Promise<ISchedule> {
    const schedule = await this.schedulesService.update(body);
    if (!schedule) {
      throw new RestApiException('Schedule not found', HttpCodes.NotFound);
    }

    return schedule;
  }

  async delete ({ params }: Request): Promise<string> {
    return this.schedulesService.delete(params.objectId);
  }
}
