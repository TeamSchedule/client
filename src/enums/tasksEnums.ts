export enum TaskStatusEnum {
    COMPLETED = "COMPLETED",
    IN_PROGRESS = "IN_PROGRESS",
}

export type TaskStatusStrings = (typeof TaskStatusEnum)[keyof typeof TaskStatusEnum];

export enum TaskViewModeEnum {
    EDIT,
    FULL,
    CALENDAR,
    PREVIEW,
}

export type TaskViewModeStrings = (typeof TaskViewModeEnum)[keyof typeof TaskViewModeEnum];
