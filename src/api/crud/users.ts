import $axios from "../axiosRequests";
import { UpdateUserInfoRequestSchema } from "../../schemas/requests/users";

export class users {
    static apiPrefix = "/user";

    static async getUser() {
        return (await $axios.get(`${this.apiPrefix}/me`)).data;
    }

    static async updateUserInfo(userId: number, data: UpdateUserInfoRequestSchema) {
        return await $axios.put(`${this.apiPrefix}/${userId}`, data);
    }

    static async filterByUsername(username: string) {
        return (await $axios.get(`/user?criteria=${username}`)).data["users"];
    }

    static isUsernameExist(username: string) {
        return $axios
            .get(`/user?criteria=${username}`)
            .then((res) => res.data)
            .then((users) => users.length > 0);
    }
}
