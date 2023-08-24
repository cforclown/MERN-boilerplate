"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = exports.getEnvOrThrow = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnvOrThrow(environmentVariableName) {
    const value = process.env[environmentVariableName];
    if (!value) {
        throw new Error(`Environment variable ${environmentVariableName} not set!`);
    }
    return value;
}
exports.getEnvOrThrow = getEnvOrThrow;
exports.Environment = {
    getNodeEnv: () => {
        const value = getEnvOrThrow('NODE_ENV');
        if (value !== 'development' && value !== 'test' && value !== 'production') {
            throw new Error('Environment variable NODE_ENV not set!');
        }
        return value;
    },
    getAppPort: () => getEnvOrThrow('APP_PORT'),
    getClientBaseUrl: () => {
        const appHost = getEnvOrThrow('CLIENT_BASE_URL');
        return appHost.split(',').filter(h => !!h);
    },
    getDBUri: () => `mongodb://${getEnvOrThrow('DB_USERNAME')}:${getEnvOrThrow('DB_PASSWORD')}@${getEnvOrThrow('DB_HOST')}:${getEnvOrThrow('DB_PORT')}`,
    getDBName: () => getEnvOrThrow('DB_NAME'),
    getDBUsername: () => getEnvOrThrow('DB_USERNAME'),
    getDBPassword: () => getEnvOrThrow('DB_PASSWORD'),
    getSessionSecret: () => getEnvOrThrow('SESSION_SECRET'),
    getSessionResave: () => getEnvOrThrow('SESSION_RESAVE') === 'true',
    getSessionSaveUninitialized: () => getEnvOrThrow('SESSION_SAVE_UNINITIALIZED') === 'true',
    getSessionCookieSecure: () => getEnvOrThrow('SESSION_COOKIE_SECURE') === 'true',
    getSessionCookieMaxAge: () => parseInt(getEnvOrThrow('SESSION_COOKIE_MAX_AGE')),
    getAccessTokenSecret: () => getEnvOrThrow('ACCESS_TOKEN_SECRET'),
    getRefreshTokenSecret: () => getEnvOrThrow('REFRESH_TOKEN_SECRET'),
    getAccessTokenExpIn: () => parseInt(getEnvOrThrow('ACCESS_TOKEN_EXP_IN')),
    getAccessRefreshTokenExpIn: () => parseInt(getEnvOrThrow('ACCESS_TOKEN_EXP_IN')) * 2,
    getEncryptionAlgorithm: () => getEnvOrThrow('ENCRYPTION_ALGORITHM'),
    getEncryptionKey: () => getEnvOrThrow('ENCRYPTION_KEY')
};
//# sourceMappingURL=environment.js.map