export interface AllTeamsResponseSchema {
    teams: Array<TeamsResponseItemSchema>;
}

export interface TeamsResponseItemSchema {
    id: number;
    name: string;
    creationDate: string;
    adminId: number;
    color: string;
    members: Array<TeamMembersItemSchema>;
}

export interface TeamMembersItemSchema {
    confirmed: boolean;
    creationDate: Date;
    description: string;
    email: string;
    id: number;
    login: string;
    avatar?: string;
}
