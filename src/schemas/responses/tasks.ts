interface TeamOfTaskItem {
    id: number;
    name: string;
}

export interface GetTaskResponseSchema {
    id: number;
    name: string;
    description: string;
    closed: boolean;
    creationTime: string;
    expirationTime: string;
    assigneeId: number;
    authorId: number;
    team: TeamOfTaskItem;
}
