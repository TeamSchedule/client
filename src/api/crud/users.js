import $axios from "../axiosRequests";

export class users {
    static apiPrefix = "/user";

    static async get() {
        return await $axios.get(`${this.apiPrefix}/me`);
    }

    static async update(data) {
        return await $axios.patch(this.apiPrefix, data);
    }

    static async updateUserInfo(userId, data) {
        return await $axios.put(`${this.apiPrefix}/${userId}`, data);
    }

    static async filterByUsername(params) {
        return (await $axios.get(`/user?criteria=${params.username}`)).data["users"];
    }
}
