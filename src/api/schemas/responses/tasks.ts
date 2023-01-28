import { UnitResponseItemSchema } from "./units";

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
}
