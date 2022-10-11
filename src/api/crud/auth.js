import $axios from "../axiosRequests";

export class auth {
    static async signIn(data) {
        return (await $axios.post(`/jwt/obtain`, data)).data;
    }

    static signUp(data) {
        return $axios.post(`/registration`, data);
    }

    static refreshAccessToken(token) {
        return $axios.post(`/jwt/refresh`, token);
    }
}
