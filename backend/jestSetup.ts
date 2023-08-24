process.env.NODE_ENV='test';

process.env.APP_PORT='2999';
process.env.CLIENT_BASE_URL='http://localhost:3000';

process.env.SESSION_SECRET='xxxxxxxxxxxx';
process.env.SESSION_RESAVE='false';
process.env.SESSION_SAVE_UNINITIALIZED='false'
process.env.SESSION_COOKIE_SECURE='false'
process.env.SESSION_COOKIE_MAX_AGE='3600';

process.env.ACCESS_TOKEN_EXP_IN = '3600';
process.env.ACCESS_TOKEN_SECRET = 'xxxxxxxxxxxxxxxx';
process.env.REFRESH_TOKEN_SECRET = 'xxxxxxxxxxxxxxxx';

process.env.ENCRYPTION_ALGORITHM='aes-256-cbc';
process.env.ENCRYPTION_KEY = 'xxxxxxxxxxxxx';
