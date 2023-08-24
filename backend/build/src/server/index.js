"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const database_1 = __importDefault(require("../database"));
const utils_1 = require("../utils");
class Server {
    async start() {
        try {
            utils_1.Logger.success('============================================================================');
            utils_1.Logger.success(`| ${utils_1.Environment.getNodeEnv().toUpperCase()} MODE`);
            await (new database_1.default()).connect();
            utils_1.Logger.success('| SUCCESSFULLY CONNECTED TO THE DATABASE');
            const port = utils_1.Environment.getAppPort();
            const app = (0, app_1.default)();
            await app.listen(port);
            utils_1.Logger.success(`| SERVER STARTED SUCCESSFULLY [${port}]`);
            utils_1.Logger.success('============================================================================');
        }
        catch (err) {
            if (err instanceof Error) {
                utils_1.Logger.error(err.message);
            }
        }
    }
}
exports.default = Server;
//# sourceMappingURL=index.js.map