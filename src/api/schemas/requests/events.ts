import { EventStatusStrings } from "../../../enums/eventsEnums";

/**
 * Схема создания нового события.
 * */
export interface CreateEventRequestSchema {
    name: string;
    description?: string;
    endDate?: Date | string;
    color?: string;
}

/**
 * Схема изменения события.
 * */
export interface EditEventRequestSchema {
    eventId: number;
    name?: string;
    description?: string;
    endDate?: Date;
    color?: string;
    status?: EventStatusStrings;
}
