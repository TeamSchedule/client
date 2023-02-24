export enum TaskStatusEnum {
    COMPLETED = "COMPLETED",
    IN_PROGRESS = "IN_PROGRESS",
}

export type TaskStatusStrings = typeof TaskStatusEnum[keyof typeof TaskStatusEnum];
