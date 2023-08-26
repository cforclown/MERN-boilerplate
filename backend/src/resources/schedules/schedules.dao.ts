import { model, Model } from 'mongoose';
import { HttpCodes, RestApiException } from '../../utils/exceptions';
import { ICreateSchedulePayload, ISchedule, IUpdateSchedulePayload } from './schedules.types';
import { IExplorationPayload, IExplorationResponse } from '../../utils/exploration/exploration';
import { PaginationSortOrders } from '../../utils/exploration/pagination';

export class SchedulesDao {
  public static readonly INSTANCE_NAME = 'schedulesDao';
  public static readonly MODEL_NAME = 'schedules';

  private readonly model: Model<ISchedule>;

  constructor () {
    this.model = model<ISchedule>(SchedulesDao.MODEL_NAME);
  }

  async get (scheduleId: string): Promise<ISchedule | null> {
    return this.model.findOne({ _id: scheduleId }).exec();
  }

  async getAll (): Promise<ISchedule[]> {
    return this.model.find({ }).exec();
  }

  async explore ({ query, pagination }: IExplorationPayload): Promise<IExplorationResponse<ISchedule>> {
    const result = await this.model
      .aggregate([
        {
          $match: {
            $or: [
              { name: { $regex: query ?? '', $options: 'i' } },
              { start: { $regex: query ?? '', $options: 'i' } },
              { end: { $regex: query ?? '', $options: 'i' } },
              { desc: { $regex: query ?? '', $options: 'i' } }
            ]
          }
        },
        {
          $sort: {
            [pagination.sort.by]: pagination.sort.order ?? PaginationSortOrders.ASC
          }
        },
        {
          $facet: {
            metadata: [
              { $count: 'total' },
              { $addFields: { page: pagination.page } }
            ],
            data: [
              { $skip: (pagination.page - 1) * pagination.limit },
              { $limit: pagination.limit }
            ]
          }
        }
      ])
      .exec();

    const response = {
      data: [],
      exploration: {
        query,
        pagination: {
          ...pagination,
          pageCount: 0
        }
      }
    };

    if (result[0].metadata.length && result[0].data.length) {
      response.data = result[0].data;
      response.exploration.pagination.pageCount = Math.ceil(result[0].metadata[0].total / pagination.limit);
    }

    return response;
  }

  async create (payload: ICreateSchedulePayload & { _id?: string; }): Promise<ISchedule> {
    return this.model.create({ ...payload });
  }

  async update (payload: IUpdateSchedulePayload): Promise<ISchedule> {
    const schedule = await this.model.findById(payload._id).exec();
    if (!schedule) {
      throw new RestApiException('Schedule not found', HttpCodes.NotFound);
    }
    schedule.name = payload.name ?? schedule.name;
    schedule.start = payload.start ?? schedule.start;
    schedule.end = payload.end ?? schedule.end;
    schedule.desc = payload.desc ?? schedule.desc;
    await schedule.save();

    return schedule;
  }

  async delete (scheduleId: string): Promise<string> {
    const deletedSchedule = await this.model.findOneAndDelete({ _id: scheduleId }).exec();
    if (!deletedSchedule) {
      throw new RestApiException('Schedule not found', HttpCodes.NotFound);
    }
    return deletedSchedule._id;
  }
}
