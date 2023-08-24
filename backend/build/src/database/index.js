"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils");
const resources_1 = require("../resources");
class Database {
    constructor() {
        this.connect = this.connect.bind(this);
    }
    async connect() {
        await mongoose_1.default.connect(utils_1.Environment.getDBUri(), { dbName: utils_1.Environment.getDBName() });
        this.registerModels();
    }
    close() {
        mongoose_1.default.disconnect();
    }
    registerModels() {
        mongoose_1.default.model(resources_1.SchedulesDao.MODEL_NAME, resources_1.ScheduleModelSchema);
    }
}
exports.default = Database;
//# sourceMappingURL=index.js.map