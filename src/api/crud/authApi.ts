import { $nonInterceptAxios } from "../axiosRequests";
import {
    CreateNewPasswordRequestSchema,
    RefreshTokensRequestSchema,
    ResetPasswordCodeRequestSchema,
    ResetPasswordEmailRequestSchema,
    SignInRequestSchema,
    SignUpRequestSchema,
} from "../schemas/requests/auth";
import requestApi from "../fetchApi";

export class AuthApi {
    static baseUrl: string = "jwt";

    static signIn(data: SignInRequestSchema) {
        return $nonInterceptAxios.post(`/jwt/obtain`, data).then((res) => res.data);
    }

    static signUp(data: SignUpRequestSchema) {
        return $nonInterceptAxios.post(`/registration`, data);
    }

    static refreshAccessToken(token: RefreshTokensRequestSchema) {
        return requestApi.POST(`/jwt/refresh`, token);
    }

    static sendResetPswEmail(data: ResetPasswordEmailRequestSchema) {
        return requestApi.POST(`/resetpassword`, data);
    }

    static sendResetPswCode(data: ResetPasswordCodeRequestSchema) {
        return requestApi.POST(`/resetcode`, data);
    }

    static createNewPassword(data: CreateNewPasswordRequestSchema) {
        return requestApi.POST(`/newpass`, data);
    }
}
