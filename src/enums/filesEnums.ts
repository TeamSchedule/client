export enum EventTypesEnum {
    EVENT = "EVENT",
    TASK = "TASK",
    PROCESS = "PROCESS",
}

export type EventTypesStrings = (typeof EventTypesEnum)[keyof typeof EventTypesEnum];
