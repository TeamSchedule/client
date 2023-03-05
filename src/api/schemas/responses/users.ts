import { UserPostsStrings } from "../../../enums/usersEnums";

export interface GetMeResponseSchema {
    user: UserSchema;
}

export interface GetAllUsersResponseSchema {
    users: UserSchema[];
}

export interface UserSchema {
    id: number;
    avatar: string;
    login?: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    fullName: string;
    creationDate: Date;
    post: UserPostsStrings;
}
