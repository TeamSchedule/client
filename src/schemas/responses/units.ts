export interface UnitsResponseItemSchema {
    id: number;
    name: string;
    creationDate: string;
    adminId: number;
    color: string;
    members: Array<TeamMembersItemSchema>;
    avatar?: string;
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