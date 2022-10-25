import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { API } from "./api";
import { SERVER_ORIGIN } from "../config/config";

const AXIOS_CONFIG = {
    baseURL: SERVER_ORIGIN,
};

const $axios = axios.create(AXIOS_CONFIG);

// https://github.com/Flyrell/axios-auth-refresh
// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) =>
    API.auth
        .refreshAccessToken({
            token: localStorage.getItem("refresh"),
        })
        .then((tokenRefreshResponse) => {
            failedRequest.response.config.headers["Authorization"] =
                "Bearer " + tokenRefreshResponse.data.access;
            $axios.defaults.headers["Authorization"] = `Bearer ${tokenRefreshResponse.data.access}`;
            return tokenRefreshResponse.data.access;
        });

createAuthRefreshInterceptor($axios, refreshAuthLogic, {
    statusCodes: [401, 403],
});

export function setAccessToken(accessToken) {
    $axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
}

export function deleteAccessToken() {
    delete $axios.defaults.headers["Authorization"];
}

export default $axios;
