"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesDao = void 0;
const mongoose_1 = require("mongoose");
const exceptions_1 = require("../../utils/exceptions");
const pagination_1 = require("../../utils/exploration/pagination");
class SchedulesDao {
    constructor() {
        this.model = (0, mongoose_1.model)(SchedulesDao.MODEL_NAME);
    }
    async get(scheduleId) {
        return this.model.findOne({ _id: scheduleId }).exec();
    }
    async getAll() {
        return this.model.find({}).exec();
    }
    async explore({ query, pagination }) {
        const result = await this.model.aggregate([
            {
                $match: {
                    $or: [
                        { name: { regex: query ?? '', $options: 'i' } },
                        { start: { regex: query ?? '', $options: 'i' } },
                        { end: { regex: query ?? '', $options: 'i' } },
                        { desc: { regex: query ?? '', $options: 'i' } }
                    ]
                }
            },
            {
                $sort: {
                    [pagination.sort.by]: pagination.sort.order ?? pagination_1.IPaginationSortOrders.ASC
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
    async create(payload) {
        return this.model.create({ ...payload });
    }
    async update(payload) {
        const schedule = await this.model.findById(payload._id).exec();
        if (!schedule) {
            throw new exceptions_1.RestApiException('Schedule not found', exceptions_1.HttpCodes.NotFound);
        }
        schedule.name = payload.name ?? schedule.name;
        schedule.start = payload.start ?? schedule.start;
        schedule.end = payload.end ?? schedule.end;
        schedule.desc = payload.desc ?? schedule.desc;
        await schedule.save();
        return schedule;
    }
    async delete(scheduleId) {
        const deletedSchedule = await this.model.findOneAndDelete({ _id: scheduleId }).exec();
        if (!deletedSchedule) {
            throw new exceptions_1.RestApiException('Schedule not found', exceptions_1.HttpCodes.NotFound);
        }
        return deletedSchedule._id;
    }
}
exports.SchedulesDao = SchedulesDao;
SchedulesDao.INSTANCE_NAME = 'schedulesDao';
SchedulesDao.MODEL_NAME = 'schedules';
//# sourceMappingURL=schedules.dao.js.map