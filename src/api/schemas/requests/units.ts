export interface CreateUnitRequestSchema {
    name: string;
    description?: string;
    head?: number;
    members?: Array<number>;
}

export interface UpdateTeamRequestSchema {
    newName: string;
    color: string;
}
