import $axios from "./axiosRequests";


export class authAPI {
    // static apiPrefix = "/auth";
    static apiPrefix = "";

    static async signIn(data) {
        return (await $axios.post(`${this.apiPrefix}/auth`, data)).data;
    }

    static async signUp(data) {
        return (await $axios.post(`${this.apiPrefix}/register`, data)).data;
    }

    static async signOut() {
        return (await $axios.get(`${this.apiPrefix}/signout`)).data;
    }

    // TODO: endpoints for auth-service
    static async refreshAccessToken() {
        return (await $axios.get(`${this.apiPrefix}/jwt/access`)).data;
    }

    static async obtainTokenPair(credentials) {
        return (await $axios.post(`${this.apiPrefix}/jwt/pair`, credentials)).data;
    }
}
