import $axios from "./axiosRequests";


export class usersAPI {
    static apiPrefix = "/user";

    static async getUserInfo() {
        return await $axios.get(this.apiPrefix);
    }

    static async updateUserInfo(data) {
        return await $axios.patch(this.apiPrefix, data);
    }

    static async checkUsernameExisting(username) {
        return await $axios.get(`${this.apiPrefix}/existed?username=${username}`);
    }

    static async filterByUsername(params) {
        return await $axios.get(`/user/search?username=${params.username}`);
    }
}
