export enum EventStatusEnum {
    COMPLETED = "COMPLETED",
    IN_PROGRESS = "IN_PROGRESS",
}

export type EventStatusStrings = (typeof EventStatusEnum)[keyof typeof EventStatusEnum];

export enum EventViewModeEnum {
    EDIT,
    FULL,
    CALENDAR,
    PREVIEW,
}

export type EventViewModeStrings = (typeof EventViewModeEnum)[keyof typeof EventViewModeEnum];
