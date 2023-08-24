"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesService = void 0;
class SchedulesService {
    constructor({ schedulesDao }) {
        this.schedulesDao = schedulesDao;
    }
    get(scheduleId) {
        return this.schedulesDao.get(scheduleId);
    }
    getAll() {
        return this.schedulesDao.getAll();
    }
    async explore(payload) {
        return this.schedulesDao.explore(payload);
    }
    async create(payload) {
        return this.schedulesDao.create(payload);
    }
    async update(payload) {
        return this.schedulesDao.update(payload);
    }
    delete(scheduleId) {
        return this.schedulesDao.delete(scheduleId);
    }
}
exports.SchedulesService = SchedulesService;
SchedulesService.INSTANCE_NAME = 'schedulesService';
//# sourceMappingURL=schedules.service.js.map