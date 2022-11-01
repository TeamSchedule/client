import $axios, { $nonInterceptAxios } from "../axiosRequests";
import { RefreshTokensRequestSchema, SignInRequestSchema, SignUpRequestSchema } from "../schemas/requests/auth";

export class auth {
    static signIn(data: SignInRequestSchema) {
        return $nonInterceptAxios.post(`/jwt/obtain`, data).then((res) => res.data);
    }

    static signUp(data: SignUpRequestSchema) {
        return $nonInterceptAxios.post(`/registration`, data);
    }

    static refreshAccessToken(token: RefreshTokensRequestSchema) {
        return $axios.post(`/jwt/refresh`, token);
    }
}
