const ENABLE_HTTPS: boolean = false;
const DOMAIN: string = "localhost";

export const SERVER_ORIGIN: string = `http${ENABLE_HTTPS ? "s" : ""}://${DOMAIN}`;

export const MEDIA_STATIC_SERVER: string = `http${ENABLE_HTTPS ? "s" : ""}://${DOMAIN}/media`;

export const ACCESS_TOKEN_STORAGE_NAME = "access";
export const REFRESH_TOKEN_STORAGE_NAME = "refresh";
