export const RESTAPI_BASE_URL = process.env.REACT_APP_RESTAPI_BASE_URL;

export const API_ENDPOINT = `${RESTAPI_BASE_URL}/api`;
export const SOCKETIO_ENDPOINT = RESTAPI_BASE_URL as string;
export const AUTH_ENDPOINT = `${RESTAPI_BASE_URL}/auth`;
export const SLACK_BOT_ENDPOINT = `${RESTAPI_BASE_URL}/slack`;
