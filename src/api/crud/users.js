import $axios from "../axiosRequests";


export class users {
    static apiPrefix = "/user";

    static async get() {
        return await $axios.get(`${this.apiPrefix}/me`);
    }

    static async update(data) {
        return await $axios.patch(this.apiPrefix, data);
    }

    // TODO: check if username exists

    static async filterByUsername(params) {
        return (await $axios.get(`/user?criteria=${params.username}`)).data["users"];
    }
}
