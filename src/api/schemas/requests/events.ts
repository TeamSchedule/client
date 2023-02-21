/**
 * Схема создания нового события.
 * */
export interface CreateEventRequestSchema {
    name: string;
    description?: string;
    endDate?: Date | null;
    color?: string;
}

/**
 * Схема изменения события.
 * */
export interface EditEventRequestSchema {
    name?: string;
    description?: string;
    deadline?: Date;
    color?: string;
}
