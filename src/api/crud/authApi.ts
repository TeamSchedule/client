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

    static async signIn(data: SignInRequestSchema): Promise<any> {
        return requestApi.POST(`/jwt/obtain`, {
            body: data,
        });
    }

    static async signUp(data: SignUpRequestSchema): Promise<any> {
        return requestApi.POST(`/registration`, {
            body: { ...data, login: "login" },
        });
    }

    static async sendResetPswEmail(data: ResetPasswordEmailRequestSchema): Promise<any> {
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
