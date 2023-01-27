import $axios, { $nonInterceptAxios } from "../axiosRequests";
import {
    CreateNewPasswordRequestSchema,
    RefreshTokensRequestSchema,
    ResetPasswordCodeRequestSchema,
    ResetPasswordEmailRequestSchema,
    SignInRequestSchema,
    SignUpRequestSchema,
} from "../schemas/requests/auth";

export class AuthApi {
    static signIn(data: SignInRequestSchema) {
        return $nonInterceptAxios.post(`/jwt/obtain`, data).then((res) => res.data);
    }

    static signUp(data: SignUpRequestSchema) {
        return $nonInterceptAxios.post(`/registration`, data);
    }

    static refreshAccessToken(token: RefreshTokensRequestSchema) {
        return $axios.post(`/jwt/refresh`, token);
    }

    static sendResetPswEmail(data: ResetPasswordEmailRequestSchema) {
        return $axios.post(`/resetpassword`, data);
    }

    static sendResetPswCode(data: ResetPasswordCodeRequestSchema) {
        return $axios.post(`/resetcode`, data);
    }

    static createNewPassword(data: CreateNewPasswordRequestSchema) {
        return $axios.post(`/newpass`, data);
    }
}
