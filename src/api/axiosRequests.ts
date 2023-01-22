import axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { API } from "./api";
import { REFRESH_TOKEN_STORAGE_NAME, SERVER_ORIGIN } from "./config";
import { TokenPair } from "../schemas/responses/auth";

const AXIOS_CONFIG = {
    baseURL: SERVER_ORIGIN,
};

const $axios: AxiosInstance = axios.create(AXIOS_CONFIG);
export const $nonInterceptAxios: AxiosInstance = axios.create(AXIOS_CONFIG);

// https://github.com/Flyrell/axios-auth-refresh
// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: { response: { config: { headers: { [x: string]: string } } } }) => {
    return API.auth
        .refreshAccessToken({
            token: localStorage.getItem(REFRESH_TOKEN_STORAGE_NAME) || "",
        })
        .then((tokenRefreshResponse: { data: TokenPair }) => {
            const tokenPair: TokenPair = tokenRefreshResponse.data;
            failedRequest.response.config.headers["Authorization"] = "Bearer " + tokenPair.access;
            // @ts-ignore
            $axios.defaults.headers["Authorization"] = `Bearer ${tokenPair.access}`;
            localStorage.setItem(REFRESH_TOKEN_STORAGE_NAME, tokenPair.refresh);
            return tokenPair.access;
        });
};

createAuthRefreshInterceptor($axios, refreshAuthLogic, {
    statusCodes: [401, 403],
});

export function setAccessToken(accessToken: string) {
    // @ts-ignore
    $axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
}

export default $axios;
