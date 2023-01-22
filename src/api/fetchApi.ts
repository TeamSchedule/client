// import { logoutObserver } from "./observers";
import refresh from "./crud/refresh";
import { LocalStorageApi } from "./storage";
import { ACCESS_TOKEN_STORAGE_NAME, SERVER_ORIGIN } from "./config";
import checkOptions from "./utils/checkOptions";

const BASE_URL = SERVER_ORIGIN;

class APIRequestError {
    private message: string;
    private details: object;
    private status: number;
    private name: string;

    constructor(message: string, details: object, status: number) {
        this.message = message;
        this.details = details;
        this.status = status;
        this.name = `Ошибка обращения к ${BASE_URL} API`;
    }
}

/**
 * По умолчанию будет добавлен Content-Type: application/json
 *
 * @param {string} requestUrl
 * @param {Object} [fetchOptions]
 * @param {Object} [additionalHeaders]
 * @returns {Object}
 */
const makeRequest = async (requestUrl: string, fetchOptions: object = {}, additionalHeaders: object = {}) => {
    const isAuthentication = requestUrl.includes("jwt");
    const authHeader = isAuthentication
        ? {}
        : (() => {
              const accessToken = LocalStorageApi.GET(ACCESS_TOKEN_STORAGE_NAME);
              if (!accessToken) return;
              return {
                  ...additionalHeaders,
                  Authorization: `Bearer ${accessToken}`,
              };
          })();

    const response = await fetch(`${BASE_URL}${requestUrl}`, {
        headers: {
            "Content-Type": "application/json",
            ...additionalHeaders,
            ...authHeader,
        },
        ...fetchOptions,
    });
    if (response.status === 404) throw new APIRequestError("Сервис недоступен", {}, response.status);
    if (response.status === 401) {
        const makeRequestAgain = () => makeRequest(requestUrl, fetchOptions, additionalHeaders);
        await refresh(makeRequestAgain, () => {} /* logoutObserver.notify*/);
        return;
    }
    const payload = response.status !== 204 ? await response.json() : undefined;
    if (!response.ok) throw new APIRequestError("Неизвестная ошибка", payload, response.status);
    return payload;
};

const requestApi = {
    GET: (path: string, fetchOptions: object) => {
        return makeRequest(path, {
            method: "GET",
            ...checkOptions(fetchOptions),
        });
    },
    POST: (path: string, fetchOptions: object) => {
        return makeRequest(path, {
            method: "POST",
            ...checkOptions(fetchOptions),
        });
    },
    PUT: (path: string, fetchOptions: object) => {
        return makeRequest(path, {
            method: "PUT",
            ...checkOptions(fetchOptions),
        });
    },
    PATCH: (path: string, fetchOptions: object) => {
        return makeRequest(path, {
            method: "PATCH",
            ...checkOptions(fetchOptions),
        });
    },
    DELETE: (path: string, fetchOptions: object) => {
        return makeRequest(path, {
            method: "DELETE",
            ...checkOptions(fetchOptions),
        });
    },
};

export default requestApi;
