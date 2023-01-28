/**
 * Схема ответа на запрос получения всех событий.
 * */
export interface GetAllEventsResponseSchema {
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
}
