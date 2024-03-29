import { UnitResponseItemSchema } from "./units";
import { EventResponseItemSchema } from "./events";
import { UserSchema } from "./users";
import { TaskStatusStrings } from "../../../enums/tasksEnums";
import { FileResponseItemSchema } from "./files";

export interface GetTasksResponseSchema {
    tasks: TaskResponseItemSchema[];
}

export interface TaskResponseItemSchema {
    id: number;
    name: string;
    description: string;
    taskStatus: TaskStatusStrings;
    expirationTime: string;

    assignee: UserSchema[];
    author: UserSchema;

    // TODO: ? department can be null?
    department: UnitResponseItemSchema;
    event?: EventResponseItemSchema;
    files: FileResponseItemSchema[];
}
