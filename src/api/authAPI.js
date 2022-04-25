import $axios from "./axiosRequests";


export class authAPI {
    static async signIn(data) {
        return (await $axios.post(`/jwt/obtain`, data)).data;
    }

    static async signUp(data) {
        return (await $axios.post(`/registration`, data)).data;
    }

    static async refreshAccessToken() {
        return (await $axios.get(`/jwt/refresh`)).data;
    }
}
