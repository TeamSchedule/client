import axios from "axios";
import {SERVER_ORIGIN} from "../config/config";
import createAuthRefreshInterceptor from "axios-auth-refresh";


const AXIOS_CONFIG = {
    baseURL: SERVER_ORIGIN,
};


const $axios = axios.create(AXIOS_CONFIG);


$axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 404) {
        alert("404");
    }
    return Promise.reject(error);
});

// TODO: Function that will be called to refresh authorization
// https://github.com/Flyrell/axios-auth-refresh

const refreshAuthLogic = async (failedRequest) => {
    setAccessToken(JSON.parse(localStorage.getItem("access")));
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
