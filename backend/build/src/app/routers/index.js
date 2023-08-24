"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const api_1 = require("./api");
function MainRouter() {
    const router = (0, express_1.Router)();
    router.use('/api', (0, api_1.ApiRouter)());
    return router;
}
exports.MainRouter = MainRouter;
//# sourceMappingURL=index.js.map