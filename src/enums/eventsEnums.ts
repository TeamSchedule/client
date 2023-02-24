export enum EventStatusEnum {
    COMPLETED = "COMPLETED",
    IN_PROGRESS = "IN_PROGRESS",
}

export type EventStatusStrings = typeof EventStatusEnum[keyof typeof EventStatusEnum];
