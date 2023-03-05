export enum FileOwnerTypesEnum {
    EVENT = "EVENT",
    TASK = "TASK",
    USER = "USER",
}

export type EventTypesStrings = (typeof FileOwnerTypesEnum)[keyof typeof FileOwnerTypesEnum];
