import { UserSchema } from "./users";

/**
 * Схема ответа на запрос получения всех отделов.
 * */
export interface GetAllUnitsResponseSchema {
    departments: UnitResponseItemSchema[];
}

/**
 * Схема данных отдела, используется для типизации в коде компонентов в том числе.
 * */
export interface UnitResponseItemSchema {
    id: number;
    name: string;
    creationDate: string;
    admin: UserSchema;
    color: string;
    members: Array<UserSchema>;
    openTasks: Array<object>;
}
