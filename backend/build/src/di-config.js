"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.container = void 0;
const awilix_1 = require("awilix");
const resources_1 = require("./resources");
exports.container = (0, awilix_1.createContainer)({
    injectionMode: awilix_1.InjectionMode.PROXY
});
function setup() {
    exports.container.register({
        [resources_1.SCHEDULES_ROUTER_INSTANCE_NAME]: (0, awilix_1.asFunction)(resources_1.SchedulesRouter),
        [resources_1.SchedulesController.INSTANCE_NAME]: (0, awilix_1.asClass)(resources_1.SchedulesController),
        [resources_1.SchedulesService.INSTANCE_NAME]: (0, awilix_1.asClass)(resources_1.SchedulesService),
        schedulesDao: (0, awilix_1.asClass)(resources_1.SchedulesDao)
    });
}
exports.setup = setup;
//# sourceMappingURL=di-config.js.map