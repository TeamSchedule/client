import refresh from "./crud/refresh";
import { ACCESS_TOKEN_STORAGE_NAME, SERVER_ORIGIN } from "./config";
import checkOptions from "./utils/checkOptions";
import { API } from "./api";

const BASE_URL = SERVER_ORIGIN;

/**
 * Максимальное количество попыток запроса, если ответ с 5** или ошибка
 * */
const MaxRequestAttempts: number = 3;

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
    // Если запрос на аутентификацию, он не требует токена
    const isAuthentication = requestUrl.includes(API.auth.baseUrl);
    const authHeader = isAuthentication
        ? {}
        : (() => {
              const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_NAME);
              if (!accessToken) return;
              return {
                  ...additionalHeaders,
                  Authorization: `Bearer ${accessToken}`,
              };
          })();

    async function makeAttempt() {
        return await fetch(`${BASE_URL}${requestUrl}`, {
            headers: {
                "Content-Type": "application/json",
                ...additionalHeaders,
                ...authHeader,
            },
            ...fetchOptions,
        });
    }

    for (let requestAttempt = 0; requestAttempt < MaxRequestAttempts; requestAttempt++) {
        // поптыка выполнить запрос
        let response = null;
        try {
            response = await makeAttempt();
        } catch (e) {
            continue;
        }

        // условия для повторной поптыки
        if (response.status >= 500) {
            continue;
        }

        if (response.status === 404) throw new APIRequestError("Сервис недоступен", {}, response.status);
        if (response.status === 401) {
            const makeRequestAgain = () => makeRequest(requestUrl, fetchOptions, additionalHeaders);
            await refresh(makeRequestAgain, () => {} /* logoutObserver.notify*/);
            return;
        }
        const payload = response.status !== 204 ? await response.json() : undefined;
        if (!response.ok) throw new APIRequestError("Неизвестная ошибка", payload, response.status);
        return payload;
    }
};

const requestApi = {
    GET: (path: string, fetchOptions: object = {}) => {
        return makeRequest(path, {
            method: "GET",
            ...checkOptions(fetchOptions),
        });
    },
    POST: (path: string, fetchOptions: object = {}) => {
        return makeRequest(path, {
            method: "POST",
            ...checkOptions(fetchOptions),
        });
    },
    POST_FILE: (path: string, fetchOptions: object = {}) => {
        return makeRequest(
            path,
            {
                method: "POST",
                ...checkOptions(fetchOptions),
            },
            {
                "Content-Type": "multipart/form-data",
            }
        );
    },
    PUT: (path: string, fetchOptions: object = {}) => {
        return makeRequest(path, {
            method: "PUT",
            ...checkOptions(fetchOptions),
        });
    },
    PATCH: (path: string, fetchOptions: object = {}) => {
        return makeRequest(path, {
            method: "PATCH",
            ...checkOptions(fetchOptions),
        });
    },
    DELETE: (path: string, fetchOptions: object = {}) => {
        return makeRequest(path, {
            method: "DELETE",
            ...checkOptions(fetchOptions),
        });
    },
};

export default requestApi;
