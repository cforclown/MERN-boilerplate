"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModelSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ScheduleModelSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: false, default: null },
    desc: { type: String, required: false, default: null }
});
//# sourceMappingURL=schedules.model.js.map