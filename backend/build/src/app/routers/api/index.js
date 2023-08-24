"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const express_1 = require("express");
const di_config_1 = require("../../../di-config");
const resources_1 = require("../../../resources");
function ApiRouter() {
    const router = (0, express_1.Router)();
    router.use(`/${resources_1.SCHEDULES_BASE_API_PATH}`, di_config_1.container.resolve(resources_1.SCHEDULES_ROUTER_INSTANCE_NAME));
    return router;
}
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=index.js.map