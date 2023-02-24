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
}
