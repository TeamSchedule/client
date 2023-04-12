import { TaskResponseItemSchema } from "../api/schemas/responses/tasks";
import { compareDatetime } from "./dateutils";
import { TaskStatusEnum } from "../enums/tasksEnums";

export function compareTasks(a: TaskResponseItemSchema, b: TaskResponseItemSchema): number {
    const byDatetime: number = compareDatetime(new Date(a.expirationTime), new Date(b.expirationTime));
    if (byDatetime) return byDatetime;
    return a.id - b.id;
}

export function getOnlyOpenTasks(events: TaskResponseItemSchema[]): TaskResponseItemSchema[] {
    return events.filter((task) => task.taskStatus === TaskStatusEnum.IN_PROGRESS);
}
