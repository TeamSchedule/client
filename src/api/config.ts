const ENABLE_HTTPS: boolean = false;

export const SERVER_ORIGIN: string = `http${ENABLE_HTTPS ? "s" : ""}://localhost`;
// export const SERVER_ORIGIN: string = `http${ENABLE_HTTPS ? "s" : ""}://192.168.0.100`;
export const AVATARS_STATIC_SERVER: string = "http://localhost:81/avatars";
export const MEDIA_STATIC_SERVER: string = "http://localhost/media";

export const ACCESS_TOKEN_STORAGE_NAME = "access";
export const REFRESH_TOKEN_STORAGE_NAME = "refresh";
