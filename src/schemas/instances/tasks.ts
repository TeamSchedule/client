import { User } from "./users";

export interface Task {
    name: string;
    deadline: Date;
    description: string;
    executors: Array<User>;
}
