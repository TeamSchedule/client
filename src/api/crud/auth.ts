import $axios from "../axiosRequests";
import {
    RefreshTokensRequestSchema,
    SignInRequestSchema,
    SignUpRequestSchema,
} from "../schemas/requests/auth";

export class auth {
    static async signIn(data: SignInRequestSchema) {
        return (await $axios.post(`/jwt/obtain`, data)).data;
    }

    static signUp(data: SignUpRequestSchema) {
        return $axios.post(`/registration`, data);
    }

    static refreshAccessToken(token: RefreshTokensRequestSchema) {
        return $axios.post(`/jwt/refresh`, token);
    }
}
