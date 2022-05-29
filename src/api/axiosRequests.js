import axios from "axios";
import {SERVER_ORIGIN} from "../config/config";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {API} from "./api";


const AXIOS_CONFIG = {
    baseURL: SERVER_ORIGIN,
};

const $axios = axios.create(AXIOS_CONFIG);

// TODO: Function that will be called to refresh authorization
// https://github.com/Flyrell/axios-auth-refresh

/*const refreshAuthLogic = (failedRequest) => {
    alert("JSON.parse(localStorage.getItem(access))");
    setAccessToken(JSON.parse(localStorage.getItem("access")));
    console.log($axios.defaults.headers);
    return $axios.request(failedRequest.config);
};*/


/*const refreshAuthLogic = (failedRequest) => {
    alert("Make refresh");
    return API.auth.refreshAccessToken({"token": localStorage.getItem("refresh")})
        .then(tokenRefreshResponse => {
            alert("Refresh OK");
            localStorage.setItem('access', tokenRefreshResponse.data.access);
            localStorage.setItem('refresh', tokenRefreshResponse.data.refresh);
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access;
            return Promise.resolve();
        })
};*/


// https://github.com/Flyrell/axios-auth-refresh
// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => API.auth.refreshAccessToken({
    token: JSON.parse(localStorage.getItem('refresh')),
}).then(tokenRefreshResponse => {
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access;
    document.cookie = 'X-Authorization=' + tokenRefreshResponse.data.access +'; path=/;';
    return tokenRefreshResponse.data.access;
});


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
