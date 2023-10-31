import dotenv from 'dotenv';
import { ELogLevel } from './logger';

dotenv.config();

export const AppEnvNames = ['dev', 'test', 'staging', 'prod'] as const;
export type AppEnvs = typeof AppEnvNames[number];
const isValidAppEnv = (env: string): env is AppEnvs => !!AppEnvNames.find(e => e === env);

export function getEnvOrThrow (environmentVariableName: string): string {
  const value = process.env[environmentVariableName];
  if (!value) {
    throw new Error(`Environment variable ${environmentVariableName} not set!`);
  }
  return value;
}

export const Environment = {
  getNodeEnv: (): AppEnvs => {
    const value = getEnvOrThrow('APP_ENV');
    if (!isValidAppEnv(value)) {
      throw new Error('Environment variable APP_ENV not set or invalid! APP_ENV should be one of => \'dev\' | \'test\' | \'staging\' | \'prod\'');
    }

    return value;
  },
  getAppPort: (): string => getEnvOrThrow('APP_PORT'),

  getApiVersion: (): string => getEnvOrThrow('API_VERSION'),
  getLogLevel: (): ELogLevel => {
    const logLevel = process.env.LOG_LEVEL;
    if (!logLevel) {
      return ELogLevel.PRODUCTION;
    }

    switch (logLevel) {
      case 'debug':
        return ELogLevel.DEBUG;
      case 'test':
        return ELogLevel.TEST;
      case 'error':
        return ELogLevel.ERROR;
      case 'prod':
        return ELogLevel.PRODUCTION;
      default:
        return ELogLevel.PRODUCTION;
    }
  },

  getAllowedOrigins: (): string[] => {
    const appHost = getEnvOrThrow('ALLOWED_ORIGINS');
    return appHost.split(',').filter(h => !!h);
  },

  getDBConnectionStr: (): string => getEnvOrThrow('DB_CONN_STR'),

  getSessionSecret: (): string => getEnvOrThrow('SESSION_SECRET'),

  getAccessTokenSecret: (): string => getEnvOrThrow('ACCESS_TOKEN_SECRET'),

  getEncryptionAlgorithm: (): string => getEnvOrThrow('ENCRYPTION_ALGORITHM'),
  getEncryptionKey: (): string => getEnvOrThrow('ENCRYPTION_KEY')
};
