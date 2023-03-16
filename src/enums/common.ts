export enum CalendarElemTypeEnum {
    TASK = "TASK",
    EVENT = "EVENT",
    ALL = "",
}

export type CalendarElemTypeStrings = (typeof CalendarElemTypeEnum)[keyof typeof CalendarElemTypeEnum];
