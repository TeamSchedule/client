import { TaskResponseItemSchema } from "./tasks";
import { EventStatusStrings } from "../../../enums/eventsEnums";

/**
 * Схема ответа на запрос получения списка событий.
 * */
export interface GetEventsResponseSchema {
    events: EventResponseItemSchema[];
}

/**
 * Схема данных события, используется для типизации в коде компонентов в том числе.
 * */
export interface EventResponseItemSchema {
    id: number;
    name: string;
    description: string;
    color: string;
    endDate: string;
    tasks: TaskResponseItemSchema[];
    status: EventStatusStrings;
    files?: Array<any>;
}

/**
 * Схема ответа на запрос создания события.
 * */
export interface CreateEventResponseSchema {
    id: number;
}

/**
 * Схема ответа на запрос создания события.
 * */
export interface EditEventResponseSchema {
    id: number;
}
