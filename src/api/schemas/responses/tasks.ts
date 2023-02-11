import { UnitResponseItemSchema } from "./units";
import { EventResponseItemSchema } from "./events";

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
    assigneeId: number;
    authorId: number;
    unit: UnitResponseItemSchema;
    event: EventResponseItemSchema;
}
