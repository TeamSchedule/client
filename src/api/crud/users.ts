import $axios from "../axiosRequests";
import { UpdateUserInfoRequestSchema } from "../schemas/requests/users";
import { AuthUserKey } from "../../consts/common";
import { LocalStorageApi } from "../storage";
import { GetMeResponseSchema, UserSchema } from "../schemas/responses/users";

export class users {
    static apiPrefix = "/user";

    static async getUser(): Promise<UserSchema> {
        return $axios
            .get(`${this.apiPrefix}/me`)
            .then((r) => {
                return r.data;
            })
            .then((data: GetMeResponseSchema) => {
                LocalStorageApi.SET(AuthUserKey, data.user);
                return data.user;
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
