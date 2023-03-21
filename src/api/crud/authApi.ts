import {
    CreateNewPasswordRequestSchema,
    ResetPasswordCodeRequestSchema,
    ResetPasswordEmailRequestSchema,
    SignInRequestSchema,
    SignUpRequestSchema,
} from "../schemas/requests/auth";
import requestApi from "../fetchApi";

export class AuthApi {
    static baseUrl: string = "jwt";

    static signIn(data: SignInRequestSchema) {
        return requestApi.POST(`/jwt/obtain`, {
            body: { ...data, login: "login" },
        });
    }

    static signUp(data: SignUpRequestSchema) {
        return requestApi.POST(`/registration`, {
            body: { ...data, login: "login" },
        });
    }

    static sendResetPswEmail(data: ResetPasswordEmailRequestSchema) {
        return requestApi.POST(`/resetpassword`, {
            body: data,
        });
    }

    static sendResetPswCode(data: ResetPasswordCodeRequestSchema) {
        return requestApi.POST(`/resetcode`, {
            body: data,
        });
    }

    static createNewPassword(data: CreateNewPasswordRequestSchema) {
        return requestApi.POST(`/newpass`, {
            body: data,
        });
    }
}
