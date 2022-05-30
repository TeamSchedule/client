import $axios from "../axiosRequests";


export class auth {
    static async signIn(data) {
        return (await $axios.post(`/jwt/obtain`, data)).data;
    }

    static async signUp(data) {
        return (await $axios.post(`/registration`, data)).data;
    }

    static refreshAccessToken(token) {
        return $axios.post(`/jwt/refresh`, token);
    }
}
