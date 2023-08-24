'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const configs_1 = __importDefault(require("../swagger/configs"));
const routers_1 = require("./routers");
const utils_1 = require("../utils");
function App() {
    const app = (0, express_1.default)();
    app.use((0, morgan_1.default)(':remote-addr :method :url :status :response-time ms - :res[content-length]'));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ limit: '10mb', extended: false }));
    app.use((0, cors_1.default)({
        origin: utils_1.Environment.getClientBaseUrl(),
        credentials: true
    }));
    app.use((0, express_flash_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        secret: utils_1.Environment.getSessionSecret(),
        resave: utils_1.Environment.getSessionResave(),
        saveUninitialized: utils_1.Environment.getSessionSaveUninitialized(),
        cookie: {
            secure: utils_1.Environment.getSessionCookieSecure(),
            maxAge: utils_1.Environment.getSessionCookieMaxAge()
        }
    }));
    // #region ============================ SWAGGER CONFIG =============================
    // reference: https://swagger.io/specification/#infoObject
    const swaggerDocs = (0, swagger_jsdoc_1.default)(configs_1.default);
    app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    // #endregion -----------------------------------------------------------------------
    app.use('/', (0, routers_1.MainRouter)());
    return app;
}
exports.default = App;
//# sourceMappingURL=index.js.map