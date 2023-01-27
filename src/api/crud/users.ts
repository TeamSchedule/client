import $axios from "../axiosRequests";
import { UpdateUserInfoRequestSchema } from "../../schemas/requests/users";
import { AuthUserKey } from "../../consts/common";
import { LocalStorageApi } from "../storage";

export class users {
    static apiPrefix = "/user";

    static async getUser() {
        return $axios.get(`${this.apiPrefix}/me`).then((r) => {
            LocalStorageApi.SET(AuthUserKey, r.data.user);
            return r.data;
        });
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
