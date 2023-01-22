import { LocalStorageApi } from "../storage";
import requestApi from "../fetchApi";
import { ACCESS_TOKEN_STORAGE_NAME, REFRESH_TOKEN_STORAGE_NAME } from "../config";

/**
 * Хранит Promise на обновление пары токенов, чтобы разные запросы одновременно не обновляли токены
 */
let currentRequest: Promise<any> | null = null;

/**
 * Количество попыток на обновление пары токенов
 */
let REFRESH_RETRIES = 3;

/**
 * Создает новый Promise на обновление пары токенов
 */
function makeRefresh() {
    const refreshToken = LocalStorageApi.GET(REFRESH_TOKEN_STORAGE_NAME);
    return requestApi.POST(`/jwt/refresh`, {
        body: {
            refresh: refreshToken,
        },
    });
}

const refresh = async (callback: () => void, handleError: () => void) => {
    for (let i = 0; i < REFRESH_RETRIES; i++) {
        try {
            currentRequest = currentRequest || makeRefresh();
            const res = await currentRequest;
            LocalStorageApi.SET(ACCESS_TOKEN_STORAGE_NAME, res.access);
            LocalStorageApi.SET(REFRESH_TOKEN_STORAGE_NAME, res.refresh);

            callback();
            currentRequest = null;
            break;
        } catch (error) {
            handleError();
            currentRequest = null;
        }
    }
};

export default refresh;
