export interface GetMeResponseSchema {
    user: UserSchema;
}

export interface UserSchema {
    id: number;
    login: string;
    email: string;
    fullName: string;
    confirmed: boolean;
    creationDate: Date;
    post: string;
}
