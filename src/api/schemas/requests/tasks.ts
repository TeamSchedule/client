import { TaskStatusStrings } from "../../../enums/tasksEnums";

export interface CreateTaskRequestSchema {
    name: string;
    description?: string;
    departmentId?: number;
    eventId?: number;
    assigneeIds?: number[];
    expirationTime?: Date;
}

export interface UpdateTaskRequestSchema {
    name?: string;
    description?: string;
    expirationTime?: string;
    status?: TaskStatusStrings;
}

export interface FilterTasksParamsSchema {
    from?: Date;
    to?: Date;
    teams?: Array<number>;
    users?: Array<number>;
    events?: Array<number>;
    private?: boolean;
    all?: boolean;
}
