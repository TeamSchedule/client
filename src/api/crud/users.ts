import { UpdateUserInfoRequestSchema } from "../schemas/requests/users";
import { GetAllUsersResponseSchema, GetMeResponseSchema, UserSchema } from "../schemas/responses/users";
import requestApi from "../fetchApi";

export class users {
    static apiPrefix = "/schedule/user";

    static async all(): Promise<UserSchema[]> {
        return requestApi.GET(`${this.apiPrefix}`).then((data: GetAllUsersResponseSchema) => {
            return data.users;
        });
    }

    static async getUser(): Promise<UserSchema> {
        return requestApi.GET(`${this.apiPrefix}/me`).then((data: GetMeResponseSchema) => {
            return data.user;
        });
    }

    static async updateUserInfo(userId: number, data: UpdateUserInfoRequestSchema) {
        return await requestApi.PUT(`${this.apiPrefix}/${userId}`, data);
    }

    static async filterByUsername(username: string) {
        return (await requestApi.GET(`/user?criteria=${username}`)).data["users"];
    }

    static isUsernameExist(username: string) {
        return requestApi
            .GET(`/user?criteria=${username}`)
            .then((res) => res.data)
            .then((users) => users.length > 0);
    }
}
