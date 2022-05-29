import axios from "axios";
import {SERVER_ORIGIN} from "../config/config";
import createAuthRefreshInterceptor from "axios-auth-refresh";


const AXIOS_CONFIG = {
    baseURL: SERVER_ORIGIN,
};

const $axios = axios.create(AXIOS_CONFIG);

// TODO: Function that will be called to refresh authorization
// https://github.com/Flyrell/axios-auth-refresh

const refreshAuthLogic = (failedRequest) => {
    alert("JSON.parse(localStorage.getItem(access))");
    setAccessToken(JSON.parse(localStorage.getItem("access")));
    return $axios.request(failedRequest.config);
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
