import { UnitResponseItemSchema } from "./units";
import { EventResponseItemSchema } from "./events";
import { UserSchema } from "./users";

export interface GetTaskResponseSchemas {
    task: TaskResponseItemSchema;
}

export interface TaskResponseItemSchema {
    id: number;
    name: string;
    description: string;
    closed: boolean;
    creationTime: string;
    expirationTime: string;
    assignee: UserSchema;
    authorId: number;
    unit: UnitResponseItemSchema;
    event: EventResponseItemSchema;
}
