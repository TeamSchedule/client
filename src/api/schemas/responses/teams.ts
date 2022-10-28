export interface AllTeamsResponseSchema {
    teams: Array<TeamsResponseItemSchema>;
}

export interface TeamsResponseItemSchema {
    id: number;
    name: string;
    creationDate: string;
    adminId: number;
    color: string;
}
