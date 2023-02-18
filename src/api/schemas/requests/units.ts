/**
 * Схема создания нового отдела.
 * */
export interface CreateUnitRequestSchema {
    name: string;
    description?: string;
    adminId?: number;
    members?: Array<number>;
}

/**
 * Схема изменения нового отдела.
 * */
export interface UpdateTeamRequestSchema {
    newName: string;
    color: string;
}
