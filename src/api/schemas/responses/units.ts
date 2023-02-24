import { UserSchema } from "./users";
import { TaskResponseItemSchema } from "./tasks";

/**
 * Схема ответа на запрос получения всех отделов.
 * */
export interface GetAllUnitsResponseSchema {
    departments: UnitResponseItemSchema[];
}

/**
 * Схема ответа на запрос создания отдела.
 * */
export interface CreateUnitsResponseSchema {
    id: number;
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
    members: UserSchema[];
    openTasks: TaskResponseItemSchema[];
}
