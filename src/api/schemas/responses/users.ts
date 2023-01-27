export interface GetMeResponseSchema {
    user: UserSchema;
}

export interface UserSchema {
    id: number;
    avatar: string;
    login: string;
    email: string;
    fullName: string;
    confirmed: boolean;
    creationDate: Date;
    post: string;
}
