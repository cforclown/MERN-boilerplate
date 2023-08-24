"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mock_data_json_1 = __importDefault(require("../../../../mock-data/mock-data.json"));
const di_config_1 = require("../../../di-config");
const resources_1 = require("../../../resources");
const __1 = __importDefault(require("../.."));
const utils_1 = require("../../../utils");
const runSeed = async () => {
    (0, di_config_1.setup)();
    await (new __1.default()).connect();
    const schedulesDao = di_config_1.container.resolve(resources_1.SchedulesDao.INSTANCE_NAME);
    await Promise.all(mock_data_json_1.default.map((schedule) => schedulesDao.create({
        _id: new mongoose_1.Types.ObjectId().toHexString(),
        ...schedule
    })));
};
runSeed()
    .then(() => utils_1.Logger.success('Seeded: ' + mock_data_json_1.default.length))
    .catch((err) => utils_1.Logger.success(err))
    .finally(() => process.exit());
//# sourceMappingURL=index.js.map