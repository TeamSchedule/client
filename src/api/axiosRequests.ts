import axios, { AxiosInstance } from "axios";
import { SERVER_ORIGIN } from "./config";

const AXIOS_CONFIG = {
    baseURL: SERVER_ORIGIN,
};

export const $nonInterceptAxios: AxiosInstance = axios.create(AXIOS_CONFIG);
