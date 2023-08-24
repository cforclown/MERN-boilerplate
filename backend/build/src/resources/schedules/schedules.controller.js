"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesController = void 0;
const exceptions_1 = require("../../utils/exceptions");
class SchedulesController {
    constructor({ schedulesService }) {
        this.schedulesService = schedulesService;
        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.explore = this.explore.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    async get({ params }) {
        const schedule = await this.schedulesService.get(params.objectId);
        if (!schedule) {
            throw new exceptions_1.RestApiException('Schedule not found', exceptions_1.HttpCodes.NotFound);
        }
        return schedule;
    }
    async getAll() {
        return this.schedulesService.getAll();
    }
    async explore({ body }) {
        return this.schedulesService.explore(body);
    }
    async create({ body }) {
        return this.schedulesService.create(body);
    }
    async update({ body }) {
        const schedule = await this.schedulesService.update(body);
        if (!schedule) {
            throw new exceptions_1.RestApiException('Schedule not found', exceptions_1.HttpCodes.NotFound);
        }
        return schedule;
    }
    async delete({ params }) {
        return this.schedulesService.delete(params.objectId);
    }
}
exports.SchedulesController = SchedulesController;
SchedulesController.INSTANCE_NAME = 'schedulesController';
//# sourceMappingURL=schedules.controller.js.map