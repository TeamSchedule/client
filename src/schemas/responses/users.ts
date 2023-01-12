export interface GetMeResponseSchema {
    user: UserResponseSchema;
}

export interface UserResponseSchema {
    id: number;
    login: string;
    email: string;
    description: string;
    confirmed: boolean;
    creationDate: Date;
}
