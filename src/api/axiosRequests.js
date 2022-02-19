import axios from "axios";
import {DOMAIN_URL, ENABLE_HTTPS} from "../config/config";
import createAuthRefreshInterceptor from "axios-auth-refresh";


const AXIOS_CONFIG = {
    baseURL: `http${ENABLE_HTTPS ? "s" : ""}://${DOMAIN_URL}/`,
};


const $axios = axios.create(AXIOS_CONFIG);

// TODO: Function that will be called to refresh authorization
// https://github.com/Flyrell/axios-auth-refresh

const refreshAuthLogic = async (failedRequest) => {
    setAccessToken(JSON.parse(localStorage.getItem("token")));
    return (await $axios.request(failedRequest.config)).data;
};


createAuthRefreshInterceptor($axios, refreshAuthLogic, {
    statusCodes: [401, 403]
});


export function setAccessToken(accessToken) {
    $axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
}


export function deleteAccessToken() {
    delete $axios.defaults.headers['Authorization'];
}


export default $axios;
