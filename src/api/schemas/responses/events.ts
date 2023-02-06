import { TaskResponseSchema } from "./tasks";

/**
 * Схема ответа на запрос получения списка событий.
 * */
export interface GetEventsResponseSchema {
    events: EventResponseItemSchema[];
}

/**
 * Схема ответа на запрос получения события по `id`.
 * */
export interface GetEventByIdResponseSchema {
    event: EventResponseItemSchema;
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
    tasks: TaskResponseSchema[];
}
