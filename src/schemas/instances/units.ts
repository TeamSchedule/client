import { User } from "./users";

export interface Unit {
    id: number;
    name: string;
    members: Array<User>;
    openTasks: number;
}
