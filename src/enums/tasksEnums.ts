export enum TaskStatusEnum {
    COMPLETED = "COMPLETED",
    CLOSED = "CLOSED",
    IN_PROGRESS = "IN_PROGRESS",
}

export type TaskStatusStrings = typeof TaskStatusEnum[keyof typeof TaskStatusEnum];
