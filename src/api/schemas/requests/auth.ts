export interface SignInRequestSchema {
    email: string;
    password: string;
}

export interface SignUpRequestSchema {
    email: string;
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
