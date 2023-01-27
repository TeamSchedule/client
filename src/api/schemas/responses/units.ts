import { UserSchema } from "./users";

export interface UnitsResponseItemSchema {
    id: number;
    name: string;
    creationDate: string;
    adminId: number;
    color: string;
    members: Array<UserSchema>;
    avatar?: string;
    openTasks: Array<object>;
}
