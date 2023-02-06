/**
 * Схема создания нового события.
 * */
export interface CreateEventRequestSchema {
    name: string;
    description?: string;
    deadline: Date | null;
}
