import { UserSchema } from "./users";

/**
 * Схема ответа на запрос получения всех отделов.
 * */
export interface GetAllUnitsResponseSchema {
    units: UnitResponseItemSchema[];
}

/**
 * Схема ответа на запрос получения отдела по `id`.
 * */
export interface GetUnitByIdResponseSchema {
    unit: UnitResponseItemSchema;
}

/**
 * Схема данных отдела, используется для типизации в коде компонентов в том числе.
 * */
export interface UnitResponseItemSchema {
    id: number;
    name: string;
    creationDate: string;
    adminId: number;
    color: string;
    members: Array<UserSchema>;
    avatar?: string;
    openTasks: Array<object>;
}
