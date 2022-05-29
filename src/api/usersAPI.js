import $axios from "./axiosRequests";


export class usersAPI {
    static apiPrefix = "/user";

    static async getUserInfo() {
        return await $axios.get(`${this.apiPrefix}/me`);
    }

    static async updateUserInfo(data) {
        return await $axios.patch(this.apiPrefix, data);
    }

    // TODO: check if username exists

    static async filterByUsername(params) {
        return (await $axios.get(`/user?criteria=${params.username}`)).data["users"];
    }
}
