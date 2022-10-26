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
