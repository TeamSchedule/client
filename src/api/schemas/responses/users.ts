import { UserPostsStrings } from "../../../enums/usersEnums";
import { FileResponseItemSchema } from "./files";

export interface GetAllUsersResponseSchema {
    users: UserSchema[];
}

export interface UserSchema {
    id: number;
    avatar: FileResponseItemSchema;
    login?: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    fullName: string;
    creationDate: Date;
    post: UserPostsStrings;
}
