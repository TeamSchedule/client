import { UnitResponseItemSchema } from "./units";
import { EventResponseItemSchema } from "./events";

export interface TaskResponseSchema {
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
