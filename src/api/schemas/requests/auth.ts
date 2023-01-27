export interface SignInRequestSchema {
    login: string;
    password: string;
}

export interface SignUpRequestSchema {
    email: string;
    login: string;
    password: string;
}

export interface RefreshTokensRequestSchema {
    token: string;
}

export interface ResetPasswordEmailRequestSchema {
    email: string;
}

export interface ResetPasswordCodeRequestSchema {
    code: string;
}

export interface CreateNewPasswordRequestSchema {
    password: string;
}
