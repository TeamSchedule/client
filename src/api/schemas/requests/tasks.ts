export interface CreateTaskRequestSchema {
    name: string;
    description: string;
    teamId: null | number;
    assigneeId: null | number;
    expirationTime: Date;
}

export interface UpdateTaskRequestSchema {
    name: string;
    description: string;
    expirationTime: string;
    closed: boolean;
}

export interface FilterTasksParamsSchema {
    from?: Date;
    to?: Date;
    teams?: Array<number>;
    users?: Array<number>;
    events?: Array<number>;
    private?: boolean;
    all?: boolean;
}
