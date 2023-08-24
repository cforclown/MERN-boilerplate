"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const dro_1 = require("./dro");
const exceptions_1 = require("./exceptions");
function RequestHandler(event) {
    return async (req, res, next) => {
        try {
            const data = await event(req, res, next);
            res.send(dro_1.dro.response(data));
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            if (err instanceof exceptions_1.RestApiException) {
                return res.status(err.httpCode).send(dro_1.dro.error(err.message));
            }
            if (err instanceof Error) {
                return res.status(exceptions_1.HttpCodes.Internal).send(dro_1.dro.error(err.message));
            }
            else {
                return res.status(exceptions_1.HttpCodes.Internal).send(dro_1.dro.error('Unknown error'));
            }
        }
    };
}
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=request-handler.js.map