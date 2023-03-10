import { TaskStatusStrings } from "../../../enums/tasksEnums";
import { EventStatusStrings } from "../../../enums/eventsEnums";

export interface CreateTaskRequestSchema {
    name: string;
    description?: string;
    departmentId?: number;
    eventId?: number;
    assigneeIds?: number[];
    expirationTime?: Date;
}

export interface UpdateTaskRequestSchema {
    taskId: number;
    eventId?: number;
    departmentId?: number;
    name?: string;
    description?: string;
    expirationTime?: Date;
    status?: TaskStatusStrings;
}

export interface FilterTasksParamsSchema {
    from?: string;
    to?: string;
    departments?: number[];
    assignee?: number[];
    events?: number[];
    status?: TaskStatusStrings | EventStatusStrings;
}
